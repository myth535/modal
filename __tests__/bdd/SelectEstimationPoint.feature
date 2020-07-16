Feature: Select Estimation Point
 
Scenario: Selecting estimation point
  Given The current value of the points is 5 and I have the modal open
  When I click in 21 point option
  Then The modal should be closed
  And updateModalVisibility in the redux state should be false
  And The current value for points should will be 21