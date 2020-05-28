const initState = {
    events: []
}

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_USER':
            console.log('created user', action.event);
            return state;
        case 'CREATE_USER_ERROR':
            console.log('error creating an user', action.err);
            return state;
        case 'USER_DELETED':
            console.log('user deleted');
            return state; 
        case 'USER_NOT_DELETED':
            console.log('user not deleted');
            return state;
        case 'USER_UPDATED':
            console.log('user updated');
            return state;
        case 'USER_NOT_UPDATED':
            console.log('user not updated');
            return state;

        default:
            return state;
    }
}

export default userReducer