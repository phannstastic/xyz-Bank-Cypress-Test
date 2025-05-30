import LoginPage from '../support/Pages/LoginPage';
import ManagerPage from '../support/pages/ManagerPage';
import CustomerPage from '../support/pages/CustomerPage';

describe('Banking Project Automation Tests', () => {
  const loginPage = new LoginPage();
  const managerPage = new ManagerPage();
  const customerPage = new CustomerPage();

  beforeEach(() => {
    loginPage.visit();
  });

  // Manager Test
  describe('Manager Tests', () => {
    it('TC-01-MAN: Login as Manager', () => {
      loginPage.clickManagerLogin();
      cy.url().should('include', '/manager');
    });

    it('TC-02-MAN: Add new customer', () => {
      loginPage.clickManagerLogin();
      managerPage.clickAddCustomer();
      managerPage.addCustomer('Irfan', 'Trinugroho', '36556');
      cy.on('window:alert', (alertText) => {
        expect(alertText).to.contain('Customer added successfully');
      });
    });


    it('TC-03-MAN: Add customer with invalid data', () => {
      loginPage.clickManagerLogin();
      managerPage.clickAddCustomer();
      cy.get('button[type="submit"]').click();
      cy.get(':nth-child(1) > .form-control').should('have.class', 'ng-invalid');
      cy.get(':nth-child(2) > .form-control').should('have.class', 'ng-invalid');
      cy.get(':nth-child(3) > .form-control').should('have.class', 'ng-invalid');
    });

    it('TC-04-MAN: Open account for customer', () => {
      loginPage.clickManagerLogin();
      managerPage.clickAddCustomer();
      managerPage.addCustomer('Irfan', 'Trinugroho', '36556');
      managerPage.clickOpenAccount();
      managerPage.openAccount('Irfan Trinugroho', 'Dollar');
      cy.on('window:alert', (text) => {
        expect(text).to.contain('Account created successfully');
      });
    });

    it('TC-05-MAN: Attempt to open account without selecting data', () => {
      loginPage.clickManagerLogin();
      managerPage.clickOpenAccount();
      cy.get('button[type="submit"]').click();
      // Tidak akan ada alert sukses
      cy.on('window:alert', (text) => {
        expect(text).not.to.contain('Account created successfully');
      });
    });

    it('TC-06-MAN: Delete customer account', () => {
      loginPage.clickManagerLogin();
      managerPage.clickCustomers();
      managerPage.deleteCustomer('Irfan');
      cy.get('tbody tr').should('have.length', 0);
    });
  });

  // Customer Tests
  describe('Customer Tests', () => {
    beforeEach(() => {
      loginPage.clickCustomerLogin();
      loginPage.selectCustomer('Harry Potter');
      loginPage.clickLogin();
    });

    it('TC-01-CUS: Login as Customer', () => {
      cy.url().should('include', '/account');
    });

    it('TC-02-CUS: Deposit 100 into account', () => {
      customerPage.clickDeposit();
      customerPage.enterDepositAmount('100');
      customerPage.submitDeposit();
      customerPage.verifyBalance('100');
    });

    it('TC-03-CUS: Deposit with invalid amount (-100)', () => {
      customerPage.clickDeposit();
      customerPage.enterDepositAmount('-100');
      customerPage.submitDeposit();
      cy.get('.error');
    });

    it('TC-04-CUS: Withdraw 50 when balance > 50', () => {
      // Deposito terlebih dahulu
      customerPage.clickDeposit();
      customerPage.enterDepositAmount('100');
      customerPage.submitDeposit();
      
      // Kemudian withdrawl
      customerPage.clickWithdrawl();
      cy.wait(1000);
      customerPage.enterWithdrawlAmount('50');
      customerPage.submitWithdrawl();
      customerPage.verifyBalance('50');
    });

    it('TC-05-CUS: Withdraw 50 when balance < 50', () => {
      customerPage.clickWithdrawl();
      customerPage.enterWithdrawlAmount('50');
      customerPage.submitWithdrawl();
      cy.get('.error').should('contain', 'Transaction Failed. You can not withdraw amount more than the balance.');
    });

    it('TC-06-CUS: Withdraw without input balance', () => { 
      customerPage.clickWithdrawl();
      cy.get('.form-control').clear();
      customerPage.submitWithdrawl();
      cy.on('window:alert', (text) => {
        expect(text).to.contain('Please enter a valid amount');
      })
    });

    it('TC-07-CUS: Check transaction history', () => {
      // Buat transaksi terlebih dahulu
      customerPage.clickDeposit();
      customerPage.enterDepositAmount('100');
      customerPage.submitDeposit();
      cy.wait(1000);
      
      // cek history
      customerPage.clickTransactions();
      customerPage.verifyTransactionHistory();
    });

    it('TC-08-CUS: Logout from customer account', () => {
      customerPage.clickLogout();
      customerPage.verifyAtCustomerLoginPage();
    });
  });
});