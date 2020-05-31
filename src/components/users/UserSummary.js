import React from 'react';

const UserSummary = ({user}) => {
    return (
        <div className="col s6 m4">
            <div className="card">
                <div className="card-content grey-text text-darken-3">
                    <span className="card-title">{user.name}</span>
                    <p>Phone number: {user.phone}</p>
                    <p className="grey-text">E-mail: {user.email}}</p>
                </div>
            </div>
        </div>
    )
}

export default UserSummary;