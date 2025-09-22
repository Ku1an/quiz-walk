<template>
    <div class="d-flex flex-column align-center mt-16 fill-height">
            <h1 class="mt-16">Let it - Quiz!</h1>
            <v-divider :thickness="3" class="border-opacity-25 w-50 mt-8" ></v-divider>
            <v-row class="mt-10">
                <v-col cols="6" class="">
                    <v-btn color="primary" @click="goToPlayQuiz">Play Quiz</v-btn>
                </v-col>
                <v-col cols="6">
                    <v-btn color="warning" @click="goToCreateQuiz">Create Quiz</v-btn>
                </v-col>
            </v-row>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();

function goToCreateQuiz() {
  router.push("/create");
}

function goToPlayQuiz() {
  router.push("/play");
}



</script>

<style scoped>

</style>