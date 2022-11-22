from flask import Blueprint
from flask_login import login_required
from app.models import Board, db, User
from .auth_routes import validation_errors_to_error_messages

board_routes = Blueprint('boards', __name__)

@board_routes.route('')
@login_required
def board_root():
    """ 
    Query for all boards and returns them in a list of board dictionaries 
    """
    boards = Board.query.all()
    return {'boards': [board.to_dict() for board in boards]}