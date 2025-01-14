describe('User Registration', () => {
    it('should allow a new user to register', () => {
    
      cy.visit('/signup');
      cy.get('input[name="email"]').type('testuser@example.com');
      cy.get('input[name="password"]').type('password123');
  
      
      cy.get('button[type="submit"]').click();
  
    
      cy.url().should('include', '/login');
      cy.contains('Registration successful').should('exist');
    });
  });
  