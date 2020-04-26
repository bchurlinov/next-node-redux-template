import {AUTHENTICATE, DEAUTHENTICATE, GET_PROFILE} from "./types";

const initialState = {
    token: null,
    profile: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATE :
            return {
                ...state,
                token: action.payload
            }
        case DEAUTHENTICATE:
            return {token: null};
        case GET_PROFILE :
            return {
                ...state,
                profile: action.payload
            }
        default:
            return state
    }
}

export default authReducer;