function checkingOpenModalProperly(tree, currentPoint) {
    //Click the current point button to open the modal
    cy.get('div').eq(6).click()

    //Validate a property in the modal (to know that it is open)
    cy.get('div').eq(10).should('have.css', 'margin-top', '20px')

    //Validate a header text in the modal (to know that it is open)
    cy.get('div').eq(12).should('have.text', "Story Point Estimation")

    //Validate that the selected point in the modal is the current point, the background color class r-backgroundColor-t6fudj, is only for the selected option
    cy.get('div').eq(33).should('have.text', currentPoint)
    cy.get('div').eq(33).should('have.class', 'r-backgroundColor-t6fudj')
}

function checkingModalIsClosedAndRemainValue(tree, currentPoint) {
    //Negate a property in the modal (for know that is closed and is other div)
    cy.get('div').eq(10).should('not.have.css', 'margin-top', '20px')
    //I am not going to test if Story Point Estimation exist in div 12, because right now div 12 is detached to the DOM

    //Validate that the current selected point remains the same
    cy.get('div').eq(8).should('have.text', currentPoint)
}

describe('Modal E2E', () => {
    it('Recreating the entire workflow', () => {
        cy.visit('http://localhost:19006/');

        let currentPoint = '5'     //The initial value in the redux store

        //The current selected point must be 5
        cy.get('div').eq(8).should('have.text', currentPoint)
        
        //Checking if the modal opens and has the value 5 active
        checkingOpenModalProperly(cy, currentPoint)

        //Click the Close button to close the modal
        cy.get('div').eq(13).click()

        //Checking if the modal closes and the selected value remains is 5
        checkingModalIsClosedAndRemainValue(cy, currentPoint)

         //Checking if the modal opens and has the value 5 active
         checkingOpenModalProperly(cy, currentPoint)

         //Click outside the modal to close the modal.
        cy.get('div').eq(0).click()

        //Checking if the modal closes and the selected value remains is 5
        checkingModalIsClosedAndRemainValue(cy, currentPoint)

        //Checking if the modal opens and has the value 5 active
        checkingOpenModalProperly(cy, currentPoint)
    });
});
