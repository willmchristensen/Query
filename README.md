# Query

Welcome to Query, a web application that allows you to create, manage, and edit questions. You are able also able to organize questions into a particular topic you may be interested in. This README will provide you with the necessary information to get started with Query.


## Live Link

https://query-bhy5.onrender.com/spaces

### :hammer_and_wrench: Technologies Used :

<div align="center">
  <p style="background-color: lightgray; padding: 10px; border-radius: 5px;">
  <img src="https://github.com/devicons/devicon/blob/master/icons/react/react-original-wordmark.svg" title="React" alt="React" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/redux/redux-original.svg" title="Redux" alt="Redux " width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/css3/css3-plain-wordmark.svg"  title="CSS3" alt="CSS" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/html5/html5-original.svg" title="HTML5" alt="HTML" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/javascript/javascript-original.svg" title="JavaScript" alt="JavaScript" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/sqlite/sqlite-original-wordmark.svg" title="SQLite3" alt="SQLite3" width="40" height="40"/>&nbsp;
  <img src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/flask/flask-original-wordmark.svg" title="Flask" alt="Flask" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" title="AWS" alt="AWS" width="40" height="40"/>&nbsp;
    <img src="https://github.com/devicons/devicon/blob/master/icons/postgresql/postgresql-original-wordmark.svg" title="postgresql" alt="postgresql" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/python/python-original.svg" title="Python" alt="python" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/sqlalchemy/sqlalchemy-original.svg" title="SQLA" alt="sqla" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/git/git-original-wordmark.svg" title="Git" **alt="Git" width="40" height="40"/>
</p>
</div>

---
# Splash Page

