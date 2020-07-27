import React, {useState, useEffect} from 'react';
import firebase from './firebase';

const firebaseContext = React.createContext();
const {Provider} = firebaseContext;


const FirebaseProvider = ({children}) => {

  const [isUserAuth, setIsUserAuth] = useState(false);

  useEffect(() => {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? setIsUserAuth(true)
        : setIsUserAuth(false)
    });
  }, []);

  return (
    <Provider value={{
      firebase,
      isUserAuth
    }}>
    {children}
    </Provider>
  );
}

export {
  firebaseContext,
  FirebaseProvider
};
