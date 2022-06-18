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
    <div class="question-component">
        <h1 class="question-component__heading">
            {{ quiz.name }} 
        </h1>
        <p class="question-component__text">
            {{ question.text }}
        </p>
        <QuestionOptions @update-answer="(chosenAnswer) => {answer = chosenAnswer}" />
        <div class="question-component__nav">
            <RouterLink
                v-if="adjacentQuestions[0].id != ''"
                :to="`/quiz/${quiz.id}/question/${adjacentQuestions[0].id}`"
                @click="quizzesStore.question = adjacentQuestions[0]"
                class="question-component__button question-component__button--back"
            >
                Back
            </RouterLink>
            <RouterLink
                v-if="answer != ''"
                :to="nextLink"
                @click="enterAnswer()"
                class="question-component__button question-component__button--next"
            >
                Next
            </RouterLink>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.question-component {
    &__nav {
        margin-top: 60px;
        display: flex;
    }

    &__button {
        @include button;
        color: map-get($colors, positive-outline);

        &--next {
            margin-left: auto;
        }
    }

}
</style>
