from app.models import db, Activity, environment, SCHEMA

def seed_activities():
    activity1 = Activity(comment='I bought 2 gallons of milk', userId=1, cardId=1)
    activity2 = Activity(comment='I walked the dog one mile', userId=1, cardId=2)
    activity3 = Activity(comment='Appointment was cancelled, rescheduled to tomorrow @ 3pm', userId=1, cardId=3)
    
    db.session.add_all([activity1, activity2, activity3])
    db.session.commit()
    
def undo_activities():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.activities RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM activities")

    db.session.commit()