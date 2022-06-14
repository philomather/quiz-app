describe('Quiz test', () => {
    it('starts the geography quiz and answers all the questions', () => {
        cy.visit('/');
        cy.get('[class="quiz-list-card-link"]')
        .first()
        .trigger('click');

        answerQuestionAndPressNext(1);
        answerQuestionAndPressNext(2);
        answerQuestionAndPressNext(2);

        cy.get('[class="quiz-list-card-progress"]')
        .contains('Score: 2/3');
    });
});

function answerQuestionAndPressNext(option: number) {
    cy.get('[class="question-options-option-card"]')
    .eq(option)
    .trigger('click');

    cy.get('[class="question-component-next-button"]')
    .trigger('click');
}
