from flask import Blueprint, request
from flask_login import login_required
from app.models import List, db, User, Card
from app.forms import ListForm, CardForm
from .auth_routes import validation_errors_to_error_messages

list_routes = Blueprint('lists', __name__)

####### List Routes #######
@list_routes.route('/<int:listId>')
@login_required
def get_list(listId):
    """ 
    Query for one list 
    """
    list = List.query.get_or_404(listId)
    return {'list': list.to_dict()}

@list_routes.route('/<int:listId>', methods=['PUT'])
@login_required
def update_list(listId):
    """ 
    Update a list
    """
    list = List.query.get_or_404(listId)
    
    form = ListForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        
        list.title = data['title']
        db.session.commit()
        return {'list': list.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@list_routes.route('<int:listId>', methods=['DELETE'])
@login_required
def delete_list(listId):
    """ 
    Delete a list
    """
    
    list = List.query.get_or_404(listId)
    
    if list:
        db.session.delete(list)
        db.session.commit()
        return {"message": "List was successfully deleted"}
    return {"error": "list does not exist"}, 404

####### Card Routes #######

@list_routes.route('/<int:listId>/cards')
@login_required
def card_root(listId):
    """ 
    Query for all cards in a list
    """
    cards = Card.query.filter(Card.listId == listId).all()
    return {'cards': [card.to_dict() for card in cards]}


@list_routes.route('/<int:listId>/cards', methods=['POST'])
@login_required
def create_card(listId):
    """ 
    Create a card on the current list
    """
    form = CardForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        new_card = Card(
            name=data['name'], description=data['description'], listId=data['listId'], userId=data['userId'], createdAt=data['createdAt'], updatedAt=data['updatedAt'])
        db.session.add(new_card)
        db.session.commit()
        return {'card': new_card.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
