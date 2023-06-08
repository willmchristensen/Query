from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def user_length(form, field):
    # Checking if username is proper length
    username = field.data
    if len(username) < 3 or len(username) > 25:
        raise ValidationError('Please enter a Username between 3 characters and 25 characters')

def password_length(form, field):
    # Checking the length of the password
    password = field.data
    if len(password) < 5 or len(password) > 50:
        raise ValidationError('Please enter a password of no less than 5 characters and no more than 50 characters')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists, user_length])
    email = StringField('email', validators=[DataRequired(), Email(), user_exists])
    password = StringField('password', validators=[DataRequired(), password_length])
