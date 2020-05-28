import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createUser } from '../../store/actions/userActions';
import { Redirect } from 'react-router-dom';

export class CreateUser extends Component {
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
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.createUser(this.state);
        this.props.history.push('/');
    }
    onChange = date => this.setState({ date })
    render() {
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="greay=text text-darken-3">Create new User</h5>
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
        createUser: (event) => dispatch(createUser(event))
    }
}

export default connect(mapStateToProps, madDispatchToProps)(CreateUser)

