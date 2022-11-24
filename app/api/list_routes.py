from flask import Blueprint, request
from flask_login import login_required
from app.models import List, db, User
from app.forms import ListForm
from .auth_routes import validation_errors_to_error_messages

list_routes = Blueprint('lists', __name__)


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