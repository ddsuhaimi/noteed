import { GET_NOTES, ADD_NOTE, GET_NOTE, REMOVE_NOTE, EDIT_NOTE } from "../actions/types";
const initialState = {
  notes: [],
  note: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_NOTES:
      return { ...state, notes: action.payload };
    case ADD_NOTE:
      return {
        ...state,
        notes: [action.payload, ...state.notes]
      };
    case GET_NOTE:
      return {
        ...state,
        note: action.payload
      }
    case REMOVE_NOTE:
      return {
        ...state,
        note: {}
      }
    case EDIT_NOTE:
      return {
        ...state,
        note: action.payload
      }
    default:
      return state;
  }
}
