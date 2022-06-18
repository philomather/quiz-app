describe('Quiz test', () => {
    it('starts the geography quiz and answers all the questions', () => {
        cy.visit('/');
        cy.get('[class="quiz-list__card-link"]')
        .first()
        .trigger('click');

        answerQuestionAndPressNext(1);
        answerQuestionAndPressNext(2);
        answerQuestionAndPressNext(2);

        cy.get('[class="quiz-list__card-progress"]')
        .contains('Score: 2/3');
    });
});

function answerQuestionAndPressNext(option: number) {
    cy.get('[class="question-options__option-card"]')
    .eq(option)
    .trigger('click');

    cy.get('[class="question-component__button question-component__button--next"]')
    .trigger('click');
}
