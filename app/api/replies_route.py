from flask import Blueprint, render_template, redirect, request
from app.models import Question, Answer, db, User
from flask_login import login_required

answer_routes = Blueprint("replies", __name__)


