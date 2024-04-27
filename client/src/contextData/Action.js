import { Context } from "./Context"

export const LoginStart =(userCredentials)=>({
    type:"LOGIN_START"
})// we do not return anything, instead wait for successful or failure process

export const LoginSuccess=(user)=>({
    type: "LOGIN_SUCCESS",
    payload: user,  // to update our state
})
//return user's information

export const LoginFailure = () =>({
     type:"LOGIN_FAILURE",
})    
//now we have actions here, but to dispatch them and to update our state in context.js, we use reducer.js
export const Logout = () =>({
    type:"LOGOUT",
}) 