import React from 'react';
import moment from 'moment';
import { isEventFinished } from '../../util/formValidators';


const EventSummary = ({event}) => {
    return (
        <div className="card project-summary">
            <div className="card-content grey-text text-darken-3">
                <span className="card-title">{event.title}</span>
                <p><strong>Available Seats: </strong>{event.attendees - event.booked.length}</p>
                <p>Posted by {event.authorFirstName} {event.authorLastName}</p>
                <p className="grey-text">{moment(event.date.toDate()).format("MMMM Do YYYY, h:mm:ss a")}</p>
                { isEventFinished(event.date.toDate()) ? <p className="red-text text-darken-2">Event Finished</p> : null}
            </div>
        </div>
    )
}

export default EventSummary;