import {
  GET_ITEMS,
  GET_ITEM,
  ADD_ITEM,
  DELETE_ITEM,
  UPDATE_ITEM,
  ITEMS_LOADING,
  GET_AVAILABLE_ITEMS
} from "../Types/itemTypes";

//Get all items available in the database
export const getItems = () => dispatch => {
  dispatch(setItemsLoading());
  fetch("/items")
    .then(res => res.json())
    .then(res => dispatch({ type: GET_ITEMS, payload: res }))
    .catch(error => {
      console.error("Error:", error);
    });
};

//Get all items that have not yet been sold from the database
export const getAvailableItems = () => dispatch => {
  dispatch(setItemsLoading());
  fetch("/items")
    .then(res => res.json())
    .then(res => {
      //All items that have not been sold yet will be stored in availableItemArray
      //which will then be sent to the frontend
      let availableItemArray = [];
      res.forEach(item => {
        if (item.isSold === false) {
          availableItemArray.push(item);
        }
      });
      return availableItemArray;
    })
    .then(itemArray => {
      dispatch({ type: GET_AVAILABLE_ITEMS, payload: itemArray });
    })
    .catch(error => {
      console.error("Error:", error);
    });
};

//Add a new item
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

//Get a single item using it's id
export const getItem = _id => dispatch => {
  dispatch(setItemsLoading());
  fetch(`/items/${_id}`)
    .then(res => res.json())
    .then(res => {
      dispatch({ type: GET_ITEM, payload: res });
      console.log("ITEM FOR EDIT==>", res);
      sessionStorage.setItem("item", JSON.stringify(res));
    })
    .catch(error => {
      console.error("Error:", error);
    });
};

//Update an item
export const updateItem = (updatedItem, _id) => dispatch => {
  dispatch(setItemsLoading());

  fetch(`/items/${_id}`, {
    method: "PATCH",
    body: updatedItem
  })
    .then(response => response.json())
    .then(res => {
      dispatch({ type: UPDATE_ITEM, payload: res });
    })
    .catch(error => {
      console.error("Error:", error);
    });
};

//Buy an item
export const buyItem = (item, _id) => dispatch => {
  dispatch(setItemsLoading());
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

//Delete a single item
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
