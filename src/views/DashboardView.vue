<script setup lang="ts">
import QuizList from "@/components/QuizList.vue";
</script>

<template>
    <div class="dashboard">
        <QuizList />
    </div>
</template>

<style lang="scss">
.dashboard {
    text-align: center;
    top: $view-container-top-small;

    @media (min-width: 1024px) {
        top: $view-container-top-large;
        left: 60px;
    }
}
</style>
