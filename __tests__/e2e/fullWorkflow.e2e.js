describe('Modal E2E', () => {
    it('Recreating the entire workflow', () => {
        cy.visit('http://localhost:19006/');

        let currentPoint = '5'     //The initial value in the redux store

        //The current selected point must be 5
        cy.get('div').eq(8).should('have.text', currentPoint)
    });
});
