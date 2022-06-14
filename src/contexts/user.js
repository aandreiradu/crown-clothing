import {createContext,useState,useEffect} from 'react'
import {onAuthStateChangedListener,createUserDocumentAuth} from '../utils/firebase/firebase.utils';

const defaultAuthValue = {
    currentUser: null,
    setCurrentUser: () => null
}

export const UserAuthContext = createContext({
    defaultAuthValue
});

const UserAuthProvider = (props) => {
    const [currentUser,setCurrentUser] = useState(null);


    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if(user) {
                createUserDocumentAuth(user);
            }
            setCurrentUser(user);
        });

        return unsubscribe;
    },[]);

    const context = {
        currentUser,
        setCurrentUser
    }
    return (
        <UserAuthContext.Provider value={context}>
            {props.children}
        </UserAuthContext.Provider>
    )
}

export default UserAuthProvider;