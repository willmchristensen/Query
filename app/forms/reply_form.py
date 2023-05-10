from flask_wtf import FlaskForm
from wtforms import StringField,IntegerField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import Reply

class ReplyForm(FlaskForm):
    owner_id = IntegerField(
        'owner_id', validators=[DataRequired()]
    )
    answer_id = IntegerField(
        'answer_id', validators=[DataRequired()]
    )
    details = StringField(
        'details', validators=[DataRequired(),Length(min=2, message="Reply must be at least 2 characters.")]
    )
