from .db import db, environment, SCHEMA, add_prefix_for_prod

class List(db.Model):
    __tablename__ = 'lists'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    boardId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('boards.id')), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    
    user = db.relationship('User',
                            back_populates='list')
    
    board = db.relationship('Board',
                            back_populates='list')
    
    cards = db.relationship('Card',
                            back_populates='lists')
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'boardId': self.boardId,
            'userId': self.userId
        }