# Part4 Testing Express servers, user administration

## Step1:- Structure of backend application
- we will be building a blog list application, that allows users to save information about interesting blogs they have stumbled across on the internet. For each listed blog we will save the author, title, url, and amount of upvotes from users of the application.
- Refactor the application into separate modules 

## Step2:- Testing Node applications
 Sources:- https://www.youtube.com/watch?v=BMUiFMZr7vk&list=PL0zVEGEvSaeEd9hlmCXrk5yUyqUag-n84
 There are many different testing libraries or test runners available for JavaScript.
 - [Jest](https://jestjs.io/)
 - [Mocha](https://mochajs.org/)
 - [Ava](https://github.com/avajs/ava)
 
 [Jest](https://jestjs.io/)

 ### Test Cases using Jest
 - First define a dummy function that receives an array of blog posts as a parameter and always returns the value 1.
 - Define a new totalLikes function that receives a list of blog posts as a parameter. The function returns the total sum of likes in all of the blog posts.
 - Define a new favoriteBlog function that receives a list of blogs as a parameter. The function finds out which blog has most likes. If there are many top favorites, it is enough to return one of them.
 - Define a function called mostBlogs that receives an array of blogs as a parameter. The function returns the author who has the largest amount of blogs.
 - Define a function called mostLikes that receives an array of blogs as its parameter. The function returns the author, whose blog posts have the largest amount of likes
 Source to learn Lodash:- https://lodash.com/

 ## Step3: Testing the Backend 
 ### [Mongo-Mock](#https://github.com/williamkapke/mongo-mock):- In some situations, it can be beneficial to implement some of the backend tests by mocking the database instead of using a real database. One library that could be used for this is mongo-mock.

 ### Test Cases using 'SuperTest'
 - Use the supertest package for writing a test that makes an HTTP GET request to the /api/blogs url. Verify that the blog list application returns the correct amount of blog posts in the JSON format.
 - Write a test that verifies that the unique identifier property of the blog posts is named id, by default the database names the property _id.
 - Write a test that verifies that making an HTTP POST request to the /api/blogs url successfully creates a new blog post.
 - Write a test that verifies that if the likes property is missing from the request, it will default to the value 0.
 - Write a test related to creating new blogs via the /api/blogs endpoint, that verifies that if the title and url properties are missing from the request data, the backend responds to the request with the status code 400 Bad Request.
 - Implement functionality for deleting a single blog post resource.
 - Implement functionality for updating the information of an individual blog post.

## Step 4: User Administration
- Implement a way to create new users by doing a HTTP POST-request to address api/users. Users have username , password and name.
- Do not save passwords to the database as clear text, but use the bcrypt library
- Implement a way to see the details of all users by doing a suitable HTTP request.
![user-info](https://fullstackopen.com/static/b59bda1bd7e5987a5c805332d509e516/14be6/22.png)
- implement tests which check that invalid users are not created and invalid add user operation returns a suitable status code and error message.
- Expand blogs so that each blog contains information on the creator of the blog.
    - use [populate](#https://mongoosejs.com/docs/populate.html)
    - Modify listing all blogs so that the creator's user information is displayed with the blog.
    ![api/blogs](https://fullstackopen.com/static/199682ad74f50747c90997a967856ffa/14be6/23e.png)
    -  listing all users also displays the blogs created by each user
    ![api/users](https://fullstackopen.com/static/ac9967c89785b33440e9b1b4e87c17e5/14be6/24e.png)



## Step 5: Token Authentication
![token-diagram](https://fullstackopen.com/static/8b2839fe97680c325df6647121af66c3/14be6/16e.png)
- Implement token-based authentication
- Modify adding new blogs so that it is only possible if a valid token is sent with the HTTP POST request. The user identified by the token is designated as the creator of the blog.




 