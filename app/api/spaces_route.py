from flask import Blueprint, render_template, redirect, request
from app.models import Space, db
from flask_login import login_required

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
    db.session.delete(space)
    db.session.commit()
