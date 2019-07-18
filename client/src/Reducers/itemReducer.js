import {
  GET_ITEMS,
  GET_ITEM,
  ADD_ITEM,
  DELETE_ITEM,
  UPDATE_ITEM,
  ITEMS_LOADING,
  GET_AVAILABLE_ITEMS
} from "../Types/itemTypes";

const initialState = {
  items: [],
  item: {},
  imageLinks: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS: {
      return {
        ...state,
        items: action.payload,
        loading: false
      };
    }
    case GET_AVAILABLE_ITEMS: {
      return {
        ...state,
        items: action.payload,
        loading: false
      };
    }
    case GET_ITEM:
      return { ...state, item: action.payload, loading: false };
    case DELETE_ITEM:
      return {
        ...state,
        loading: false,
        items: state.items.filter(item => item._id !== action.payload)
      };

    case ADD_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload],
        item: action.payload,
        loading: false
      };

    case UPDATE_ITEM:
      return {
        ...state,
        item: action.payload,
        loading: false
      };
    case ITEMS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
