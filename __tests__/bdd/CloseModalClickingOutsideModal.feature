Feature: Close Modal Clicking Oustide Modal
 
Scenario: Closing the modal clicking outside the modal
  Given The current value of the points is 8 and I have the modal open
  When I click outside the modal
  Then The modal should be closed
  And updateModalVisibility in the redux state should be false
  And The current value for points should will remain 8