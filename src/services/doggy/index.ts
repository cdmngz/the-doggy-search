import Web3 from "web3";
import { AbiItem } from "web3-utils";
import { Doggy, responseFromApiDoggy } from "../../types";
import { contractABI, contractAddress } from "../../utils/constants";

/**
 * Get the Doggy style from API
 * @param {number} id - User query ID
 * @return {Promise} - Return Promise with the Doggy style
 */
export const getDoggyStyle = async (id: number): Promise<Doggy> => {
  return await fecthDoggyAPI(id).then(prepareResponseAPI);
};

/**
 * Get the Doggy owner from blockchain
 * @param {number} id - User query ID
 * @return {Promise} - Return Promise with the Doggy owner
 */
export const getDoggyInfoETH = async (id: number): Promise<string> => {
  return await fecthDoggyInfoETH(id).then(prepareResponseInfoETH);
};

/**
 * Fetch the API with the Doggy info
 * @param {number} id - User query ID
 * @return {Promise} - Return Promise with the Doggy info
 */
const fecthDoggyAPI = async (id: number): Promise<responseFromApiDoggy> => {
  const response = await fetch(
    `https://contracts.sandbox.game/snoopdogg/${id}`
  );
  return response.json();
};

/**
 * Call ownerOf method from the contract in the blockchain
 * @param {number} id - User query ID
 * @return {Promise} - Return response from ownerOf method
 */
const fecthDoggyInfoETH = async (id: number): Promise<string> => {
  const web3: Web3 = new Web3();
  try {
    window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: `0x${Number(1).toString(16)}` }],
    });
    web3.setProvider(window.ethereum);
  } catch (error) {
    console.log("No ethereum provider");
  }
  const response = await new web3.eth.Contract(
    contractABI as AbiItem[],
    contractAddress
  ).methods
    .ownerOf(id)
    .call();
  return response;
};

/**
 * Prepare attributes from API
 * @param {responseFromApiDoggy} apiResponse - Response from the fetch API call
 * @return {Doggy} - Return Doggy
 */
const prepareResponseAPI = (apiResponse: responseFromApiDoggy): Doggy => {
  let { owner, name, description, image_url, attributes } = apiResponse;
  return { owner, name, description, image_url, attributes };
};

/**
 * Prepare the string from the blockchain call
 * @param {string} ownerAddress - Response from the blockchain call
 * @return {string} - Return the ownerAddress of the Doggy
 */
const prepareResponseInfoETH = (ownerAddress: string): string => {
  return ownerAddress;
};
