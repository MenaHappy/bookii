import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createUser } from '../../store/actions/userActions';
import { Redirect } from 'react-router-dom';
import { checkIfUserExists } from './lib/helperFunctions';


export class CreateUser extends Component {
    state = {
        name: '',
        phone: '',
        email: '',
        error: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        const userObject = await checkIfUserExists(this.state);
        if(userObject !== "User does not exist") return this.setState({error: 'User already Exists'});
        this.props.createUser(this.state);
        this.props.history.push('/user');
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
                    <div>{this.state.error ? <p className="red-text text-darken-2">{this.state.error}</p> : null}</div>
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
        createUser: (user) => dispatch(createUser(user))
    }
}

export default connect(mapStateToProps, madDispatchToProps)(CreateUser)

