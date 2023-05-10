from flask import Blueprint, render_template, redirect, request
from app.models import Question, Answer, db, User
from flask_login import login_required, current_user
from app.forms import AnswerForm


answer_routes = Blueprint("answers", __name__)

# ALL ANSWERS BY USER ID
# Includes replies
@answer_routes.route('/<int:user_id>')
@login_required
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

# All answers route
@answer_routes.route('')
def get_all_answers():
    """
    Query for all answers and returns them in a list of dictionaries
    """
    all_answers = Answer.query.all()
    response = [answer.to_dict() for answer in all_answers]
    # print('get_all_questions response: ', response)
    return {'answers': response}


# ADD AN ANSWER TO A QUESTION BY ID
@answer_routes.route('/new', methods=["POST"])
@login_required
def create_an_answer():
    """
    Create an answer by question id
    """
    # print('-----------------------------------------------------------------')
    # print('current_suer: ', current_user)
    # print('current_suer: ', current_user.id)

    form = AnswerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print("this is form!!!", form.data)
    print("gotten data", request.get_json())
    if form.validate_on_submit():
        data = form.data
        print("this is data", data)
        new_answer = Answer(
            details = data['details'],
            owner_id = data['owner_id'],
            question_id = data['question_id']
        )
        # ------------------------------

        # Current user must NOT be Question owner.
        if current_user.id != new_answer.question_id:
            db.session.add(new_answer)
            db.session.commit()
            return {
                "answer": new_answer.to_dict()
            }
        else {
            "errors": "You cannot answer your own question"
        }
        # ------------------------------------------

    return {
        "errors": form.errors
    }

# Delete an answer by id
@answer_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_one_answer(id):
    """This is the delete an answer route"""
    answer = Answer.query.get(id)
    db.session.delete(answer)
    db.session.commit()
    return "Answer Deleted"

# Edit an answer by id
@answer_routes.route("/<int:id>", methods=["PUT"])
@login_required
def edit_one_answer(id):
    """
    Edit an Answer
    """
    answer = Answer.query.get(id)
    form = AnswerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # answer.details = form.details.data
        answer.details = form.data["details"]
        # details = request.get_json()["details"]
        # answer.details = details
        db.session.commit()
        print('answer', answer, answer.to_dict())
        return answer.to_dict()
    else:
        print(form.errors)
        return {"errors": form.errors}
