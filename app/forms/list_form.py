from flask_wtf import FlaskForm
from flask import request
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, ValidationError, Length


class ListForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(
        message='Please enter a title for this list'), Length(min=1, max=50)])
    boardId = IntegerField('boardId', validators=[DataRequired()])
    userId = IntegerField('userId', validators=[DataRequired()])
