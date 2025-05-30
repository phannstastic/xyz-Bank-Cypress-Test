class LoginPage {
  visit() {
    cy.visit('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login');
  }

  clickManagerLogin() {
    cy.get(':nth-child(3) > .btn').click();
  }

  clickCustomerLogin() {
    cy.get('.borderM > :nth-child(1) > .btn').click();
  }

  selectCustomer(customerName) {
    cy.get('#userSelect').select(customerName);
  }

  clickLogin() {
    cy.get('form.ng-valid > .btn').click();
  }
}

export default LoginPage;