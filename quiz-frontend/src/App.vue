<template>
  <v-app>
    <v-img
      class="position-fixed ma-4 mt-6"
      :width="100"
      height="60"
      aspect-ratio="16/9"
      src="/quiz.png"
      style="opacity: 0.7;"
    ></v-img>
    <v-main>
      <Landing />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import Landing from "./views/Landing.vue";

//
</script>

<style>
</style>
