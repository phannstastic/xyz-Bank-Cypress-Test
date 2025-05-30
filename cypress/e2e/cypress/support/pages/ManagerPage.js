class ManagerPage {
    clickAddCustomer() {
        cy.get('[ng-class="btnClass1"]').click();
    }
  
    addCustomer(firstName, lastName, postCode) {
        cy.get(':nth-child(1) > .form-control').type(firstName);
        cy.get(':nth-child(2) > .form-control').type(lastName);
        cy.get(':nth-child(3) > .form-control').type(postCode);
        cy.get('button[type="submit"]').click();
    }
  
    clickOpenAccount() {
        cy.get('[ng-class="btnClass2"]').click();
    }
  
    openAccount(customerName, currency) {
        cy.get('#userSelect').select(customerName);
        cy.get('#currency').select(currency);
        cy.get('button[type="submit"]').click();
    }
  
    clickCustomers() {
        cy.get('[ng-class="btnClass3"]').click();
    }
  
    deleteCustomer(customerName) {
      cy.get('input[placeholder="Search Customer"]').type('Ron');
      cy.get('tbody tr').should('have.length', 1);
      cy.get('tbody tr td button').click();
    }
  }
  
  export default ManagerPage;