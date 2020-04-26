import axios from "axios";
import {FOO} from "./types"

export const getPosts = () => {
    return async (dispatch) => {
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
        dispatch({
            type: FOO,
            payload: response.data
        });
    }
}