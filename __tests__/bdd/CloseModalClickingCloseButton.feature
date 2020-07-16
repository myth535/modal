Feature: Close Modal Clicking Close Button
 
Scenario: Closing the modal clicking the close button
  Given The current value for points is 13 and I have open a modal and the modal have a button for close it
  When I click the close button
  Then The modal should be closed
  And updateModalVisibility in the redux state should be false
  And The current value for points should will remain 13