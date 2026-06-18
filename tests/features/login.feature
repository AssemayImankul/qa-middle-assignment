Feature: Form Authentication
  As a user of the-internet
  I want to log in with my credentials
  So that I can access the Secure Area

  Background:
    Given I am on the login page

  Scenario: Successful login with valid credentials
    When I log in as "tomsmith" with password "SuperSecretPassword!"
    Then I should see the flash message "You logged into a secure area!"
    And I should be on the secure area page

  # Data-driven via Scenario Outline (Equivalence Partitioning over invalid classes)
  Scenario Outline: Login is rejected for invalid credentials
    When I log in as "<username>" with password "<password>"
    Then I should see the flash message "<error>"
    And I should remain on the login page

    Examples:
      | username  | password             | error                     |
      | wronguser | SuperSecretPassword! | Your username is invalid! |
      | tomsmith  | wrongpass            | Your password is invalid! |
