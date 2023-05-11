from flask import Blueprint, request
from app.models import Question, Answer, Reply, db, User
from flask_login import login_required, current_user
from app.forms import ReplyForm

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

# Post a new reply
@reply_routes.route("/new", methods=["POST"])
@login_required
def create_a_reply():
    """Create a Reply for an ANSWER"""
    form = ReplyForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print("this is reply form!!!", form.data)
    print("gotten data", request.get_json())
    if form.validate_on_submit():
        data = form.data
        print("this is data", data)
        new_reply = Reply(
            details = data['details'],
            owner_id = data['owner_id'],
            answer_id = data['answer_id']
        )
        # ------------------------------
        db.session.add(new_reply)
        db.session.commit()
        return {
            "reply": new_reply.to_dict()
        }
        # ------------------------------------------

    return {
        "errors": form.errors
    }

# Delete a reply
# Delete a reply by id
@reply_routes.route('/<int:reply_id>', methods=["DELETE"])
@login_required
def delete_one_reply(reply_id):
    """This is the delete a reply route"""
    reply = Reply.query.get(reply_id)

    # Current user must be the owner of the reply to delete the reply
    if current_user.id == reply.owner_id:
        db.session.delete(reply)
        db.session.commit()
        return "Route Deleted"
    else:
        return {"errors": "You must be the onwer of the reply to delete the reply."}
