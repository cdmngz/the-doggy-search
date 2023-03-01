<script lang="ts" setup>
import { ref, reactive } from "vue";
import { Doggy } from "./types";
import { MAX_SUPPLY } from "./utils/constants";
import { getDoggyStyle, getDoggyInfoETH } from "./services/doggy/index";

const loading = ref(true);
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
    loading.value = true;
    console.log(queryId);

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
        message.value = `Some error happend`;
      })
      .finally(() => (loading.value = false));
  }
};
</script>

<template>
  <main>
    <header>
      <img
        src="https://storage.googleapis.com/nftimagebucket/tokensinfo/44342.gif"
      />
      <h2>The Doggies Explorer</h2>
      <div class="search-container">
        <input
          type="number"
          v-model="numberId"
          placeholder="Token ID"
          min="0"
          max="9999"
        />
        <button @click="searchDoggy()">Search</button>
        <button @click="searchDoggy(true)">Random</button>
      </div>
    </header>
    <section>
      <div v-if="loading">Loading...</div>
      <div v-else-if="message">M: {{ message }}</div>
      <div v-else class="doggy-container">
        <div class="doggy-info">
          <div>
            <h4>Title and Owner</h4>
            <p>{{ doggy.name }} - {{ doggy.owner }}</p>
            <h4>Description</h4>
            <p>{{ doggy.description }}</p>
          </div>
          <div>
            <img class="doggy-image" :src="doggy.image_url" :alt="doggy.name" />
          </div>
        </div>
        <table>
          <tr v-for="(item, index) in doggy.attributes" :key="index">
            <td>{{ item.trait_type }}</td>
            <td>{{ item.value }}</td>
          </tr>
        </table>
      </div>
    </section>
  </main>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
