from flask_wtf import FlaskForm
from flask import request
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, ValidationError, Length


class CardForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(
        message='Please enter a name for this card'), Length(min=1, max=50)])
    description = StringField('description')
    userId = IntegerField('userId', validators=[DataRequired()])
    listId = IntegerField('listId', validators=[DataRequired()])
