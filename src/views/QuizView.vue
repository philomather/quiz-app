<script setup lang="ts">
import QuestionComponent from "@/components/QuestionComponent.vue";
import { useQuizzesStore } from '@/stores/quizzes';
import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router'

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
    <div class="quiz-view">
        <QuestionComponent />
    </div>
</template>

<style>
.quiz-view {
  text-align: center;
}
</style>