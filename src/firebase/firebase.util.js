import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyD00MIAEG9ECL188k-8M6DlUqPxTOkHACU",
    authDomain: "crown-db-946f5.firebaseapp.com",
    projectId: "crown-db-946f5",
    storageBucket: "crown-db-946f5.appspot.com",
    messagingSenderId: "507418527626",
    appId: "1:507418527626:web:afa23dcc64ff037fedea73",
    measurementId: "G-3JXH6Y6WK3"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {

    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    // console.log(snapShot);

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName, email, createdAt, ...additionalData
            })

        } catch (error) {
            console.log('Error creating user ', error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

