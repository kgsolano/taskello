from flask import Blueprint, request
from flask_login import login_required
from app.models import Card, db, User
from app.forms import CardForm
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

    form = Form()
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
