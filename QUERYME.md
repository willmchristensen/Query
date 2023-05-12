# Query

Welcome to Query, a web application that allows you to create, manage, and edit questions. You are able also able to organize questions into a particular topic you may be interested in. This README will provide you with the necessary information to get started with Query.

# Technologies Used
  - Query uses a Flask/SQLAlchemy backend
  - React/Redux frontend

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


# Contributors

The following individuals are responsible for the creation of this application:

## Cory Stever

GitHub: https://github.com/cstever0

## William Christensen

GitHub: https://github.com/willmchristensen

## Alex Lugibihl

GitHub: https://github.com/Alugibihl

## Michael Guidera

GitHub: https://github.com/TheSicilian12
