import React from 'react';
import UserSummary from './UserSummary';
import { Link } from 'react-router-dom';

const pStyle = {
    color: '#fff',
    fontSize: '28px',
    textAlign: 'center',
    backgroundColor: '#3c3c3cc7',
    padding: '20px',
    borderRadius: '10px'
}

const UsersList = ({ users, searchValue }) => {
    return (
        <div className="project-list section">
            {users.length < 1 && <p style={pStyle}>There are currently no users. Feel free to create one!</p>}
            {users && users.map(user => {
                if (searchValue) {
                    if (user.name.indexOf(searchValue) !== -1) {
                        return (
                            <Link to={'/user/' + user.id} key={user.id}>
                                <UserSummary user={user} />
                            </Link>
                        )
                    }else{
                        return <div></div>
                    }
                }
                return (
                    <Link to={'/user/' + user.id} key={user.id}>
                        <UserSummary user={user} />
                    </Link>
                )
            })}
        </div>
    )
}

export default UsersList;