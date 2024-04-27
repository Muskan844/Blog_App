import React,{ createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null, //to fetch this user from localstorage on refreshing
  isFetching: false,
  error: false,
};

export const Context = createContext(INITIAL_STATE);
//on clicking login button, we will have 3 main procerss: 1)we're gonna sending out username an d password(credentials). After sending credentials, we have two mpore actions, it czan be success or failure
//2) if its successfull, we're gonna take response, which is user's information (name,email,profilepic etc), after that we're gonna update the state(INITIAL_STATE), i.e, user will not be null anymore
//3) if there is an error(wrong password, server error etc), user will remain null with error as true.
// these above actions will be taken in Action.js
export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE); //this reducer update the initial_state
  //now, we use use above Context as Provider
  useEffect(()=>{
    localStorage.setItem("user",JSON.stringify(state.user));
  },[state.user]);//whenever the state end user changes, fire this useEffect
  
  return (
    <Context.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};