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
    completed: boolean;
    score: number;
    total: number;
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

const emptyQuestion = { id: '', text: '', options: [], answer: '', answered: false, correct: false } as Question

export const useQuizzesStore = defineStore({
    id: 'quizzes',
    state: () => ({
        quizzes: [] as Quiz[],
        quiz: {} as Quiz,
        question: {} as Question,
        loading: false,
        error: null
    }),
    getters: {
        adjacentQuestions(state): Question[] {
            if (!state.quiz.questions || !state.question) {
                return [emptyQuestion, emptyQuestion]
            }

            let previousIndex = null
            let nextIndex = null
            state.quiz.questions.some((question, index) => {
                if (question.id == state.question.id) {
                    previousIndex = index - 1
                    nextIndex = index + 1
                    return true
                }

                return false
            })
            
            let previousQuestion = emptyQuestion
            let nextQuestion = emptyQuestion
            if (previousIndex !== null && previousIndex >= 0 && previousIndex < state.quiz.questions.length) {
                previousQuestion = state.quiz.questions[previousIndex]
            }
            if (nextIndex !== null && nextIndex >= 0 && nextIndex < state.quiz.questions.length) {
                nextQuestion = state.quiz.questions[nextIndex]
            }

            return [previousQuestion, nextQuestion]
        }
    },
    actions: {
        async fetchQuizzes() {
            this.loading = true
            try {
                const quizzesResponse = await getAllQuizzes()
                const quizzesData = quizzesResponse.data.data.quizzes
                quizzesData.forEach(
                    (quizData: QuizData) => {
                        const quiz = { id: quizData.id, name: quizData.name, questions: [] as Question[], completed: false, score: 0, total: 0 }

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
                                quiz.total += 1
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
            this.question = selectedQuestion

            return selectedQuestion
        },
        answerQuestion(answer: string, nextQuestion: Question|null) {
            this.question.answered = true
            this.question.correct = answer == this.question.answer

            if (nextQuestion !== null) {
                this.question = nextQuestion
            }
            else {
                this.calculateScore()
                this.quiz.completed = true
            }
        },
        calculateScore() {
            this.quiz.score = 0
            this.quiz.questions.forEach((question) => {
                if (question.correct) {
                    this.quiz.score += 1
                }
            })
        },
        resetQuiz(quiz: Quiz) {
            if (quiz.completed) {
                quiz.questions.forEach((question) => {
                    question.answered = false
                    question.correct = false
                })
                
                quiz.score = 0
                quiz.completed = false
            }
        }
    },
});
