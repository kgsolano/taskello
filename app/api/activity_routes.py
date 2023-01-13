from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Activity
from app.forms import ActivityForm
from .auth_routes import validation_errors_to_error_messages

activity_routes = Blueprint('activities', __name__)

@activity_routes.route('/<int:activityId>', methods=['PUT'])
@login_required
def update_activity(activityId):
    """ 
    Update an activity
    """
    activity = Activity.query.get_or_404(activityId)

    form = ActivityForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data

        activity.comment = data['comment']
        db.session.commit()
        return {'activity': activity.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@activity_routes.route('/<int:activityId>', methods=['DELETE'])
@login_required
def delete_activity(activityId):
    """ 
    Delete an activity
    """

    activity = Activity.query.get_or_404(activityId)

    if activity:
        db.session.delete(activity)
        db.session.commit()
        return {"message": "activity was successfully deleted"}
    return {"error": "activity does not exist"}, 404