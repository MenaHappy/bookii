import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createEvent } from '../../store/actions/eventActions';
import { Redirect } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { nameValidation, positiveNamberValidation, futureDateValidation } from '../../util/formValidators';

export class CreateEvent extends Component {
    state = {
        title: '',
        attendees: '',
        place: '',
        date: new Date(),
        description: '',
        formErrors : {
            title: null,
            attendees: null,
            place: null,
            date: null
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const isValid = this.validateForm();
        if(isValid){
            this.props.createEvent(this.state);
            this.props.history.push('/');
        }
    }
    validateForm = () => {
        const formErrors = {
            title: nameValidation(this.state.title),
            attendees: positiveNamberValidation(this.state.attendees),
            place: nameValidation(this.state.place),
            date: futureDateValidation(this.state.date)
        }
        
        this.setState({formErrors});
        if(Object.values(formErrors).filter(value=>value !== null ).length === 0) return true;
        
        return false;    
    }
    onChange = date => this.setState({ date })
    render() {
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white" noValidate>
                    <h5 className="greay=text text-darken-3">Create new Event</h5>
                    <div className="input-field">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" onChange={this.handleChange}/>
                        {this.state.formErrors.title ? <p className="red-text text-darken-2">{this.state.formErrors.title}</p> : null}
                    </div>
                    <div className="input-field">
                        <label htmlFor="attendees">Max number of Attendees</label>
                        <input type="number" id="attendees" onChange={this.handleChange}/>
                        {this.state.formErrors.attendees ? <p className="red-text text-darken-2">{this.state.formErrors.attendees}</p> : null}
                    </div>
                    <div className="input-field">
                        <label htmlFor="place">Place</label>
                        <input type="text" id="place" onChange={this.handleChange} />
                        {this.state.formErrors.place ? <p className="red-text text-darken-2">{this.state.formErrors.place}</p> : null}
                    </div>
                    <div>
                        <span className='grey-text'>Date & Time</span> &nbsp;
                        <DatePicker
                            selected={this.state.date}
                            onChange={this.onChange}
                            showTimeSelect
                            dateFormat="Pp"
                        />
                        {this.state.formErrors.date ? <p className="red-text text-darken-2">{this.state.formErrors.date}</p> : null}
                    </div>
                    <div className="input-field">
                        <label htmlFor="description">Description</label>
                        <textarea id="description" className="materialize-textarea" onChange={this.handleChange} ></textarea>
                    </div>
                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0">Create</button>
                    </div>

                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

const madDispatchToProps = (dispatch) => {
    return {
        createEvent: (event) => dispatch(createEvent(event))
    }
}

export default connect(mapStateToProps, madDispatchToProps)(CreateEvent)

