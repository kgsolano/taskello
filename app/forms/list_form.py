from flask_wtf import FlaskForm
from flask import request
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, ValidationError


class ListForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(message='Please enter a title for this list')])
    boardId = IntegerField('boardId', validators=[DataRequired()])
    userId = IntegerField('userId', validators=[DataRequired])
