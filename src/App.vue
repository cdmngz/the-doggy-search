<script lang="ts" setup>
import { ref, reactive } from "vue";
import { Doggy } from "./types";
import { MAX_SUPPLY } from "./utils/constants";
import { getDoggyStyle, getDoggyInfoETH } from "./services/doggy/index";
import Loading from "./components/Loading.vue";
import Separator from "./components/Separator.vue";
import DoggyInfo from "./components/DoggyInfo.vue";
import Footer from "./components/Footer.vue";

const loading = reactive({
  doggyInfo: false,
  doggyImg: false,
});
const message = ref("");
const numberId = ref("");
const doggy: Doggy = reactive({
  owner: "",
  name: "",
  description: "",
  image_url: "",
  attributes: [],
});

const searchDoggy = async (value?: boolean) => {
  let queryId = value
    ? Math.floor(Math.random() * (MAX_SUPPLY - 1) + 1)
    : parseInt(numberId.value);

  if (queryId >= 0 && MAX_SUPPLY > queryId) {
    loading.doggyInfo = true;
    loading.doggyImg = true;

    // Get the Doggy info
    Promise.all([getDoggyStyle(queryId), getDoggyInfoETH(queryId)])
      .then((res) => {
        doggy.owner = res[1];
        doggy.name = res[0].name;
        doggy.description = res[0].description;
        doggy.image_url = res[0].image_url;
        doggy.attributes = res[0].attributes.filter((x) => x.value);
      })
      .catch((err) => {
        message.value = `Some error happend.`;
      })
      .finally(() => (loading.doggyInfo = false));
  }
};
</script>

<template>
  <main class="font-bold tracking-tight">
    <header class="flex flex-col justify-center items-center gap-8">
      <img
        class="h-20 w-20 mt-10 rounded"
        src="https://storage.googleapis.com/nftimagebucket/tokensinfo/44342.gif"
      />
      <h2 class="mb-4 text-3xl leading-none text-gray-700 dark:text-white">
        The Doggies Explorer
      </h2>
      <div class="flex flex-col gap-2 text-green-900">
        <input
          class="p-2 border rounded"
          type="number"
          v-model="numberId"
          placeholder="Token ID"
          min="0"
          :max="MAX_SUPPLY - 1"
        />
        <button
          class="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
          @click="searchDoggy()"
        >
          Search
        </button>
        <button
          class="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
          @click="searchDoggy(true)"
        >
          Random
        </button>
      </div>
    </header>
    <Separator></Separator>
    <section class="p-10">
      <div v-if="loading.doggyInfo">
        <Loading></Loading>
      </div>
      <div v-else-if="message">{{ message }}</div>
      <div v-else-if="doggy.owner">
        <DoggyInfo :doggy="doggy"></DoggyInfo>
      </div>
      <div v-else class="text-center">
        <h2
          class="mb-4 text-3xl font-extrabold tracking-tight leading-none text-gray-700 dark:text-white"
        >
          Search your Doggy
        </h2>
      </div>
    </section>
    <Separator></Separator>
    <Footer></Footer>
  </main>
</template>
