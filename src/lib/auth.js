import { getAuth, setPersistence, browserLocalPersistence, onAuthStateChanged } from 'firebase/auth';
import { app } from './firebase';

const auth = getAuth(app);

// const authCheck = () => {
//     onAuthStateChanged(auth, (user) => {
//         if(user) {
//             console.log('user signed in', user.uid);
//         } else {
//             console.log('user signed out');
//         }
//     })
// }

// setPersistence(auth, browserLocalPersistence)
//     .then(() => {
//         console.log('Authorization set');
//     })
//     .catch((err) => {
//         console.log('Error setting authorization: ', err);
//     });

export { auth };