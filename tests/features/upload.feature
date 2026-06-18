Feature: File Upload
  As a user of the-internet
  I want to upload a file
  So that the system confirms it was received

  Scenario: Upload a file successfully
    Given I am on the upload page
    When I upload the file "tests/fixtures/sample-upload.txt"
    Then I should see the upload confirmation "File Uploaded!"

  Scenario: Submitting without a file does not succeed
    Given I am on the upload page
    When I submit the upload form without choosing a file
    Then I should not see the upload confirmation
