import {AUTHENTICATE, DEAUTHENTICATE, GET_PROFILE} from "./types";
import Router from "next/router";
import cookie from "js-cookie";
import axios from "axios";

export const authenticate = user => {
    return async (dispatch) => {

        const response = await axios.post("http://localhost:3000/api/auth/login", user);

        dispatch(getProfile());

        setCookie("token", response.data.token);

        dispatch({
            type: AUTHENTICATE,
            payload: response
        });

        setTimeout(() => {
            Router.push("/");
        }, 0)
    }
}

export const getProfile = id => {
    return async(dispatch) => {
        const {data} = await axios.get("http://localhost:3000/api/auth/profile/5ea42b795e51a2439429da54");
        dispatch({
            type: GET_PROFILE,
            payload: data.user
        })
    }
}

export const updateProfile = () => {
    return async(dispatch) => {
        const update = await axios.patch("http://localhost:3000/api/auth/profile/5ea42b795e51a2439429da54");
        dispatch(getProfile());
    }
}

// gets the token from the cookie and saves it in the store
export const reauthenticate = token => {
    return dispatch => {
        dispatch({ type: AUTHENTICATE, payload: token });
    };
};

// removing the token
export const deauthenticate = () => {
    return dispatch => {
        removeCookie('token');
        Router.push('/');
        dispatch({ type: DEAUTHENTICATE });
    };
};

// Helper Functions

export const setCookie = (key, value) => {
    if (process.browser) {
        cookie.set(key, value, {
            expires: 1,
        });
    }
};

export const removeCookie = key => {
    if (process.browser) {
        cookie.remove(key);
    }
};

export const getCookie = (key, req) => {
    return process.browser ? getCookieFromBrowser(key) : getCookieFromServer(key, req);
};

const getCookieFromBrowser = key => {
    return cookie.get(key);
};

const getCookieFromServer = (key, req) => {
    if (!req.headers.cookie) {
        return undefined;
    }
    const rawCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith(`${key}=`));
    if (!rawCookie) {
        return undefined;
    }
    return rawCookie.split('=')[1];
};

export const checkServerSideCookie = ctx => {
    return async(dispatch) => {
        if (ctx.isServer) {
            if (ctx.req.headers.cookie) {
                console.log(1);
                const token = getCookie('token', ctx.req);
                ctx.store.dispatch(reauthenticate(token));
            }
        } else {
            const token = ctx.store.getState().authentication.token;
            console.log(2);

            if (token && ctx.pathname === "/signin") {
                Router.push("/")
            }
        }
    }
};


