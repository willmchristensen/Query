from flask import Blueprint, render_template, redirect, request
from app.models import Space, db, Question
from flask_login import login_required, current_user
from app.forms import SpaceForm, QuestionForm

space_routes = Blueprint("spaces", __name__)

# ALL QUESTIONS
@space_routes.route('')
def get_all_spaces():
    """
    Query for all spaces and returns them in a list of dictionaries
    """
    all_spaces = Space.query.all()
    response = [space.to_dict() for space in all_spaces]
    return {'spaces': response}

@space_routes.route('/<int:id>')
def get_one_space(id):
    """
    Query for one space by id
    """
    space = Space.query.get(id)
    response = space.to_dict()
    return {"space": response}

@space_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_one_space(id):
    """
    Deletes a single space by id
    """
    space = Space.query.get(id)

    if space.owner_id == current_user.id:
        db.session.delete(space)
        db.session.commit()
        return "Space Deleted"
    else:
        return {"errors": "You must be the owner of a space to delete it."}

@space_routes.route("/new", methods=["POST"])
@login_required
def create_one_space():
    """
    Creates a space
    """
    form = SpaceForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        # print('WE MADE IT')
        data = form.data
        # print('data',data)
        new_space = Space(
            name = data['name'],
            description = data['description'],
            image_url = data['image_url'],
            owner_id = data['owner_id']
        )

        db.session.add(new_space)
        db.session.commit()
        return {
            "space": new_space.to_dict()
        }

    return {
        "errors": form.errors
    }

@space_routes.route("/<int:id>/questions/new", methods=["POST"])
@login_required
def create_space_question():
    """
    Create a question for a space
    """
    form = QuestionForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        print('data!!',data)
        new_question = Question(
            details = data['details'],
            user_id = data['user_id'],
            space_id = data['space_id']
        )

        db.session.add(new_question)
        db.session.commit()
        return{ "question": new_question.to_dict() }
    
    return { "errors": form.errors }