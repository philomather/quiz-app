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
    <div class="quiz-list">
        <h1 class="quiz-list__heading">
            Quizzes
        </h1>
        <p
            v-if="loading"
            class="quiz-list__info"
        >
            Loading quizzes...
        </p>
        <p
            v-else-if="error"
            class="quiz-list__info"
        >
            Something went wrong loading the quizzes, please try again later.
        </p>
        <nav class="quiz-list__container">
            <div
                v-for="quiz in quizzes"
                class="quiz-list__card"
            >
                <h2 class="quiz-list__card-title">
                    {{ quiz.name }}
                </h2>
                <div class="quiz-list__card-progress">
                    <p class="quiz-list__card-status">
                        {{ quiz.completed ? `Score: ${quiz.score}/${quiz.total}` : 'Not started' }}
                    </p>
                    <RouterLink
                        class="quiz-list__card-link"
                        :to="`/quiz/${quiz.id}`"
                        @click="quizzesStore.resetQuiz(quiz)"
                    >
                        {{ quiz.completed ? 'Redo' : 'Start' }}
                    </RouterLink>
                </div>
            </div>
        </nav>
    </div>
</template>

<style scoped lang="scss">
.quiz-list {
  &__heading {
    margin-bottom: 20px;
  }

  &__container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media (min-width: 1024px) {
      flex-direction: row;
    }
  }
  
  &__card {
    margin: 30px;
    height: 100px;
    width: 300px;
    max-width: 90vw;
    border: map-get($colors, card-outline) 2px solid;
    border-radius: 8px;
  }
  
  &__card-progress {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 20px;
  }

  &__card-status {
    font-size: 18px;
  }
  
  &__card-link {
    @include button;
    color: map-get($colors, positive-outline);
  }
  
  &__info {
    margin: 30px;
    color: map-get($colors, info);
  }
}
</style>
