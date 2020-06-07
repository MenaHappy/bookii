import React, { Component } from 'react'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import moment from 'moment';
import { bookEvent } from '../../store/actions/eventActions';
import { checkIfUserExists } from '../users/lib/helperFunctions';
import { isEventFinished } from '../../util/formValidators';

export class BookEvent extends Component {
    state = {
        name: '',
        phone: '',
        email: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    initBooking = async (e) =>{
        e.preventDefault();
        const userObject = await checkIfUserExists(this.state);
        const userId = userObject[0].docs[0].id;
        const userData = userObject[0].docs[0].data();
        this.props.bookEvent(this.props.match.params.id, { id: userId, ...userData });
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
                            { 
                            isEventFinished(event.date.toDate()) ?
                                <p className="red-text text-darken-2">Event Finished</p> 
                                : <form onSubmit={this.initBooking} className="white">
                                    <h5 className="greay=text text-darken-3">Enter Details</h5>
                                    <div className="input-field">
                                        <label htmlFor="name">Name</label>
                                        <input type="text" id="name" onChange={this.handleChange} required />
                                    </div>
                                    <div className="input-field">
                                        <label htmlFor="phone">Phone number</label>
                                        <input type="text" id="phone" onChange={this.handleChange} required />
                                    </div>
                                    <div className="input-field">
                                        <label htmlFor="email">E-mail</label>
                                        <input type="text" id="email" onChange={this.handleChange} required />
                                    </div>
                                    <div className="input-field">
                                        <button className="btn red darken-4">Book</button>
                                    </div>

                                </form>
                            }
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
        auth: state.firebase.auth,
        currentUserData : state.currentUserData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        bookEvent: (event_id, userId) => dispatch(bookEvent(event_id, userId))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'events' }
    ])
)(BookEvent);
