from flask_wtf import FlaskForm
from wtforms import StringField,IntegerField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import Space


class SpaceForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    description= StringField('name', validators=[DataRequired()])
    image_url= StringField('image_url', validators=[DataRequired()])
    owner_id = IntegerField('owner_id', validators=[DataRequired()])