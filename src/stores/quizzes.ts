import { defineStore } from 'pinia';
import { getAllQuizzes } from '@/api/graphql-helper';

interface QuestionId {
    id: string
}

interface Quiz {
    id: string;
    name: string;
    questions: QuestionId[];
}

export const useQuizzesStore = defineStore({
    id: 'quizzes',
    state: () => ({
        quizzes: [] as Quiz[],
        loading: false,
        error: null
    }),
    actions: {
        async fetchQuizzes() {
            this.loading = true
            try {
                const quizResponse = await getAllQuizzes()
                this.quizzes = quizResponse.data.data.quizzes
            } catch (error: any) {
                this.error = error
            } finally {
                this.loading = false
            }
        }
    },
});
