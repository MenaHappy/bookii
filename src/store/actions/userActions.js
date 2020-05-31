export const createUser = (event) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const authorId = getState().firebase.auth.uid;
        firestore.collection('users').add({
            ...event,
            authorId: authorId,
            createdAt: new Date()

        }).then(() => {
            dispatch({ type: 'CREATE_USER', event });
        }).catch((err) => {
            dispatch({ type: 'CREATE_USER_ERROR', err });
        })
    }
};

export const deleteUser = (user_id) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        firestore.delete({ collection: 'users', doc: user_id }).then(() => {
            dispatch({ type: 'USER_DELETED' });
        }).catch((err) => {
            dispatch({ type: 'USER_NOT_DELETED' });
        })
    }
}
