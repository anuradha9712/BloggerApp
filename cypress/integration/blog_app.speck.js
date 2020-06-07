describe('Blog App ', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
        name: 'Anu',
        username: 'Anuradha2612',
        password: '123456789'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user) 
        cy.visit('http://localhost:3000')
      })

      //use it.only to run any particular test case
    it('Login page can be opened', function() {
      cy.contains('username')
      cy.contains('password')
    })

    it('login fails with wrong password', function() {
        cy.contains('login').click()
        cy.get('#username').type('Anuradha2612')
        cy.get('#password').type('wrong')
        cy.get('#login-button').click()
        //cy.get('.error').contains('Wrong credentials')
        cy.get('.error')
            .should('contain', 'Wrong credentials') 
            .and('have.css', 'color', 'rgb(0, 128, 0)')
            .and('have.css', 'border-style', 'solid')

        cy.get('html').should('not.contain', 'Anu logged in Anuradha2612')

      })

    it('user can login', function () {
        cy.contains('login').click()
        //cy.get('input:first').type('Anuradha2612')
        //cy.get('input:last').type('123456789')
        cy.get('#username').type('Anuradha2612')
        cy.get('#password').type('123456789')
        cy.get('#login-button').click()

        cy.contains('Anu logged in Anuradha2612')
    }) 

    describe('when logged in', function() {

        beforeEach(function() {
         /*   
          cy.contains('login').click()
          cy.get('#username').type('Anuradha2612')
          cy.get('#password').type('123456789')
          cy.get('#login-button').click()
          */

          // Use Custom commands which are declared in cypress/support/commands.js
         cy.login({ username: 'Anuradha2612', password: '123456789' })

        })
    
        it('a new Blog can be created', function() {
          cy.contains('New Note').click()
          cy.get('#title').type('CypressTesting')
          cy.get('#author').type('Anuradha')
          cy.get('#url').type('www.cypress.com')
          cy.contains('create').click()
          cy.contains('CypressTesting Anuradha')
        })

        describe('and a new blog exists', function () {
            beforeEach(function () {
                cy.contains('New Note').click()

                // Use Custom commands which are declared in cypress/support/commands.js
                cy.createBlog({
                    title: 'CypressTesting',
                    author: 'Anuradha',
                    url:'www.cypress.com'
                  })
            })
      
            it('User can like the blog', function () {
                cy.contains('CypressTesting Anuradha')
                cy.contains('View').click()
      
                cy.contains('like').click()
                cy.contains('Likes: 1')
            })

            it('User can delete the blog', function () {
                cy.contains('CypressTesting Anuradha')
                cy.contains('View').click()
      
                cy.contains('remove').click()
                cy.get('html').should('not.contain', 'CypressTesting Anuradha')
            })
        })

        
    })
})