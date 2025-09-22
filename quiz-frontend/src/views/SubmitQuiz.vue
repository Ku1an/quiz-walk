<template>
  <v-container class="d-flex flex-column align-center mt-16">
    <template v-if="!submitted">
        <h1>Quiz title - {{ quizInfo.quizTitle }}</h1>
        <v-divider :thickness="3" class="border-opacity-25 w-50 mt-3"></v-divider>
        <v-row class="w-100">
          <v-col v-for="(q, index) in quizInfo.questions" class="mt-6" cols="4">
            <v-card class="pa-6">
              <h2>Question {{ index + 1 }}:</h2>
              <p class="mt-2">{{ q.question }}</p>
              <v-radio-group v-model="userAnswers[q.questionId]" class="mt-4">
                <v-radio
                  v-for="(opt, i) in q.options"
                  :key="i"
                  :label="opt"
                  :value="opt"
                  color="primary"
                ></v-radio>
              </v-radio-group>
            </v-card>
          </v-col>
        </v-row>
        <v-btn
          color="primary"
          class="mt-16"
          @click="showDialog = true"
          :disabled="!hasAnsweredAll"
        >
          Submit Quiz
        </v-btn>
        <!-- Dialog to ask username -->
        <v-dialog v-model="showDialog" max-width="400">
          <v-card>
            <v-card-title>Enter Your Username</v-card-title>
            <v-card-text>
              <v-alert
                class="mb-3"
                v-if="usernameErr"
                text="Please, provide a username"
                type="error"
                density="compact"
              ></v-alert>
              <v-text-field
                v-model="username"
                label="Username"
                required
              ></v-text-field>
            </v-card-text>
            <v-spacer></v-spacer>
            <div class="d-flex justify-end mb-4 mr-3">
              <v-btn color="error mr-3" @click="showDialog = false">Cancel</v-btn>
              <v-btn color="primary" @click="submitQuiz">Submit</v-btn>
            </div>
          </v-card>
        </v-dialog>
    </template>
    <template v-else>
        <v-card class="mx-auto my-6 pa-6 text-center" min-width="400">
        <v-card-title> Quiz Results: </v-card-title>
        <v-card-text>
            <div class="text-h2 font-weight-bold"> <span class="">{{ correct }}</span> / {{ quizInfo.questions.length }}</div>
            <div class="text-subtitle-1 mt-2">You got {{ correct }} correct!!!</div>
        </v-card-text>
        <p>Press button to see the leaderboard:</p>
        <v-btn color="success" class="mt-2" :to="`/leaderboard/${route.params.id}`" >Leaderboard</v-btn>
        </v-card>
    </template>
    <v-snackbar-queue
      color="success"
      v-model="messages"
      :timeout="8000"
    ></v-snackbar-queue>
    <v-snackbar-queue
      color="error"
      v-model="messagesErr"
      :timeout="8000"
    ></v-snackbar-queue>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, computed } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import ApiGateAwayClient from "@/api";

const route = useRoute();
const showDialog = ref(false);
const usernameErr = ref(false);
const username = ref("");
const messages = ref<string[]>([]);
const messagesErr = ref<string[]>([]);
const submitted = ref(false)
const correct = ref(0)


type Question = {
  question: string;
  options: [];
  questionId: string;
};

type GetQuiz = {
  quizTitle: string;
  questions: Question[];
};

const quizInfo = reactive<GetQuiz>({ quizTitle: "", questions: [] });
const userAnswers = reactive<Record<string, string>>({});

const hasAnsweredAll = computed(() => {
  return Object.keys(userAnswers).length == quizInfo.questions.length
    ? true
    : false;
});

const submitQuiz = async () => {
  if (username.value === "") {
    usernameErr.value = true;
  } else {
    await submitAnswer();
  }
};

const submitAnswer = async () => {
  try {
    const payload = {
      quizId: route.params.id,
      user: username.value,
      answers: userAnswers,
    };
    const result = await ApiGateAwayClient.post(
      "/submissions",
      payload
    );
    messages.value.push("Successfully submited the quiz");
    showDialog.value = false
    submitted.value = true
    correct.value = result.data.correct
  } catch (error) {
    messagesErr.value.push("Could not submit quiz to backend for some reason")
  }
};

onMounted(async () => {
  try {
    const result = await ApiGateAwayClient.get(
      "/quiz/" + route.params.id
    );
    if (result.status != 200) throw Error(result.statusText);
    quizInfo.quizTitle = result.data.quizTitle;
    for (let item of result.data.questions) {
      quizInfo.questions.push({
        question: item.question,
        options: item.options,
        questionId: item._id,
      });
    }

    console.log("Using REST API, we get following:", quizInfo);
  } catch (err) {
    console.error("Could not retrieve quizzes from backend: ", err);
  }
});
</script>

<style scoped></style>
