import { getFirestore } from 'redux-firestore';

export const checkIfUserExists = async (userData) => {
    
    const { phone, email  } = userData;
    const firestore = getFirestore();

    const phonePromise = firestore.collection('users').where("phone", "==", phone).get();
    const emailPromise = firestore.collection('users').where("email", "==", email).get();

    return Promise.all([ phonePromise, emailPromise]).then((queryValues) => {
        const validQueries = queryValues.filter(queryValue=>queryValue.docs.length > 0);
        if(validQueries.length < 1) return 'User does not exist';
        return validQueries;
    });
};