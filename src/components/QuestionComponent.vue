<script setup lang="ts">
import { useQuizzesStore } from '@/stores/quizzes';
import { storeToRefs } from 'pinia';
import { ref } from 'vue'

const quizzesStore = useQuizzesStore()
const { quiz, question } = storeToRefs(quizzesStore);

const answer = ref('')
</script>

<template>
    <h1 class="question-component-heading">
        {{ quiz.name }} 
    </h1>
    <p>
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
