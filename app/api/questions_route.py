from flask import Blueprint, render_template, redirect, request
from app.models import Question, Answer, Reply, db, User
from flask_login import login_required, current_user
from app.forms import QuestionForm
from datetime import datetime

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

# Get a question by id
@question_routes.route('/<int:id>')
def get_one_question(id):
    """
    Query for question by id
    """
    question = Question.query.get(id)
    answers = Answer.query.filter(Answer.question_id == id).all()
    response = question.to_dict()

    # Get all replies by answer id
    # for answer in answers:
    #     replies = Reply.query.filter(Reply.answer_id == answer.id).all()
        # answers["replies"] = [reply for reply in replies]

    response["answers"] = [answer.to_dict() for answer in answers]

    for answer in response["answers"]:
        replies = Reply.query.filter(Reply.answer_id == answer["id"]).all()
        answer_replies = [reply.to_dict() for reply in replies]
        # print("-------------------------------------------------")
        # print("replies: ", answer_replies)
        answer["replies"] = answer_replies

    # print("question", response)
    return {'question': response}


@question_routes.route('/new', methods=["POST"])
@login_required
def create_one_question():
    """
    Create a question
    """
    # ------------------------------------------------------------
    # data = request.get_json();
    form = QuestionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # print(data)
    # print('form.data in create route',form.data)
    if form.validate_on_submit():
        # print('WE MADE IT')
        data = form.data
        # print('data',data)
        new_question = Question(
            details = data['details'],
            user_id = data['user_id'],
            space_id = data['space_id']
        )
        # print('NEW QUESTION', new_question.to_dict())
        # ------------------------------
        db.session.add(new_question)
        db.session.commit()
        return {
            "question": new_question.to_dict()
        }

    return {
        "errors": form.errors
    }
    # ------------------------------------------

# Delete a question
@question_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_one_question(id):
    """This is the delete a question route"""
    question = Question.query.get(id)

    # Current user id must == question owner id to delete
    if current_user.id == question.user_id:
        db.session.delete(question)
        db.session.commit()
        return "Question Deleted"
    else:
        return {"errors": "You must be the owner of a question to delete that question."}

# Edit a question
@question_routes.route("/<int:id>", methods=["GET","PUT"])
@login_required
def edit_one_question(id):
    """
    Edit a question
    """
    form = QuestionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print('---------------',id)
    print(form.data,form,form.validate_on_submit)
    if form.validate_on_submit():
        data = form.data

        question = Question.query.get(id)

        # Can only edit a question if the current user id == question user id
        if current_user.id == question.user_id:
            question.details = data['details']
            question.user_id = request.json.get('user_id')
            db.session.commit()
            return {
                "question": question.to_dict()
            }
        else:
            return {"errors": "You must be the owner of a question to edit that question."}

    return {
        "errors": form.errors
    }
