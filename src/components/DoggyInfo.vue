<script setup lang="ts">
import { ref } from "vue";
import { Doggy } from "../types";
import Loading from "../components/Loading.vue";

defineProps<{ doggy: Doggy }>();

const loading = ref(true);

const onImgLoad = () => {
  loading.value = false;
};
</script>

<template>
  <div class="flex flex-col md:px-40">
    <div class="flex flex-col gap-10 md:flex-row">
      <div>
        <h2 class="mb-4 text-2xl leading-none text-gray-700 dark:text-white">
          Title and Owner
        </h2>
        <p class="mb-8 font-normal break-words">
          {{ doggy.name }} - {{ doggy.owner }}
        </p>

        <h2 class="mb-4 text-2xl leading-none text-gray-700 dark:text-white">
          Description
        </h2>
        <p class="font-normal break-words">{{ doggy.description }}</p>
      </div>
      <div>
        <Loading v-show="loading"></Loading>
        <img
          v-show="!loading"
          class="w-96 h-48"
          :src="doggy.image_url"
          :alt="doggy.name"
          @load="onImgLoad()"
        />
      </div>
    </div>
    <table class="mt-12">
      <thead>
        <tr
          class="bg-green-300 p-2 mb-4 border text-2xl leading-none text-gray-700 dark:text-white"
        >
          <th class="p-2">Trait</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in doggy.attributes"
          :key="index"
          :class="[
            index % 2 ? 'bg-green-100' : '',
            'text-gray-700 text- text-center font-normal hover:bg-green-200',
          ]"
        >
          <td class="border p-2">{{ item.trait_type }}</td>
          <td class="border p-2">{{ item.value }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
