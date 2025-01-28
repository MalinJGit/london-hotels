Feature: About us (Om oss sida)

  Scenario: Navigera till "About us"-sidan från navbar
    Given Jag är på hemsidan och ska se en text med "About us" i navbaren
    When Jag rör datormusen över navbaren och klickar på texten "About us"
    Then Blir då omdirigerad till en ny sida med information om skaparna
    Then Jag vill också kunna skapa ett konto eller logga in. Därbör bör login-form vara tillgänglig
    Then Jag vill också kunna gå tillbaka till startsidan via en länk i navbaren