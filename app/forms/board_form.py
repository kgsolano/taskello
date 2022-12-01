from flask_wtf import FlaskForm
from flask import request
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import Board

class BoardForm(FlaskForm):
    boardName = StringField('board name', validators=[DataRequired(message='Please enter a name for the board'), Length(min=1, max=50)])
    userId = IntegerField('userId', validators=[DataRequired()])