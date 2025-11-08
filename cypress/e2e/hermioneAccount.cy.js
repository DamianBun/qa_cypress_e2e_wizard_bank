/// <reference types='cypress' />

describe('Bank app', () => {
  const amountDeposit = Math.random().toString().slice(2, 5);
  const balance = 5096;
  const balanceAfterDeposit = balance + Number(amountDeposit);
  const withdrawl = Math.random().toString().slice(2, 4);
  const balanceAfterWithdraw = balanceAfterDeposit - withdrawl;

  before(() => {
    cy.visit('/');
  });

  it('should provide the ability to work with Hermione\'s bank account', () => {
    cy.contains('.btn', 'Customer Login')
      .click();
    cy.get('#userSelect')
      .select('Hermoine Granger');
    cy.contains('.btn', 'Login')
      .click();
    cy.contains('div', 'Account Number')
      .contains('strong', '1001')
      .should('be.visible');
    cy.contains('div', 'Balance')
      .contains('strong', balance)
      .should('be.visible');
    cy.contains('div', 'Currency')
      .contains('strong', 'Dollar')
      .should('be.visible');
    cy.contains('button', 'Deposit')
      .click();
    cy.get('[placeholder="amount"]')
      .type(amountDeposit);
    cy.get('[type="submit"]')
      .contains('Deposit')
      .click();
    cy.contains('span', 'Deposit Successful');
    cy.contains('div', 'Balance')
      .contains('strong', balanceAfterDeposit)
      .should('be.visible');
    cy.contains('button', 'Withdrawl')
      .click();
    cy.get('[type="submit"]')
      .contains('Withdraw')
      .should('be.visible');
    cy.get('[placeholder="amount"]')
      .type(withdrawl);
    cy.get('[type="submit"]')
      .contains('Withdraw')
      .click();
    cy.contains('span', 'Transaction successful')
      .should('be.visible');
    cy.contains('div', 'Balance')
      .contains('strong', balanceAfterWithdraw)
      .should('be.visible');
    cy.contains('button', 'Transactions')
      .should('be.visible');
    cy.contains('button', 'Transactions')
      .click();
    cy.contains('a', 'Date-Time');
    cy.contains('a', 'Amount');
    cy.contains('a', 'Transaction Type');
    cy.get('.table')
      .each((el) => {
        cy.wrap(el).should('not.be.empty');
      });
    cy.contains('button', 'Back')
      .click();
    cy.get('[id="accountSelect"]')
      .select('1002');
    cy.contains('button', 'Transactions')
      .should('be.visible');
    cy.contains('button', 'Transactions')
      .click();
    cy.contains('button', 'Logout')
      .click();
    cy.contains('div', 'Your Name')
      .should('be.visible');
  });
});
