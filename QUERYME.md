# Query

Welcome to Query, a web application that allows you to create, manage, and edit questions. You are able also able to organize questions into a particular topic you may be interested in. This README will provide you with the necessary information to get started with Query.

# Technologies Used
Query uses a Flask/SQLAlchemy backend and a React/Redux frontend. Flask is a Python-based web framework that allows for easy creation of web applications. SQLAlchemy is a popular Python library used for working with databases. React is a JavaScript library used for building user interfaces, and Redux is a predictable state container for JavaScript apps.

Getting Started
To get started with Query, you will need to have Python 3.x and Node.js installed on your machine. Once you have these installed, follow the steps below:

Clone the repository: git clone https://github.com/<your-username>/query.git
Navigate to the project directory: cd query
Create a virtual environment: python3 -m venv venv
Activate the virtual environment: source venv/bin/activate
Install the dependencies: pip install -r requirements.txt
Create the database: flask db upgrade
Start the Flask server: flask run
Once the Flask server is running, you can start the frontend by navigating to the client directory and running the following commands:

Install the dependencies: npm install
Start the frontend: npm start
The frontend will be accessible at http://localhost:3000/.

Contributing
If you would like to contribute to Query, please follow the steps below:

Fork the repository.
Create a new branch: git checkout -b my-new-branch
Make your changes and commit them: git commit -am 'Add some feature'
Push to the branch: git push origin my-new-branch
Submit a pull request.
License
Query is released under the MIT License. See LICENSE for details.
