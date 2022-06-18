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
        const heading = wrapper.get('[class="question-component__heading"]')
        expect(heading.text()).toBe("Geography")

        const quizOptionCards = wrapper.findAll('[class="question-options__option-card"]')
        expect(quizOptionCards.length).toBe(4)
        expect(quizOptionCards[0].text()).toBe("Istanbul")
        expect(quizOptionCards[1].text()).toBe("Athens")
        expect(quizOptionCards[2].text()).toBe("Sarajevo")
        expect(quizOptionCards[3].text()).toBe("Rome")
    });

    it("selecting an option activates the next button", async () => {
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
        let nextButton = wrapper.find('[class="question-component__button question-component__button--next"]')
        expect(nextButton.exists()).toBe(false)

        const quizOptionCards = wrapper.findAll('[class="question-options__option-card"]')
        await quizOptionCards[0].trigger('click')

        nextButton = wrapper.find('[class="question-component__button question-component__button--next"]')
        expect(nextButton.exists()).toBe(true)
    });
});
