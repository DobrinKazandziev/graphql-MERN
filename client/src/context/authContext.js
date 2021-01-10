import React, { useReducer, createContext } from 'react';
import { LS_KEYS, getLSItem } from '../utils/localStorage';

const AUTH_ACTIONS = {
  LOGGED_IN_USER: 'LOGGED_IN_USER',
}

//  reducer
const firebaseReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGGED_IN_USER:
      return {...state, userEmail: action.payload.userEmail, userToken: action.payload.userToken }
    default:
      return state;
  }
}

//  state
const initialState = {
  userEmail: null,
  userToken: null,
}

//  create context
const AuthContext = createContext();

//  context provider
const AuthProvider = ({ children }) => {
  const currentUserEmail = getLSItem(LS_KEYS.CURRENT_USER_EMAIL);
  const currentUserToken = getLSItem(LS_KEYS.CURRENT_USER_TOKEN);
  const pastState = { userEmail: currentUserEmail, userToken: currentUserToken };

  const [state, dispatch] = useReducer(firebaseReducer, currentUserToken ? pastState : initialState);

  const value = {state, dispatch};
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};

//  export 
export { AuthContext, AuthProvider, AUTH_ACTIONS }
