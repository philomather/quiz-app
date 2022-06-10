<script setup lang="ts">
import { useQuizzesStore } from '@/stores/quizzes';
import { storeToRefs } from 'pinia';
import { ref } from 'vue'
import { RouterLink } from 'vue-router';

const quizzesStore = useQuizzesStore()
const { quiz, question, adjacentQuestions } = storeToRefs(quizzesStore);

const answer = ref('')
</script>

<template>
    <h1 class="question-component-heading">
        {{ quiz.name }} 
    </h1>
    <p class="question-component-text">
        {{ question.text }}
    </p>
    <div class="question-component-options-container">
        <div v-for="option in question.options">
            <label
                :for="option"
                class="question-component-option-label"
            >
                <div class="question-component-option-card">
                    <input
                        type="radio"
                        v-model="answer"
                        :id="option"
                        :value="option"
                    >
                    <p class="question-component-option-text">
                        {{ option }}
                    </p>
                </div>
            </label>
        </div>
    </div>
    <div class="question-component-nav">
        <RouterLink
            v-if="adjacentQuestions[0].id != ''"
            :to="`/quiz/${quiz.id}/question/${adjacentQuestions[0].id}`"
            @click="quizzesStore.question = adjacentQuestions[0]"
        >
            <button>Back</button>
        </RouterLink>
        <RouterLink
            v-if="adjacentQuestions[1].id != ''"
            :to="`/quiz/${quiz.id}/question/${adjacentQuestions[1].id}`"
            @click="quizzesStore.question = adjacentQuestions[1]"
        >
            <button>Next</button>
        </RouterLink>
        <RouterLink
            v-else
            :to="`/quiz/${quiz.id}`"
        >
            <button>Next</button>
        </RouterLink>
    </div>
</template>

<style scoped>
.question-component-options-container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.question-component-option-card {
  display: flex;
  align-items: center;
  margin: 30px;
  padding: 20px;
  width: 60vw;
  max-width: 600px;
  outline: solid blueviolet;
}

.question-component-option-text {
  margin-left: 10px;
}
</style>
