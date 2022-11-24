from flask import Blueprint, request 
from flask_login import login_required
from app.models import Board, List, db, User
from app.forms import BoardForm, ListForm
from .auth_routes import validation_errors_to_error_messages

board_routes = Blueprint('boards', __name__)

########### Board Routes ############
@board_routes.route('')
@login_required
def board_root():
    """ 
    Query for all boards and returns them in a list of board dictionaries 
    """
    boards = Board.query.all()
    return {'boards': [board.to_dict() for board in boards]}

@board_routes.route('/<int:boardId>')
@login_required
def get_board(boardId):
    """ 
    Query for a single board 
    """
    single_board = Board.query.get(boardId)
    return {'board': single_board.to_dict()}

@board_routes.route('', methods=['POST'])
@login_required
def create_board():
    """ 
    Creates a new board
    """
    form = BoardForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data=form.data 
        new_board = Board(boardName = data['boardName'],
                        userId = data['userId'])
        db.session.add(new_board)
        db.session.commit()
        return {'board': new_board.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@board_routes.route('/<int:boardId>', methods=['PUT'])
def update_board(boardId):
    """ 
    Update a board
    """
    board = Board.query.get_or_404(boardId)
    
    form = BoardForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    
    if form.validate_on_submit():
        data = form.data 
        board.boardName = data['boardName']
        
        db.session.commit()
        return {'board': board.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@board_routes.route('<int:boardId>', methods=['DELETE'])
@login_required
def delete_board(boardId):
    """ 
    Delete a board
    """
    board = Board.query.get_or_404(boardId)
    
    if board:
        db.session.delete(board)
        db.session.commit()
        return {"message": "Board was successfully deleted"}
    return {"error": "Board does not exist"}, 404


####### List Routes ######

@board_routes.route('/<int:boardId/lists')
@login_required
def list_root(boardId):
    """ 
    Query for all lists in a board
    """
    lists = List.query.filter(List.boardId == boardId).all()
    return {'lists': [list.to_dict() for list in lists]}

@board_routes.route('/<int:boardId>/lists', methods=['POST'])
@login_required
def create_list(boardId):
    """ 
    Create a list on the current board
    """
    form = ListForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    
    if form.validate_on_submit():
        data = form.data 
        new_list = List(title=data['title'], boardId=data['boardId'], userId=data['userId'])
        db.session.add(new_list)
        db.session.commit()
        return {'list': new_list.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