![query home](https://github.com/TheSicilian12/Query/assets/111261195/a720b4a1-ce20-4e99-b46c-057a7d2f9549)

# Home Page

![Screenshot 2023-06-02 130134](https://github.com/TheSicilian12/Query/assets/111261195/62ec074c-8533-4f64-80f3-b60996f0e55c)

# Single Question

![query question](https://github.com/TheSicilian12/Query/assets/111261195/639f9c29-ac5b-4a6d-bda3-8f55b6e2327e)

# Spaces

![image](https://github.com/TheSicilian12/Query/assets/111261195/a72b6bc1-e8b6-48d7-b912-d8c152c784f6)

---

# Getting Started

To get started with Query, you will need to have Python 3.9.4 and Node.js installed on your machine. Once you have these installed, follow the steps below:

1. Clone the repository:
    ```bash
    git clone https://github.com/TheSicilian12/Query
    ```

2. Install dependencies

    ```bash
    pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your development environment

4. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

5. Once the Flask server is running, navigating to the client directory

6. Install the dependencies: `npm install`

7. Start the frontend: `npm start`

8. The frontend will be accessible at http://localhost:3000/

---

# Navigating Query

Query is currently in development and does not have is does not include all the functionality the contributors intend to add. The functions that query currently have are:

1. `LogIn` using any of the included demo user accounts

2. `SignUp` from the landing page and create your own account

3. Create a `question` that you would like to post to Query's main page for other users to `answer`

4. Navigate to any `questions` posted to Query and see that question's included `answers` and any `comments`

5. Create an `answer` for any question that was not posted by the user

6. Delete any `answer` posted by the logged in user

7. Edit any `answer` posted by the logged in user

8. Comment on any answer to a question

9. Delete any `comment` posted by the logged in user

10. Edit any `comment` posted by the logged in user

11. Create a `Space` to organize `questions` about a particular topic

12. Add a `question` to a `Space`

13. Delete a `Space` but not all the `questions` that are part of that space

14. Navigate to a the user's profile to see a list of all `questions` created by the user

15. Edit any `questions` created by the user

16. Delete any `question` along with all the associated `answers` and `comments`

### API Endpoints
| HTTP Verbs | Endpoints | Action | Return Value |
| --- | --- | --- | --- |
| POST | /api/user/signup | To sign up a new user account |  { id: #, username: '...', email: '...', password: '...' } as JSON |
| POST | /api/user/login | To login an existing user account |  { id: #, username: '...', email: '...', password: '...' } as JSON |
| POST | /api/questions/new | To create a new question | { question: { createdAt: "...", details: "...", id: #, spaceId: #, updatedAt: "...", userId: # } } as JSON |
| POST | /api/answers/new | To create a new answer | { answers: [ { createdAt: "...", details: "...", id: #, ownerId: #, questionId: #, updatedAt: "..."}, {} ] } as JSON |
| POST | /api/replies/new | To create a new reply | { reply: [ { answerId: #, createdAt: "...", details: "...", id: #, ownerId: #, updatedAt: "..." }, {} ] } as JSON |
| POST | /api/spaces/new | To create a new space | { space: { createdAt: "...", description: "...", id: #, imageUrl: "...", name: "...", ownerId: #, updatedAt: "..." } } as JSON |
| GET | /api/questions/:id | To retrieve one question, its answers, and replies | { question: { answers: [ { createdAt: "...", details: "...", id: #, ownerId: #, questionId: #, replies: [ { answerId: #, createdAt: "...", details: "...", id: #, ownerId: #, updatedAt: "..." }, {}], {} } ], createdAt: "...", details: "...", id: #, spaceId: #, updatedAt: "...", userId: # } } as JSON |
| GET | /api/questions | To retrieve all questions | { questions: [ { createdAt: "...", details: "...", id: #, spaceId: #, updatedAt: "...", userId: # }, {} ] } as JSON |
| GET | /api/answers| To retrieve all answers | { answers: [ { createdAt: "...", details: "...", id: #, ownerId: #, questionId: #, updatedAt: "..."}, {} ] } as JSON |
| GET | /api/answers/:userId | To retrieve all answers by userId | { answers: [ { createdAt: "...", details: "...", id: #, ownerId: #, questionId: #, updatedAt: "..."}, {} ] } as JSON |
| GET | /api/replies/:answerId | To retrieve all replies on a single answer | { reply: [ { answerId: #, createdAt: "...", details: "...", id: #, ownerId: #, updatedAt: "..."}, { answerId: #, createdAt: "...", details: "...", id: #, ownerId: #, updatedAt: "..." } ] } as JSON |
| GET | /api/spaces | To retrieve all spaces | { spaces: [ { createdAt: "...", description: "...", id: #, imageUrl: "...", name: "...", ownerId: #, questions: [ { createdAt: "...", details: "...", id: #, spaceId: #, updatedAt: "...", userId: #, }, {} ], updatedAt: "..." }], [], } as JSON |
| GET | /api/spaces/:id | To retrieve one space by id | { space: { createdAt: "...", description: "...", id: #, imageUrl: "...", name: "...", ownerId: #, questions: [ { createdAt: "...", details: "...", id: #, spaceId: #, updatedAt: "...", userId: # }, { createdAt: "...", details: "...", id: #, spaceId: #, updatedAt: "...", userId: # } ], updatedAt: "..." } } as JSON |
| PUT | /api/questions/:id | To edit the details of a single question | { question: { answers: [ { createdAt: "...", details: "...", id: #, ownerId: #, questionId: #, replies: [ { answerId: #, createdAt: "...", details: "...", id: #, ownerId: #, updatedAt: "..." }, {}], {} } ], createdAt: "...", details: "...", id: #, spaceId: #, updatedAt: "...", userId: # } } as JSON |
| PUT | /api/answers/:id | To edit the details of a single answer | { answers: [ { createdAt: "...", details: "...", id: #, ownerId: #, questionId: #, replies: [ { answerId: #, createdAt: "...", details: "...", id: #, ownerId: #, updatedAt: "..." }, {}], } as JSON |
| DELETE | /api/questions/:id | To delete a single question | None |
| DELETE | /api/answers/:id | To delete a single answer | None |
| DELETE | /api/replies/:id | To delete a single reply | None |
| DELETE | /api/spaces/:id | To delete a single space | None |


# Contributors

The following individuals are responsible for the creation of this application:


## William Christensen

GitHub: https://github.com/willmchristensen

LinkedIn: https://www.linkedin.com/in/will-christensen-85531317a/

## Michael Guidera

GitHub: https://github.com/TheSicilian12

LinkedIn: https://www.linkedin.com/in/guidera-michael/

## Alexander Lugibihl

GitHub: https://github.com/Alugibihl

LinkedIn: https://www.linkedin.com/in/alexander-lugibihl/

## Cory Stever

GitHub: https://github.com/cstever0

LinkedIn: https://www.linkedin.com/in/cory-stever-aa2730126/
