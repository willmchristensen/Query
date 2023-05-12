from flask_wtf import FlaskForm
from wtforms import StringField,IntegerField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import Question


class QuestionForm(FlaskForm):
    details = StringField('details', validators=[DataRequired(),Length(min=10, message="Question must be at least 10 characters.")])
    user_id = IntegerField('user_id', validators=[DataRequired()])
    space_id = IntegerField("space_id", default=None)