import axios from "axios";
import { tokenConfig } from './authActions'
import { GET_NOTES, ADD_NOTE, GET_NOTE, REMOVE_NOTE, EDIT_NOTE, DELETE_NOTE } from "./types";

export const getNotes = () => (dispatch) => {
  axios
    .get("/api/notes")
    .then((res) => {
      dispatch({
        type: GET_NOTES,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addNote = (note) => (dispatch, getState) => {
    axios.post('/api/notes', note, tokenConfig(getState)).then(res => {
        dispatch({
            type: ADD_NOTE,
            payload: res.data
        })
    }).catch(err => {
        console.log(err)
    })
}

export const getNote = (id) => (dispatch, getState) => {
    axios.get(`/api/notes/${id}`, tokenConfig(getState)).then(res => {
        dispatch({
            type: GET_NOTE,
            payload: res.data
        })
    }).catch(err => {
        console.log(err)
    })
}

export const removeNote = () => dispatch => {
    dispatch({
        type: REMOVE_NOTE,
    })
}

export const editNote = (id, note) => (dispatch, getState) => {
    axios.put(`/api/notes/${id}`, note, tokenConfig(getState)).then(res => {
        dispatch({
            type: EDIT_NOTE,
            payload: res.data
        })
    }).catch(err => {
        console.log(err)
    })
}

export const deleteNote = id => (dispatch, getState) => {
    axios.delete(`/api/notes/${id}`, tokenConfig(getState)).then(res => {
        dispatch({
            type: DELETE_NOTE,
            payload: res.data
        })
    }).catch(err => {
        console.log(err)
    })
}
