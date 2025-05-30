class CustomerPage {
    clickDeposit() {
        cy.get('[ng-class="btnClass2"]').click();
    }
  
    enterDepositAmount(amount) {
        cy.get('.form-control').type(amount);
    }
  
    submitDeposit() {
        cy.get('button[type="submit"]').click();
    }
  
    clickWithdrawl() {
        cy.get('[ng-class="btnClass3"]').click();
    }
  
    enterWithdrawlAmount(amount) {
        cy.get('.form-control').type(amount);
    }
  
    submitWithdrawl() {
        cy.get('button[type="submit"]').click();
    }
  
    verifyBalance(expectedBalance) {
        cy.get('.borderM > :nth-child(3) > :nth-child(2)').should('contain', expectedBalance);
    }
  
    clickTransactions() {
        cy.get('[ng-class="btnClass1"]').click();
    }
  
    verifyTransactionHistory() {
      cy.get('tbody tr').should('have.length.greaterThan', 0);
    }

    clickLogout() {
        cy.get('button[ng-click="byebye()"]').click();
      }
    
    verifyAtCustomerLoginPage() {
        cy.url().should('include', '/customer');
        cy.get('button[ng-click="customer()"]').should('not.exist');
        cy.get('#userSelect').should('be.visible');
    }
  }
  
  export default CustomerPage;