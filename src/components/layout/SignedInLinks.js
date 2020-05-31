import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';


const SignedInLinks = (props) => {
    return (
        <ul className="right">
            <li><NavLink to='/user'>Users</NavLink></li>
            <li><NavLink to='/user/create'>New User</NavLink></li>
            <li><NavLink to='/create'>New Event</NavLink></li>
            <li><button type="button" onClick={props.signOut}>Log Out</button></li>
            <li><NavLink to='/' className="btn btn-floating pink lighten-1">{props.profile.initials}</NavLink></li>
        </ul>
    )
}

const mapDispatchToProps = (disparch) => {
    return {
        signOut: () => disparch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks);