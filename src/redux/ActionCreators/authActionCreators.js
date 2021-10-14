import { RESET_USER, SET_USER } from "../ActionTypes/authTypes"


const setUser = (data)=>({
    type: SET_USER,
    payload: data
})


const resetUser = ()=>({
    type:RESET_USER
})




export const loginUser = (data) => dispatch => {
    dispatch(setUser(data))
}

export const logOutUser = ()=>dispatch=>{
    dispatch(resetUser())
}