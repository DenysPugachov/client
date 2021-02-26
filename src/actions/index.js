import streams from "../apis/streams"
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAM,
  FETCH_STREAMS,
  DELETE_STREAM,
  EDIT_STREAM,
} from "./types";


export const signIn = userId => {
  return {
    type: SIGN_IN,
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};


export const createStream = formValues => async dispatch => {
  const response = await streams.post("./streams", formValues);
  return dispatch({ type: CREATE_STREAM, payload: response.data });
}

export const fetchStream = id => async dispatch => {
  const response = await streams.get(`./streams/${id}`);
  return dispatch({ type: FETCH_STREAM, payload: response.data.id });
}


export const fetchStreams = () => async dispatch => {
  const response = await streams.get("/streams");
  return dispatch({ type: FETCH_STREAMS, payload: response.data })
}


export const editStream = (id, formValues) => async dispatch => {
  const response = await streams.put(`/streams/${id}`, formValues)
  return dispatch({ type: EDIT_STREAM, payload: response.data })
}


export const deleteStream = id => async dispatch => {
  await streams.delete(`/streams/${id}`);
  return dispatch({ type: DELETE_STREAM, payload: id })
}
