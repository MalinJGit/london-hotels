# Projekt London-hotels

Jag har valt att skapa ett projekt med React och Typescript som Frontend. För backend använder jag Express och Typescript. Applikationen har också en Postgres-databas. Användare kan skapa ett konto med email och lösenord som sedan sparas i databasen. De kan sedan logga in och då få tillgång till hotell i London. Hotellen är sparade i databasen och visar allt ifrån bild till highlights, beskrivning och antal stjärnor. Användare kan även favoritmarkera hotell som de tycker om genom att trycka på "save" knappen. Detta sparas sedan i databasen och finns tillgängligt även om användaren skulle logga ut och in igen. Jag har en favorites i navbaren som inloggad men hann tyvärr inte göra något med den. Detsamma med profil och Om oss. 

Jag har tre stycken tabeller i min databas: users, hotels och favorites. Det är via favorites som users och hotels är kopplade till varandra. Information om tabellen och databasen finns i filen Schema.db i backend-mappen.

## Mål som uppnåtts

- **Registrering och inloggning**: Användare kan registrera sig för att sedan logga in till sitt egna konto. Detta sparas i min Postgres-databas.
- **Favoritmarkera hotell**: Användare kan favoritmarkera hotell genom att klicka på spara knappen. Detta sparas sedan i databasen.
- **DRY-design**: Jag har använt mig av DRY-design genom att jag har kunnat återanvända komponenter. 
- **TDD-testing**: Testerna skrevs innan för att få en bättre bild över hur applikationen kan se ut. 
- **BDD-testing**: BDD-testing är även det uppfyllt i mina e2e-tester. 

## Starta projektet

För att starta projektet lokalt, följ dessa steg:

### 1. **Frontend**

För att starta frontend (React + TypeScript):

1. Gå till frontend-mappen via "cd frontend"

2. Installera alla nödvändiga beroenden via "npm install"

3. Skriv därefter in: npm run dev

   Detta startar frontend via Vite och öppnar applikationen på http://localhost:5173.

   ### 2. **Backend**

1. Gå till backend-mappen via "cd backend"

2. Installera alla nödvändiga beroenden via "npm install"

3. Skriv in: npx ts-node index.ts

Detta kör backend-servern med ts-node och servern startar på http://localhost:5003.

 ### **Mjukvarutester**

Det går bra att testa med den email och lösenord som är skrivna i testerna.

 Cypress mapp i Root-mappen:

### **Component**

 - navbar.cy.ts (ett komplett e2e-test)

### **E2e**

 - favourite-test.cy.ts
 - login.cy.ts
 - registrering.cy.ts