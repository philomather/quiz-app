<script setup lang="ts">
import { useQuizzesStore } from '@/stores/quizzes';
import { storeToRefs } from 'pinia';
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router';
import QuestionOptions from './QuestionOptions.vue';

const quizzesStore = useQuizzesStore()
const { quiz, question, adjacentQuestions } = storeToRefs(quizzesStore);

const answer = ref('')
const isLastQuestion = computed(() => adjacentQuestions.value[1].id == '')
const nextLink = computed(
    () => 
        isLastQuestion.value ? '/dashboard' : `/quiz/${quiz.value.id}/question/${adjacentQuestions.value[1].id}`   
);

function enterAnswer() {
    quizzesStore.answerQuestion(answer.value, isLastQuestion.value ? null : adjacentQuestions.value[1])
    answer.value = ''
}
</script>

<template>
    <h1 class="question-component-heading">
        {{ quiz.name }} 
    </h1>
    <p class="question-component-text">
        {{ question.text }}
    </p>
    <QuestionOptions @update-answer="(chosenAnswer) => {answer = chosenAnswer}" />
    <div class="question-component-nav">
        <RouterLink
            v-if="adjacentQuestions[0].id != ''"
            :to="`/quiz/${quiz.id}/question/${adjacentQuestions[0].id}`"
            @click="quizzesStore.question = adjacentQuestions[0]"
            class="question-component-back-button"
        >
            <button>Back</button>
        </RouterLink>
        <RouterLink
            v-if="answer != ''"
            :to="nextLink"
            @click="enterAnswer()"
            class="question-component-next-button"
        >
            <button>Next</button>
        </RouterLink>
    </div>
</template>

<style scoped>
</style>
