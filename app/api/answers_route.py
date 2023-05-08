from flask import Blueprint, render_template, redirect, request
from app.models import Question, Answer, db, User
from flask_login import login_required
from app.forms import AnswerForm

answer_routes = Blueprint("answers", __name__)

# ALL ANSWERS BY USER ID
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


# ADD AN ANSWER TO A QUESTION BY ID
@answer_routes.route('/new', methods=["POST"])
@login_required
def create_a_question():
    """
    Create an answer by question id
    """
     # ------------------------------------------------------------
    print("------------------------------------------------------------------------------------------------")
    form = AnswerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print("this is form!!!", form.data)
    if form.validate_on_submit():
        data = form.data
        print("this is data", data)
        new_answer = Answer(
            details = data['details'],
            owner_id = data['owner_id'],
            question_id = data['question_id']
        )
        # ------------------------------
        db.session.add(new_answer)
        db.session.commit()
        return {
            "answer": new_answer.to_dict()
        }
        # ------------------------------------------

    return {
        "errors": form.errors
    }
