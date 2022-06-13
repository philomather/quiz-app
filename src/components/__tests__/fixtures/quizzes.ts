
const testQuizzes = {
    quizzes: [
        {
            id : 'abcdef',
            name: 'Test Quiz',           
        },
        {
            id: 'abcd',
            name: 'Example Subject',
        },
        {
            id: 'ab',
            name: 'Tricky One',
        },
    ],
}

const testQuizAndQuestion = {
    quiz: {
        id: 'abcdef',
        name: 'Geography',
        questions: []
    },
    question: {
        id: 'ghijkl',
        text: 'What is the capital of Greece?',
        options: ['Istanbul', 'Athens', 'Sarajevo', 'Rome'],
        answer: 'Athens',
        answered: false,
        correct: false,
    },
}

export { testQuizzes, testQuizAndQuestion }