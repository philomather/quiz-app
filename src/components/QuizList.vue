<script setup lang="ts">
import { useQuizzesStore } from '@/stores/quizzes';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { RouterLink } from 'vue-router';

const quizzesStore = useQuizzesStore()
const { quizzes, loading, error } = storeToRefs(quizzesStore);

onMounted(() => {
    if (quizzesStore.quizzes.length == 0) {
        quizzesStore.fetchQuizzes();
    }
})
</script>

<template>
    <h1 class="quiz-list-heading">
        Quizzes
    </h1>
    <p
        v-if="loading"
        class="quiz-list-info"
    >
        Loading quizzes...
    </p>
    <p
        v-else-if="error"
        class="quiz-list-info"
    >
        Something went wrong loading the quizzes, please try again later.
    </p>
    <nav class="quiz-list-container">
        <div
            v-for="quiz in quizzes"
            class="quiz-list-card"
        >
            <h2>{{ quiz.name }}</h2>
            <div class="quiz-list-card-progress">
                <h3>
                    {{ quiz.completed ? `Score: ${quiz.score}/${quiz.total}` : 'Not started' }}
                </h3>
                <RouterLink
                    class="quiz-list-card-link"
                    :to="`/quiz/${quiz.id}`"
                    @click="quizzesStore.resetQuiz(quiz)"
                >
                    <h3>{{ quiz.completed ? 'Redo' : 'Start' }}</h3>
                </RouterLink>
            </div>
        </div>
    </nav>
</template>

<style scoped>
.quiz-list-heading {
  margin-bottom: 20px;
}
.quiz-list-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.quiz-list-card {
  margin: 30px;
  height: 100px;
  width: 300px;
  outline: solid blueviolet;
}

.quiz-list-card-progress {
  display: flex;
  justify-content: space-between;
  margin: 20px;
}

.quiz-list-card-link {
  height: 30px;
  width: 80px;
  outline: solid rgb(38, 211, 130);
}

.quiz-list-info {
  margin: 30px;
  color: darkcyan;
}

@media (min-width: 1024px) {
  .quiz-list-container{
    flex-direction: row;
  }
}
</style>
