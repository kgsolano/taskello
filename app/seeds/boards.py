from app.models import db, Board, environment, SCHEMA

def seed_boards():
    errands_board1 = Board(boardName='Errands', userId=1)
    kanban_board1 = Board(boardName='Kanban Board', userId=1)
    productivity_board1 = Board(boardName='Productivity', userId=1)
    pm_board1 = Board(boardName='Project Management', userId=1)
    
    errands_board2 = Board(boardName='Errands', userId=2)
    kanban_board2 = Board(boardName='Kanban Board', userId=2)
    productivity_board2 = Board(boardName='Productivity', userId=2)
    pm_board2 = Board(boardName='Project Management', userId=2)
    
    errands_board3 = Board(boardName='Errands', userId=3)
    kanban_board3 = Board(boardName='Kanban Board', userId=3)
    productivity_board3 = Board(boardName='Productivity', userId=3)
    pm_board3 = Board(boardName='Project Management', userId=3)
    
    db.session.add_all([errands_board1, errands_board2, errands_board3, kanban_board1, kanban_board2, kanban_board3,
                        productivity_board1, productivity_board2, productivity_board3, pm_board1, pm_board2, pm_board3])
    db.session.commit()
    
def undo_boards():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.boards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM boards")

    db.session.commit()
