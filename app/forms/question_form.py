from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import Question


class QuestionForm(FlaskForm):
    details = StringField(
        'details', validators=[DataRequired(),Length(min=10, message="Question must be at least 10 characters.")])