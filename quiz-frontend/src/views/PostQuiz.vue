<template>
    <v-btn color="primary" class="position-fixed right-0 ma-4 mt-6 mr-10" icon="mdi-home-circle" @click="goToLandingPage">
    </v-btn>
  <v-container>
    <v-form ref="form" @submit.prevent="submitQuiz">
      <v-text-field
        prepend-inner-icon="mdi-format-title"
        color="primary"
        v-model="quizTitle"
        label="Quiz Title"
        :rules="[v => !!v || 'Title is required']"
        variant="solo-filled"
        required
      ></v-text-field>

      <div v-for="(q, index) in questions" :key="index" class="mb-4 mt-6">
        <v-text-field
        prepend-inner-icon="mdi-chat-question"
          v-model="q.question"
          :label="`Question ${index + 1}`"
          :rules="[v => !!v || 'Question is required']"
          variant="outlined"
          required
        ></v-text-field>
        <div class="d-flex flex-column align-center">
            <v-text-field
              v-for="(opt, i) in q.options"
              :key="i"
              v-model="q.options[i]"
              :label="`Option ${i + 1}`"
              :rules="[v => !!v || 'Option is required']"
              max-width="300"
              min-width="300"
              required
            ></v-text-field>
        </div>

        <v-select
          prepend-inner-icon="mdi-check-bold"
          color="success"
          v-model="q.answer"
          :items="q.options"
          label="Correct Answer"
          :rules="[v => !!v || 'Answer is required']"
          required
          variant="solo-filled"
        ></v-select>
        <div class="d-flex justify-center">
            <v-btn color="red" text @click="removeQuestion(index)">Remove Question</v-btn>

        </div>
        <v-divider class="my-2"></v-divider>
      </div>
      <div class="d-flex justify-center mt-10">
          <v-btn color="primary" text @click="addQuestion">Add Question</v-btn>
          <v-btn color="success" type="submit" class="ml-4">Submit Quiz</v-btn>
      </div>

    </v-form>
  </v-container>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import axios from "axios";
import { useRouter } from 'vue-router';
const router = useRouter();




interface Question {
  question: string;
  options: string[];
  answer: string;
}

const quizTitle = ref("");
const questions = reactive<Question[]>([
  { question: "", options: ["", "", ""], answer: "" },
]);

const addQuestion = () => {
  questions.push({ question: "", options: ["", "", ""], answer: "" });
};

const removeQuestion = (index: number) => {
  questions.splice(index, 1);
};

const submitQuiz = async () => {
  const payload = {
    quizTitle: quizTitle.value,
    questions: questions.map((q) => ({
      question: q.question,
      options: q.options,
      answer: q.answer,
    })),
  };

  try {
    const response = await axios.post("http://localhost:8080/api/v1/quiz", payload);
    alert("Quiz submitted successfully!");
    quizTitle.value = "";
    questions.splice(0, questions.length, { question: "", options: ["", "", ""], answer: "" });
  } catch (err) {
    console.error(err);
    alert("Error submitting quiz");
  }
};

const goToLandingPage = () => {
    router.push("/")
}


</script>


<style scoped>

.v-container {
  max-width: 500px;
  margin: auto;
  margin-top:100px;

}

</style>