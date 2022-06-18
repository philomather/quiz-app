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
    <div class="question-options__container">
        <label
            v-for="option in question.options"
            :for="option"
            class="question-options__option-label"
            @click="emit('updateAnswer', option)"
        >
            <input
                name="option"
                class="question-options__option-input"
                type="radio"
                v-model="answer"
                :id="option"
                :value="option"
            >
            <div class="question-options__option-card">
                <p class="question-options__option-text">
                    {{ option }}
                </p>
            </div>
        </label>
    </div>
</template>

<style scoped lang="scss">
.question-options {
  &__container{
    margin-top: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
  }

  &__option-label {
    width: 100%;
  }

  &__option-input {
    position: absolute;
    visibility: hidden;
  }

  &__option-card {
    display: flex;
    align-items: center;
    padding: 20px;
    color: map-get($colors, card-outline);
    border: 2px solid;
    border-radius: 8px;
    cursor: pointer;

    &:before {
      content: '';
      width: 20px;
      height: 20px;
      border: 2px solid;
      border-radius: 50%;
    }
  }

  &__option-input:checked + &__option-card {
    background-color: map-get($colors, card-outline);
    color: var(--vt-c-white);

    &:before {
      background-color: currentColor;
    }
  }

  &__option-text {
    margin-left: 10px;
    @include label-text;
  }
}
</style>
