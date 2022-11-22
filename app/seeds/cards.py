from app.models import db, Card, environment, SCHEMA

def seed_cards():
    # for list 1 - todo list
    item1 = Card(name='Buy milk', description='Go to store to buy milk', userId=1, listId=1)
    item2 = Card(name='Walk dog', description='Walk at least 1 mile', userId=1, listId=1)
    item3 = Card(name='Get a haircut', description='Appointment at 1pm with Kim', userId=1, listId=1)
    
    # for list 2 - todo list
    item4 = Card(name='Buy milk', description='Go to store to buy milk', userId=1, listId=1)
    item5 = Card(name='Walk dog', description='Walk at least 1 mile', userId=1, listId=1)
    item6 = Card(name='Get a haircut', description='Appointment at 1pm with Kim', userId=1, listId=1)
    
    db.session.add_all([item1, item2, item3, item4, item5, item6])
    db.session.commit()
    
def undo_cards():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.lists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM lists")

    db.session.commit()
