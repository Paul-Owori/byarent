import {
  GET_ITEMS,
  GET_ITEM,
  ADD_ITEM,
  DELETE_ITEM,
  UPDATE_ITEM,
  ITEMS_LOADING
} from "../Actions/itemTypes";

const initialState = {
  items: [],
  item: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS: {
      //console.log("Supposed payload=>", action.payload);
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
        // items: [
        //   action.payload,
        //   ...state.items.filter(item => item._id !== action.payload._id)
        // ],
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
