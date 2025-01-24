Feature: About us (Om oss sida)

  Scenario: Navigera till "About us"-sidan från navbar
    Given Jag är på startsidan och kan se texten "About us" i sidans navbar högst upp.
    When Jag klickar på texten "About us"
    Then Blir då omdirigerad till en ny sida med information om skaparna.
    Then Jag vill också kunna skapa ett konto eller logga in från About us-sidans
    Then Jag vill kunna gå tillbaka till startsidan via en länk i navbaren med "Home"