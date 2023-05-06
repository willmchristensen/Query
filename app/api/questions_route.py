from flask import Blueprint, render_template, redirect
from app.models import Question, Answer, db
from flask_login import login_required,current_user
from app.forms import QuestionForm

question_routes = Blueprint("questions", __name__)

# ALL QUESTIONS
@question_routes.route('')
def get_all_questions():
    """
    Query for all questions and returns them in a list of dictionaries
    """
    all_questions = Question.query.all()
    response = [question.to_dict() for question in all_questions]
    # print('get_all_questions response: ', response)
    return {'questions': response}


@question_routes.route('/<int:id>')
def get_one_question(id):
    """
    Query for question by id
    """
    question = Question.query.get(id)
    answers = Answer.query.filter(Answer.question_id == id).all()
    response = question.to_dict()
    response["answers"] = [answer.to_dict() for answer in answers]
    print("question", response)
    return {'question': response}

@question_routes.route('/new')
@login_required
def create_one_question():
    """
    Create a question     
    """
    form = QuestionForm()

    if form.validate_on_submit():
        data = form.data
        new_question = Question(
            details = data['details'],
            user_id = current_user.id,
        )
    
        db.session.add(new_question)
        db.session.commit()
        return {
            "question": new_question
        }

    return {
        "errors": form.errors
    }