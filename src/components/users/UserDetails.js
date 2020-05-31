import React, { Component } from 'react'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { deleteUser } from '../../store/actions/userActions';
import { NavLink } from 'react-router-dom';

export class UserDetails extends Component {
    handleDelete = (e) => {
        this.props.deleteUser(this.props.match.params.id);
        this.props.history.push('/user');
    }
    render() {
        const { user, auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />

        if (user) {
            return (
                <div className="container section project-details">
                    <div className="card">
                        <div className="card-content">
                            <span className="card-title">{user.name}</span>
                            <p><strong>Phone number: </strong>{user.phone}</p>
                            <p><strong>E-mail: </strong>{user.email}</p>
                            <br />
                            <div className="card-action actions">
                                <NavLink to={'/update/' + this.props.match.params.id} key={user.id} className="btn green darken-1">update</NavLink>
                                <button className="btn red darken-4" onClick={this.handleDelete}>delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="container center">
                    <p>Loading User...</p>
                </div>
            )
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const users = state.firestore.data.users;
    const user = users ? users[id] : null;

    return {
        user,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteUser: (user_id) => dispatch(deleteUser(user_id))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'users' }
    ])
)(UserDetails);
