from flask import Blueprint, render_template, redirect, request
from app.models import Question, Answer, db, User
from flask_login import login_required
# from app.forms import QuestionForm

answer_routes = Blueprint("answers", __name__)

# ALL ANSWERS BY USER ID
@login_required
@answer_routes.route('/<int:user_id>')
def get_answer_routes(user_id):
    """
    Query for all answers by user id and returns them in a list of dictionaries
    """
    # all_questions = Question.query.all()
    # response = [question.to_dict() for question in all_questions]
    # # print('get_all_questions response: ', response)
    # return {'questions': response}
    all_answers = Answer.query.filter(Answer.owner_id == user_id).all()
    response = [answer.to_dict() for answer in all_answers]
    return {"answers": response}
