<template>
  <v-container class="d-flex flex-column">
    <v-card class="mx-auto my-6 pa-4" min-width="600" max-width="800">
      <v-card-title>🏆 Leaderboard - {{ quizTitle }}</v-card-title>
      <v-table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(player, index) of leaderboard" :key="index">
            <td>{{ index + 1 }}</td>
            <td>
              <v-icon>mdi-account</v-icon>
              {{ player.user }}
            </td>
            <td>{{ player.correctCount }} / {{ quizQuestionAmount }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import ApiGateAwayClient from "@/api";

type LeaderboardResponse = {
  _id: String;
  quizId: String;
  user: String;
  correctCount: Number;
};

const route = useRoute();
const quizTitle = ref("Sweden city");
const quizQuestionAmount = ref(0);
const leaderboard = ref<LeaderboardResponse[]>([]);

onMounted(async () => {
  try {
    const quizInfo = await ApiGateAwayClient.get(
      "/quiz/" + route.params.id
    );

    quizTitle.value = quizInfo.data.quizTitle;
    quizQuestionAmount.value = quizInfo.data.questions.length;

    const result = await ApiGateAwayClient.get(
      "/submissions/leaderboard/" + route.params.id
    );
    leaderboard.value = result.data;
  } catch (error) {
    console.error("Could not retrieve leaderboard for some reason:", error);
  }
});
</script>

<style scoped></style>
