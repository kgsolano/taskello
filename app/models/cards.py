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
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    listId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('lists.id')), nullable=False)
    createdAt = db.Column(db.DateTime, default=datetime.datetime.now)
    updatedAt = db.Column(db.DateTime, default=datetime.datetime.now, onupdate=datetime.datetime.now)
    
    user = db.relationship('User',
                            back_populates='cards')
    
    list = db.relationship('List',
                            back_populates='cards')
    
    actvity = db.relationship('Activity',
                              back_populates='cards', lazy=False, cascade="all, delete")
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'userId': self.userId,
            'listId': self.listId,
            'createdAt': json.dumps(self.createdAt, default=str),
            'updatedAt': json.dumps(self.createdAt, default=str),
            'activities': [activity.to_dict() for activity in self.activities]
        }