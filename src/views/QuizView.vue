<script setup lang="ts">
import QuestionComponent from "@/components/QuestionComponent.vue";
import { useQuizzesStore } from '@/stores/quizzes';
import { onMounted } from 'vue';
import { useRouter, useRoute, RouterLink } from 'vue-router'

const quizzesStore = useQuizzesStore()

const router = useRouter()
const route = useRoute()

onMounted(() => {
    if (!route.params.question_id) {
        const question = quizzesStore.getFirstUnansweredQuestionIdByQuizId(route.params.quiz_id as string)
        quizzesStore.question = question
        router.push(`/quiz/${route.params.quiz_id}/question/${question.id}`)
    }
})
</script>

<template>
    <div class="quiz-view">
        <RouterLink
            class="quiz-view__breadcrumb"
            to="/dashboard"
        />
        <div class="quiz-view__question-container">
            <QuestionComponent />
        </div>
    </div>
</template>

<style lang="scss">
.quiz-view {
    .quiz-view__breadcrumb {
        position: absolute;
        top: $view-container-top;
        left: 60px;
        height: 30px;
        width: 30px;
        z-index: 1;
        font-size: large;
        font-weight: 700;
        background-color: map-get($colors, card-outline);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;;

        &:before {
            content: '';
            display: block;
            width: 10px;
            height: 10px;
            border-left: 2px solid;
            border-bottom: 2px solid;
            transform: translateX(2px) rotate(45deg);
            color: var(--vt-c-white);
        }
    }
    .quiz-view__question-container {
        text-align: center;
        top: $view-container-top;
        width: 60vw;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
    }
}
</style>