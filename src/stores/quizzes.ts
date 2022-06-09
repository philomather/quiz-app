import { defineStore } from 'pinia';
import { getAllQuizzes } from '@/api/graphql-helper';

interface Question {
    id: string;
    text: string;
    options: string[];
    answer: string;
    answered: boolean;
    correct: boolean;
}

interface Quiz {
    id: string;
    name: string;
    questions: Question[];
}

interface QuestionData {
    id: string;
    text: string;
    options: string;
    answer: string;
}

interface QuizData {
    id: string;
    name: string;
    questions: QuestionData[];
}

const emptyQuestion = { id: '', text: '', options: [], answer: '', answered: false, correct: false }

export const useQuizzesStore = defineStore({
    id: 'quizzes',
    state: () => ({
        quizzes: [] as Quiz[],
        quiz: {} as Quiz,
        questions: [] as Question[],
        question: {} as Question,
        loading: false,
        error: null
    }),
    actions: {
        async fetchQuizzes() {
            this.loading = true
            try {
                const quizzesResponse = await getAllQuizzes()
                const quizzesData = quizzesResponse.data.data.quizzes
                quizzesData.forEach(
                    (quizData: QuizData) => {
                        const quiz = { id: quizData.id, name: quizData.name, questions: [] as Question[] }

                        const questionsData = quizData.questions
                        questionsData.forEach(
                            (questionData: QuestionData) => {
                                const options = questionData.options.split(',')
                                const question = { 
                                    id: questionData.id, 
                                    text: questionData.text, 
                                    options: options, 
                                    answer: questionData.answer,
                                    answered: false,
                                    correct: false
                                }
                                quiz.questions.push(question)
                            }
                        )

                        this.quizzes.push(quiz)
                    }
                )
            } catch (error: any) {
                this.error = error
            } finally {
                this.loading = false
            }
        },
        getFirstUnansweredQuestionIdByQuizId(quizId: string): Question {
            const selectedQuiz = this.quizzes.find((quiz) => quiz.id == quizId)
            if (!selectedQuiz) {
                return emptyQuestion
            }
            this.quiz = selectedQuiz

            const selectedQuestion = selectedQuiz.questions.find((question) => question.answered == false)

            if (!selectedQuestion) {
                return emptyQuestion
            }
            return selectedQuestion
        }
    },
});
