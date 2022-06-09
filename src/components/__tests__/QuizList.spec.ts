import { describe, it, expect } from 'vitest';
import { mount } from "@vue/test-utils";
import { createTestingPinia } from '@pinia/testing'
import sinon from 'sinon'
import QuizList from '../QuizList.vue';

describe("QuizList", () => {
    it("renders properly", () => {
        const wrapper = mount(QuizList, {
            global: {
                plugins: [createTestingPinia({
                    createSpy: sinon.spy,
                })],
            },
        });
        expect(wrapper.text()).toContain("Quizzes");
    });
});
