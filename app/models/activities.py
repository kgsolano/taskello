from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime
import json

class Activity(db.Model):
    __tablename__ = 'activities'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    cardId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('cards.id')), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    comment = db.Column(db.String(500))
    createdAt = db.Column(db.DateTime, default=datetime.datetime.now)
    
    user = db.relationship('User',
                           back_populates='activities')
    
    card = db.relationship('Card',
                           back_populates='activities')
    
    def to_dict(self):
        return {
            'id': self.id,
            'cardId': self.cardId,
            'userId': self.userId,
            'comment': self.comment,
            'createdAt': json.dumps(self.createdAt, default=str),
        }