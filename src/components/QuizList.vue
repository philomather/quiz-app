<script setup lang="ts">
import { useQuizzesStore } from '@/stores/quizzes';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { RouterLink } from 'vue-router';

const quizzesStore = useQuizzesStore()
const { quizzes, loading, error } = storeToRefs(quizzesStore);

onMounted(() => {
    quizzesStore.fetchQuizzes();
})
</script>

<template>
    <h1 class="quiz-list-heading">
        Quizzes
    </h1>
    <p
        v-if="loading"
        class="quiz-list-spinner"
    >
        Loading quizzes...
    </p>
    <nav class="quiz-list-container">
        <RouterLink
            v-for="quiz in quizzes"
            class="quiz-list-card"
            :to="'/quiz/' + quiz.id + '/question/' + quiz.questions[0].id"
        >
            <h3>{{ quiz.name }}</h3>
        </RouterLink>
    </nav>
</template>

<style scoped>
.quiz-list-container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.quiz-list-card {
  margin: 30px;
  height: 60px;
  outline: solid blueviolet;
}

.quiz-list-spinner {
  margin: 30px;
  color: darkcyan;
}

@media (min-width: 1024px) {
  .quiz-list-container{
    flex-direction: row;
  }
}
</style>
