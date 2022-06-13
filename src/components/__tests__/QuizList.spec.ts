import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing'
import sinon from 'sinon'
import QuizList from '../QuizList.vue';
import router from '../../router/index'
import { testQuizzes } from './fixtures/quizzes'

describe("QuizList", () => {
    it("renders heading and quiz cards properly", () => {
        const wrapper = mount(QuizList, {
            global: {
                plugins: [
                    router,
                    createTestingPinia({
                        createSpy: sinon.spy,
                        stubActions: true,
                        initialState: {
                            quizzes: testQuizzes
                        },
                    })],
            },
        })
        const heading = wrapper.get('[class="quiz-list-heading"]')
        expect(heading.text()).toBe("Quizzes")

        const quizCards = wrapper.findAll('[class="quiz-list-card"]')
        expect(quizCards.length).toBe(3)
        expect(quizCards[0].get('h2').text()).toBe("Test Quiz")
        expect(quizCards[1].get('h2').text()).toBe("Example Subject")
        expect(quizCards[2].get('h2').text()).toBe("Tricky One")
    });
});
