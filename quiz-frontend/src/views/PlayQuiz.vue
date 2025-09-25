<template>
  <v-container class="d-flex flex-column align-center mt-16">
    <h1>Quizzes to play!</h1>
    <v-divider :thickness="3" class="border-opacity-25 w-50 mt-3"></v-divider>

    <v-row class="mt-4 w-100">
      <v-col v-for="quiz in quizzes" cols="4">
        <v-card class="hoverable">
          <v-card-title> {{ quiz.title }}</v-card-title>
          <div class="d-flex justify-center mt-8 mb-5">
            <v-row>
              <v-col class="ml-4">
                <v-btn color="primary" @click="playQuiz(quiz.id)">
                  Play!
                </v-btn>
              </v-col>
              <v-col>
                <v-btn color="success" @click="showLeaderboard(quiz.id)">
                  Leaderboard
                </v-btn>
              </v-col>
            </v-row>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import ApiGateAwayClient from "@/api";
const router = useRouter();

type Quiz = {
  id: string;
  title: string;
};

const quizzes = ref<Quiz[]>([]);

const playQuiz = (quizId: String) => {
  router.push("/play/" + quizId);
};

const showLeaderboard = (quizId: String) => {
  router.push("/leaderboard/" + quizId);
};

onMounted(async () => {
  try {
    const result = await ApiGateAwayClient.get("/quiz");
    if (result.data) {
      for (let quiz of result.data) {
        if(quiz._id && quiz.quizTitle) {
            quizzes.value.push({
              id: quiz._id,
              title: quiz.quizTitle,
            });
        }
      }
    }
  } catch (err) {
    console.log("Could not retrieve quizzes from backend: ", err);
  }
});
</script>

<style scoped></style>
