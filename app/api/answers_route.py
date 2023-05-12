from flask import Blueprint, request
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
        question = Question.query.get(new_answer.question_id)
        print("question output:", question)
        # Current user must NOT be Question owner.
        if question.user_id != current_user.id:
            db.session.add(new_answer)
            db.session.commit()
            return {
                "answer": new_answer.to_dict()
            }
        else:
            return {
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

    # Can only be deleted if current user id == answer owner id
    # print('----------------------------------', answer.owner_id)
    if current_user.id == answer.owner_id:
        db.session.delete(answer)
        db.session.commit()
        return "Answer Deleted"
    else:
        return {"errors": "You must be the owner of an answer to delete that answer."}

# Edit an answer by id
@answer_routes.route("/<int:id>", methods=["PUT"])
@login_required
def edit_one_answer(id):
    """
    Edit an Answer
    """
    answer = Answer.query.get(id)

    # Can only be edited if the current user id == answer owner id
    if current_user.id != answer.owner_id:
        return {"errors": "You must be the owner of an answer to edit that answer."}

    form = AnswerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        answer.details = form.data["details"]
        db.session.commit()
        print('answer', answer, answer.to_dict())
        return answer.to_dict()
    else:
        print(form.errors)
        return {"errors": form.errors}
