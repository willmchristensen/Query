from flask_wtf import FlaskForm
from wtforms import StringField,IntegerField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import Answer

class AnswerForm(FlaskForm):
    owner_id = IntegerField(
        'owner_id', validators=[DataRequired()]
    )
    question_id = IntegerField(
        'question_id', validators=[DataRequired()]
    )
    details = StringField(
        'details', validators=[DataRequired(),Length(min=2, message="Answer must be at least 2 characters.")]
    )
