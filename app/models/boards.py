from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import current_user

class Board(db.Model):
    __tablename__ = 'boards'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    boardName = db.Column(db.String(255), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    
    user = db.relationship('User',
                            back_populates='board')
    
    lists = db.relationship('List',
                            back_populates='boards')
    
    def to_dict(self):
        return {
            'id': self.id,
            'boardName': self.boardName,
            'userId': self.userId
        }