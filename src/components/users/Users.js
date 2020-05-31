import React, { Component } from 'react';
import UsersList from './UsersList';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import Search from '../dashboard/Search';

class Users extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: ''
        }
    }
    handleSearch = (searchValue) => {
        this.setState({ search: searchValue });
    }
    render() {
        const { users, auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />
        return (
            <div className="dashboard container">
                {users && users.length > 0 ? <Search onSearch={this.handleSearch} /> : <span></span>}
                <div className="row">
                    {users ? (
                        <div className="col s12 m12">
                            <UsersList searchValue={this.state.search} users={users} />
                        </div>)
                        : <p style={pStyle}>Loading...</p>}
                </div>
            </div>
        )
    }
}

const pStyle = {
    color: '#fff',
    fontSize: '28px',
    textAlign: 'center'
}


const mapStateToProps = (state) => {
    return {
        users: state.firestore.ordered.users,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'users', orderBy: ['createdAt', 'desc'] }
    ])
)(Users)