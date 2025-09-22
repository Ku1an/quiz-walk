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
        <v-btn color="primary" class="position-fixed right-0 ma-4 mt-6 mr-10" icon="mdi-home-circle" @click="goToLandingPage">
    </v-btn>
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();

const goToLandingPage = () => {
    router.push("/")
}

</script>

<style>
</style>
