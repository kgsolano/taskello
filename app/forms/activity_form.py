from flask_wtf import FlaskForm
from flask import request
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, ValidationError, Length


class ActivityForm(FlaskForm):
    comment = StringField('comment', validators=[DataRequired(message='Please enter a comment for this activity'), Length(min=1, max=500)])
    userId = IntegerField('userId', validators=[DataRequired()])
    cardId = IntegerField('cardId', validators=[DataRequired()])