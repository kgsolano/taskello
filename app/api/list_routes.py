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

# @list_routes.route('/<int:listId>/reorder', methods=['PUT'])
# @login_required
# def reorder_list(listId):
#     """"
#     Reorder a list
#     """
    
#     curr_list = List.query.get_or_404(listId)
#     # print("!!!!!!!!~~~~~~~~~!!!!!!!", curr_list.cards)
#     data = request.get_json()
#     print("!!!!!!!@@@@@@@@@@@@@@@@@!!!!!!!!", data['card_order'])
    
#     curr_list.card_order = ",".join([(str(x)) for x in data['card_order']])
#     print("~~~~~~~~~~~~~", curr_list.card_order)
    
#     db.session.commit()
#     print("@@@@@@@@@@@ list.to_dict()", {'list': curr_list.to_dict()})
#     return {'list': curr_list.to_dict()} # this could be problem

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
            name=data['name'], description=data['description'], listId=data['listId'], userId=data['userId'])
        db.session.add(new_card)
        db.session.commit()
        return {'card': new_card.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401




   # new_card_order = Card.query.get_or_404(data['cards'][0]['id'])
    # print("~~~~~~~~~~~~~~", new_card)

    # new_cards = []
    # for i in range(len(curr_list.cards)):
    #     new_card = Card.query.get_or_404(data['cards'][i]['id'])
    #     new_cards.append(new_card)
    # curr_list.cards = new_cards
    # # list.cards = data['cards']
    # print("############## list.cards", curr_list.cards)
