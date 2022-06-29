import { AUTH } from "../constants/actionTypes"
import * as API from "../API/index"

export const signIn = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await API.signIn(formData)
        dispatch({ type: AUTH, data })
        navigate('/')
    } catch (error) {
        console.log(error.response)
        console.log(error)
    }
}

export const signUp = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await API.signUp(formData)
        dispatch({ type: AUTH, data })
        navigate('/')
    } catch (error) {
        console.log(error)
    }
}