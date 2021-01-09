import React, { useEffect, useReducer, createContext } from 'react';
import { auth } from '../utils/firebase';

const AUTH_ACTIONS = {
  LOGGED_IN_USER: 'LOGGED_IN_USER',
}

//  reducer
const firebaseReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGGED_IN_USER:
      return {...state, user: action.payload}
    default:
      return state;
  }
}

//  state
const initialState = {
  user: null,
}

//  create context
const AuthContext = createContext();

//  context provider
const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(firebaseReducer, initialState);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();

        dispatch({ type: AUTH_ACTIONS.LOGGED_IN_USER, token: idTokenResult.token });
      }
    })
    //  cleanup
    return () => unsubscribe();
  }, [])

  const value = {state, dispatch};
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};

//  export 
export { AuthContext, AuthProvider, AUTH_ACTIONS }
