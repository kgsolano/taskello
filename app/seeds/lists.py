from app.models import db, List, environment, SCHEMA

def seed_lists():
    # for each board to have a todo list
    todo1 = List(title='Todos', boardId=1, userId=1)
    todo2= List(title='Todos', boardId=2, userId=1)
    todo3= List(title='Todos', boardId=3, userId=1)
    todo4= List(title='Todos', boardId=4, userId=1)
    
    db.session.add_all([todo1, todo2, todo3, todo4])
    db.session.commit()

def undo_lists():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.lists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM lists")

    db.session.commit()
