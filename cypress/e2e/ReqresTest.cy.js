describe('Automation API ReqRes', () => {
    const baseUrl = 'https://reqres.in/api';
  
    it('GET Single users', () => {
      
      cy.request('GET', `https://reqres.in/api/users/2`).as('getSingleUser')
      cy.get('@getSingleUser').its('status').should('equal',200);
      cy.get('@getSingleUser').its('body').its('data').its('first_name').should('include', 'Janet');
    });
    
    it('GET User Not Found', () => {

      cy.request({
        method: 'GET',
        url: 'https://reqres.in/api/users/23',
        failOnStatusCode: false
      }).as('getUserNotFound');
      cy.get('@getUserNotFound').its('status').should('equal', 404)
    });

    it('POST Login Succesfull', () => {

      cy.request({
        method: 'POST',
        url: 'https://reqres.in/api/users',
        body: {
          email: 'eve.holt@reqres.in',
          password: 'cityslicka'
        }
      }).its('status').should('eq', 201)
    });

    it('PATCH User', () => {

      cy.request({
        method: 'PATCH',
        url: 'https://reqres.in/api/users/2',
        body: {
          name: 'morpheus',
          job: 'zion resident'
        }
      }).its('status').should('eq', 200)
    });

    it('PUT User', () => {

      cy.request({
        method: 'PUT  ',
        url: 'https://reqres.in/api/users/2',
        body: {
          name: 'morpheus',
          job: 'zion resident'
        }
      }).its('status').should('eq', 200)
    });

    it('DELETE user', () => {

      cy.request({
        method: 'DELETE',
        url: 'https://reqres.in/api/users/2'
      }).its('status').should('eq', 204)
    });

    });