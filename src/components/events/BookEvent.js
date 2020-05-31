import React, { Component } from 'react'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import moment from 'moment';
import { bookEvent } from '../../store/actions/eventActions';

export class BookEvent extends Component {
    book = () => {
        console.log(this.props);
        this.props.bookEvent(this.props.match.params.id, this.props.event.booked);
        this.props.history.push('/');
    }
    render() {
        const { event } = this.props;

        if (event) {
            return (
                <div className="container section project-details">
                    <div className="card">
                        <div className="card-content">
                            <span className="card-title">{event.title}</span>
                            <p><strong>Attendees: </strong>{event.attendees}</p>
                            <p><strong>Available Seats: </strong>{event.attendees - event.booked.length}</p>
                            <p><strong>Place: </strong>{event.place}</p>
                            <p><strong>Date: </strong>{moment(event.createdAt.toDate()).calendar()}</p>
                            <p><strong>Description: </strong>{event.description}</p>
                            <br />
                            <div className="card-action actions">
                                <button className="btn red darken-4" onClick={this.book}>Book</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="container center">
                    <p>Loading Event...</p>
                </div>
            )
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const events = state.firestore.data.events;
    const event = events ? events[id] : null;
    return {
        event: event,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        bookEvent: (event_id, state) => dispatch(bookEvent(event_id, state))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'events' }
    ])
)(BookEvent);
