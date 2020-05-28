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
            console.log(err)
            dispatch({ type: 'CREATE_USER_ERROR', err });
        })
    }
};
