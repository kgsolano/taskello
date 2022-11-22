from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime
import json

class Card(db.Model):
    __tablename__ = 'cards'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(500))
    createdAt = db.Column(db.Datetime, default=datetime.datetime.now)
    updatedAt = db.Column(db.Datetime, default=datetime.datetime.now, onupdate=datetime.datetime.now)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    listId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('list.id')), nullable=False)
    
    user = db.relationship('User',
                            back_populates='card')
    
    list = db.relationship('List',
                            back_populates='card')
    
    def to_dict(self):
        return {
            'id': self.id,
            'description': self.description,
            'userId': self.userId,
            'listId': self.listId,
            'createdAt': json.dumps(self.createdAt, default=str),
            'updatedAt': json.dumps(self.createdAt, default=str),
        }