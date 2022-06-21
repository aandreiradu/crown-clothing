import {createContext, useReducer} from 'react'

const defaultAuthValue = {
    currentUser: null,
    setCurrentUser: () => null
}

export const UserAuthContext = createContext({
    defaultAuthValue
});


const INITIAL_STATE = {
    currentUser: null
}

export const USER_ACTION_TYPES = {
    'SET_CURRENT_USER' : 'SET_CURRENT_USER'
}

const userAuthReducer = (state,action) => {
    const {type,payload}  = action;
    switch(type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER : 
            return {
                ...state,
                currentUser: payload
            }

        default : 
            throw new Error(`Unhandled type ${type} in userReducer`);
    }
 
}



const UserAuthProvider = (props) => {
    const [state,dispatch] = useReducer(userAuthReducer,INITIAL_STATE);
    const {currentUser} = state;
    



    const context = {
        currentUser
    }
    return (
        <UserAuthContext.Provider value={context}>
            {props.children}
        </UserAuthContext.Provider>
    )
}

export default UserAuthProvider;