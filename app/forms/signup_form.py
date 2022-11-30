from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length, InputRequired
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


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(message='Please enter a valid username'), InputRequired(), Length(min=1, max=500, message='Please enter a valid length'), username_exists])
    email = StringField('email', validators=[DataRequired(message='Please enter valid email'), Email('Please enter a valid email'), Length(min=1, max=500, message='Please enter a valid length'), user_exists])
    password = StringField('password', validators=[DataRequired('Please enter a password')])