from flask import Blueprint, render_template, redirect, request
from app.models import Question, Answer, Reply, db, User
from flask_login import login_required

reply_routes = Blueprint("replies", __name__)

# Get all replies by answer id
@reply_routes.route('/<int:answer_id>')
def get_reply_routes(answer_id):
    """
    Query for all replies by answer id and returns them in a list of dictionaries
    """
    all_replies = Reply.query.filter(Reply.answer_id == answer_id).all()
    response = [reply.to_dict() for reply in all_replies]
    return {"reply": response}

# Get all replies by user id
# @reply_routes.route('/user/<int:user_id>')
# def get_reply_routes(user_id):
#     """
#     Query for all replies by user id and returns them in a list of dictionaries
#     """
#     all_replies = Reply.query.filter(Reply.owner_id == user_id).all()
#     response = [reply.to_dict() for reply in all_replies]
#     return {"reply": response}
