# Part5 Testing React Apps

## Step 1: Login in Frontend
- Implement login functionality to the frontend. The token returned with a successful login is saved to the application's state user.
- If a user is not logged in, only the login form is visible.
![login-form](https://fullstackopen.com/static/7974958a48f7a4e873550b1b85bd8cbd/14be6/4e.png) <br /> <br />
- If user is logged in, the name of the user and a list of blogs is shown.
![img2](https://fullstackopen.com/static/62a606d23ac2c2c96918567b8a8c7b32/14be6/5e.png) <br /> <br />
- Make the login 'permanent' by using the local storage. Also implement a way to log out.
![logout](https://fullstackopen.com/static/fa111e6eccf20340b5258c12553d2ea6/14be6/6e.png) <br /><br />
- Ensure the browser does not remember the details of the user after logging out.
- Expand your application to allow a logged in user to add new blogs:
![new-blog](https://fullstackopen.com/static/b9f4cf7f481e4f1358be610031afe219/14be6/7e.png) <br /> <br />
- Implement notifications which inform the user about successful and unsuccessful operations at the top of the page.
![notification](https://fullstackopen.com/static/58838a80180d9d94fb4bc3673a8a67c0/14be6/8e.png) <br /> <br />
<br />

## Step 2: BlogList Frontend
- Change the form for creating blog posts so that it is only displayed when appropriate.
- By default the form is not visible
![form](https://fullstackopen.com/static/de4cfabdf46a837f1f0bfdba4fd27d67/14be6/13ae.png) <br /> <br />
- It expands when button new note is clicked
![formExpand](https://fullstackopen.com/static/0cb27abc7b56ba5ecdd7e9d48d325c87/14be6/13be.png) <br /> <br />
- The form closes when a new blog is created.
- Let's add each blog a button, which controls if all of the details about the blog are shown or not. Full details of the blog open when the button is clicked.
![blog](https://fullstackopen.com/static/b49e9ca45d0582829eed343baad44910/14be6/13ea.png) <br /> <br />
- Implement the functionality for the like button. Likes are increased by making an HTTP PUT request to the unique address of the blog post in the backend.
- Modify the application to list the blog posts by the number of likes. Sorting the blog posts can be done with the array sort method.
- Add a new button for deleting blog posts. Also implement the logic for deleting blog posts in the backend.
![deleteBlog](https://fullstackopen.com/static/87b7180f1f10ce670af1bc21f50233ec/14be6/14ea.png) <br /> <br />
- Show the button for deleting a blog post only if the blog post was added by the user.
- The expected and required props of a component can be defined with the [prop-types](https://github.com/facebook/prop-types) package. 
<br />

## Step 3: Testing React App 
### (use 'npm run test' command for testing)
- Make a test, which checks that the component displaying a blog renders the blog's title and author, but does not render its url or number of likes by default
- Make a test, which checks that blog's url and number of likes are shown when the button controlling the shown details has been clicked.
- Make a test which ensures that if the like button is clicked twice, the event handler the component received as props is called twice.
- Make a test for the new blog form. The test should check, that the form calls the event handler it received as props with the right details when a new blog is called.
<br />

## Step4: End to End Testing (using Cypress)
We can do E2E testing of an web application using a browser and a testing library. <br />
#### Libraries for Testing
- [Selenium](https://www.selenium.dev/)
- [Headless Browser](https://en.wikipedia.org/wiki/Headless_browser)
- [Regression](https://en.wikipedia.org/wiki/Regression_testing)
- [Flaky](https://hackernoon.com/flaky-tests-a-war-that-never-ends-9aa32fdef359)
- [Cypress](https://www.cypress.io/)

### How to use Cypress
- [Introduction To Cypress](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html#Cypress-Can-Be-Simple-Sometimes)
- [Documentation](https://docs.cypress.io/guides/overview/why-cypress.html#In-a-nutshell) <br /> <br />
- [download Cypress](https://docs.cypress.io/guides/getting-started/installing-cypress.html#Direct-download)
- When we first run Cypress, it creates a cypress directory. It contains a integrations subdirectory, where we will place our tests. Cypress creates a bunch of example tests for us, but we will delete all those and make our own test in file blog_app.speck.js:
- We start the test from the opened window:
![cypress-window](https://fullstackopen.com/static/8dfbc279260680436d4024b309ba76af/14be6/40ea.png) <br /> <br />
- Running the test opens your browser and shows how the application behaves as the test is run.
![cypressWindow](https://fullstackopen.com/static/edf964b1c7c39e1cf9f1043642abd72f/14be6/32ae.png) <br /> <br />
- cy.visit and cy.contains are Cypress commands, and their purpose is quite obvious. cy.visit opens the web address given to it as a parameter on the browser used by the test. cy.contains searches for the string it received as a parameter from the page.
<br/> <br/>
- Run backend in testing mode using 'npm run start:test'
- Run frontend using 'npm start'
- start the Cypress Application


### Exercises
- Configure Cypress to your project. Make a test for checking that the application displays the login form by default.
- Make tests for logging in. Test both successful and unsuccessful log in attempts. Make a new user in the beforeEach block for the tests.
- Make a test which checks, that a logged in user can create a new blog. The test has to ensure, that a new blog is added to the list of all blogs.
- Make a test which checks that user can like a blog.
- Make a test for ensuring, that the user who created a blog can delete it.
- Make a test which checks, that the blogs are ordered according to likes with the blog with the most likes being first.

#### bloglist-backend directory is similar to part-4 exercises only one route to reset the database is added for testing purpose









