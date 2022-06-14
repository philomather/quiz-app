<script setup lang="ts">
import { useQuizzesStore } from '@/stores/quizzes';
import { storeToRefs } from 'pinia';
import { ref } from 'vue'

const quizzesStore = useQuizzesStore()
const { question } = storeToRefs(quizzesStore);

let answer = ''
const emit = defineEmits<{
  (e: 'updateAnswer', value: string): void
}>()
</script>

<template>
    <div class="question-options-container">
        <div v-for="option in question.options">
            <label
                :for="option"
                class="question-options-option-label"
                @click="emit('updateAnswer', option)"
            >
                <div class="question-options-option-card">
                    <input
                        type="radio"
                        v-model="answer"
                        :id="option"
                        :value="option"
                    >
                    <p class="question-options-option-text">
                        {{ option }}
                    </p>
                </div>
            </label>
        </div>
    </div>
</template>

<style scoped lang="scss">
.question-options-container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.question-options-option-card {
  display: flex;
  align-items: center;
  margin: 30px;
  padding: 20px;
  width: 60vw;
  max-width: 600px;
  outline: solid map-get($colors, card-outline);
}

.question-options-option-text {
  margin-left: 10px;
}
</style>
