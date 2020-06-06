import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createUser } from '../../store/actions/userActions';
import { Redirect } from 'react-router-dom';
import { checkIfUserExists } from './lib/helperFunctions';
import { nameValidation, phoneValidation, emailValidation } from '../../util/formValidators';

export class CreateUser extends Component {
    state = {
        name: '',
        phone: '',
        email: '',
        error: '',
        formErrors : {
            name: null,
            phone: null,
            email: null
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = this.validateForm();
        console.log(isValid)
        if(isValid){
            const userObject = await checkIfUserExists(this.state);
            if(userObject !== "User does not exist") return this.setState({error: 'User already Exists'});
            this.props.createUser(this.state);
            this.props.history.push('/user');
        }
    }
    validateForm = () => {
        const formErrors = {
            name: nameValidation(this.state.name),
            phone: phoneValidation(this.state.phone),
            email: emailValidation(this.state.email)
        }
        
        this.setState({formErrors})
        
        console.log(formErrors);
        console.log(Object.values(formErrors).filter(value=>value !== null ).length);
        
        if(Object.values(formErrors).filter(value=>value !== null ).length === 0) return true;
        
        return false;    
    }
    render() {
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white" noValidate>
                    <h5 className="greay=text text-darken-3">Create new User</h5>
                    <div className="input-field">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" onChange={this.handleChange}/>
                        {this.state.formErrors.name ? <p className="red-text text-darken-2">{this.state.formErrors.name}</p> : null}

                    </div>
                    <div className="input-field">
                        <label htmlFor="phone">Phone number</label>
                        <input type="number" id="phone" onChange={this.handleChange} />
                        {this.state.formErrors.phone ? <p className="red-text text-darken-2">{this.state.formErrors.phone}</p> : null}
                    </div>
                    <div className="input-field">
                        <label htmlFor="email">E-mail</label>
                        <input type="email" id="email" onChange={this.handleChange} />
                        {this.state.formErrors.email ? <p className="red-text text-darken-2">{this.state.formErrors.email}</p> : null}
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

