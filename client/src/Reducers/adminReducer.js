import {
  GET_ADMINS,
  GET_ADMIN,
  UPDATE_ADMIN,
  ADD_ADMIN,
  DELETE_ADMIN,
  ADMINS_LOADING,
  SIGNIN_ADMIN,
  LOGOUT_ADMIN
} from "../Types/adminTypes";

const initialState = {
  admins: [],
  admin: {},
  loading: false,
  loggedIn: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ADMINS:
      return { ...state, admins: action.payload, loading: false };
    case GET_ADMIN:
      return { ...state, admin: action.payload, loading: false };
    case LOGOUT_ADMIN:
      return { ...state, admin: {}, loading: false, loggedIn: false };
    case DELETE_ADMIN:
      return {
        ...state,
        loading: false,
        admins: state.admins.filter(admin => admin._id !== action.payload)
      };
    case ADD_ADMIN:
      return {
        ...state,
        admins: [...state.admins, action.payload],
        admin: action.payload,
        loading: false
      };
    case SIGNIN_ADMIN:
      return {
        ...state,
        admin: action.payload,
        loading: false,
        loggedIn: true
      };
    case UPDATE_ADMIN:
      return {
        ...state,
        admin: action.payload,
        admins: [
          action.payload,
          ...state.admins.filter(admin => admin._id !== action.payload._id)
        ],
        loading: false
      };
    case ADMINS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
