Feature: Open Modal
 
Scenario: Opening the modal
  Given I have a button for open a modal
  When I click the button
  Then updateModalVisibility in the redux state should be true
