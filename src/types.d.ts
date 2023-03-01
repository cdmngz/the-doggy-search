export interface Doggy {
  owner: string;
  name: string;
  description: string;
  image_url: string;
  attributes: Array<Attributes>;
}

export interface Attributes {
  trait_type: string;
  value: string;
}

export interface responseFromApiDoggy {
  owner: string;
  name: string;
  description: string;
  image_url: string;
  attributes: [];
}

export type responseFromApi = Array<{
  doggy: Doggy;
  ownerAddress: string;
}>;
