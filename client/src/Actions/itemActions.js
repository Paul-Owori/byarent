import {
  GET_ITEMS,
  GET_ITEM,
  ADD_ITEM,
  DELETE_ITEM,
  UPDATE_ITEM,
  ITEMS_LOADING
} from "../Actions/itemTypes";

export const getItems = () => dispatch => {
  dispatch(setItemsLoading());
  fetch("/items")
    .then(res => res.json())
    .then(res => dispatch({ type: GET_ITEMS, payload: res }))
    .catch(error => {
      console.error("Error:", error);
    });
};

export const addItem = item => dispatch => {
  fetch("/items", {
    method: "POST",

    body: item
  })
    .then(response => response.json())
    .then(res => {
      dispatch({ type: ADD_ITEM, payload: res });
    })
    .catch(error => {
      console.error("Error:", error);
    });
};

export const getItem = _id => dispatch => {
  dispatch(setItemsLoading());
  fetch(`/items/${_id}`)
    .then(res => res.json())
    .then(res => {
      dispatch({ type: GET_ITEM, payload: res });
      sessionStorage.setItem("item", JSON.stringify(res));
    })
    .catch(error => {
      console.error("Error:", error);
    });
};

export const updateItem = (item, _id) => dispatch => {
  fetch(`/items/${_id}`, {
    method: "PATCH",
    body: item
  })
    .then(response => response.json())
    .then(res => {
      dispatch({ type: UPDATE_ITEM, payload: res });
    })
    .catch(error => {
      console.error("Error:", error);
    });
};

export const buyItem = (item, _id) => dispatch => {
  fetch(`/items/buy/${_id}`, {
    method: "PATCH",
    body: item
  })
    .then(response => response.json())
    .then(res => {
      dispatch({ type: UPDATE_ITEM, payload: res });
    })
    .catch(error => {
      console.error("Error:", error);
    });
};

export const deleteItem = _id => dispatch => {
  fetch(`/items/${_id}`, {
    method: "DELETE"
  })
    .then(response => response.json())
    .then(res => {
      dispatch({ type: DELETE_ITEM, payload: _id });
    })
    .catch(error => {
      console.error("Error:", error);
    });
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};
