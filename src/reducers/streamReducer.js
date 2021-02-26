import _ from "lodash";
import {
  CREATE_STREAM,
  FETCH_STREAM,
  FETCH_STREAMS,
  DELETE_STREAM,
  EDIT_STREAM
} from "../actions/types";


const streamReducer = (state = {}, action) => {
  switch (action.type) {

    case FETCH_STREAMS:
      // _.mapKey => convert [] to {} with key in second @params;
      return { ...state, ..._.mapKeys(action.payload, "id") };

    case FETCH_STREAM:
      return { ...state, [action.payload.id]: action.payload };

    case CREATE_STREAM:
      return { ...state, [action.payload.id]: action.payload };

    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload };

    case DELETE_STREAM:
      //_.omit => return new obj without key in second argument;
      return _.omit(state, action.payload);

    default:
      return state;
  }
}

export default streamReducer;