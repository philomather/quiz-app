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
        const question = quizzesStore.getFirstUnansweredQuestionIdByQuizId(route.params.quiz_id)
        quizzesStore.question = question
        router.push(`/quiz/${route.params.quiz_id}/question/${question.id}`)
    }
})
</script>

<template>
    <RouterLink
        class="quiz-view-breadcrumb"
        to="/dashboard"
    >
        {{ '<' }}
    </RouterLink>
    <div class="quiz-view-question-container">
        <QuestionComponent />
    </div>
</template>

<style>
.quiz-view-breadcrumb {
    position: absolute;
    left: 60px;
    top: 20px;
    width: 30px;
    height: 30px;
    z-index: 1;
    font-size: large;
    font-weight: 700;
}
.quiz-view-question-container {
  text-align: center;
}
</style>