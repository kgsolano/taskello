from flask import Blueprint, request
from flask_login import login_required
from app.models import Card, db, User, Activity
from app.forms import CardForm, ActivityForm
from .auth_routes import validation_errors_to_error_messages

card_routes = Blueprint('cards', __name__)


@card_routes.route('/<int:cardId>')
@login_required
def get_card(cardId):
    """ 
    Query for one card
    """
    card = Card.query.get_or_404(cardId)
    return {'card': card.to_dict()}


@card_routes.route('/<int:cardId>', methods=['PUT'])
@login_required
def update_card(cardId):
    """ 
    Update a card
    """
    card = Card.query.get_or_404(cardId)

    form = CardForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data

        card.name = data['name']
        card.description = data['description']
        db.session.commit()
        return {'card': card.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@card_routes.route('<int:cardId>', methods=['DELETE'])
@login_required
def delete_card(cardId):
    """ 
    Delete a card
    """

    card = Card.query.get_or_404(cardId)

    if card:
        db.session.delete(card)
        db.session.commit()
        return {"message": "card was successfully deleted"}
    return {"error": "card does not exist"}, 404

####### Activity Routes #######

@card_routes.route('/<int:cardId>/activities')
@login_required
def activity_index(cardId):
    """ 
    Query for all activities for a card
    """
    activities = Activity.query.filter(Activity.cardId == cardId).all()
    return {'activities': [activity.to_dict() for activity in activities]}

@card_routes.route('/<int:cardId>/activities', methods=['POST'])
@login_required
def create_activity(cardId):
    """ 
    Create an activity
    """
    form = ActivityForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data

        new_activity = Activity(
            comment=data['comment'],
            userId=data['userId'],
            cardId=cardId
        )
        db.session.add(new_activity)
        db.session.commit()
        return {'activity': new_activity.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401