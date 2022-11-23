from flask_wtf import FlaskForm
from flask import request
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, ValidationError


class CardForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(
        message='Please enter a name for this card')])
    description = IntegerField('description')
    userId = IntegerField('userId', validators=[DataRequired()])
    listId = IntegerField('listId', validators=[DataRequired()])
