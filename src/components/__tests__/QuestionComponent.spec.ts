import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing'
import sinon from 'sinon'
import QuestionComponent from '../QuestionComponent.vue';
import router from '../../router/index'
import { testQuizAndQuestion } from './fixtures/quizzes'

describe("QuestionComponent", () => {
    it("renders heading, question text and options correctly", () => {
        const wrapper = mount(QuestionComponent, {
            global: {
                plugins: [
                    router,
                    createTestingPinia({
                        createSpy: sinon.spy,
                        stubActions: true,
                        initialState: {
                            quizzes: testQuizAndQuestion
                        },
                    })],
            },
        })
        const heading = wrapper.get('[class="question-component-heading"]')
        expect(heading.text()).toBe("Geography")

        const quizCards = wrapper.findAll('[class="question-component-option-card"]')
        expect(quizCards.length).toBe(4)
        expect(quizCards[0].text()).toBe("Istanbul")
        expect(quizCards[1].text()).toBe("Athens")
        expect(quizCards[2].text()).toBe("Sarajevo")
        expect(quizCards[3].text()).toBe("Rome")
    });
});
