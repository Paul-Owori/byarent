import {
  GET_ITEMS,
  GET_ITEM,
  ADD_ITEM,
  DELETE_ITEM,
  UPDATE_ITEM,
  ITEMS_LOADING
} from "../Actions/itemTypes";

//FORM DATA!
export const getItems = () => dispatch => {
  dispatch(setItemsLoading());
  fetch("/items")
    .then(res => res.json())
    .then(res => dispatch({ type: GET_ITEMS, payload: res }))
    .catch(error => {
      console.error("Error:", error);
    });
};

//PROBLEMS ARE PROBABLY HERE
export const addItem = item => dispatch => {
  // dispatch(setItemsLoading());
  fetch("/items", {
    method: "POST",
    // headers: {
    //   "Content-Type": "application/x-www-form-urlencoded" //formData
    // },
    body: item
  })
    .then(response => response.json())
    .then(res => {
      //console.log("CLIENT SIDE", res.status, "res ITSELEF=>", res);
      dispatch({ type: ADD_ITEM, payload: res });
    })
    .catch(error => {
      console.error("Error:", error);
    });
  //.then(res => dispatch({ type: ADD_ITEM, payload: res }));
  //.then(res => dispatch({ type: ADD_USER, payload: res.data })); //PAYLOAD WAS res.data
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

//   export const getUsers = () => dispatch => {
//     dispatch(setUsersLoading());
//     fetch("/users")
//       .then(res => res.json())
//       .then(res => dispatch({ type: GET_USERS, payload: res }));
//   };
// export const deleteUser = id => dispatch => {
//   dispatch(setUsersLoading());
//   axios
//     .delete(`/users/${id}`)
//     .then(res => dispatch({ type: DELETE_USER, payload: id }));
// };

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};

/*
  // Example POST method implementation:
  
  postData('http://example.com/answer', {answer: 42})
    .then(data => console.log(JSON.stringify(data))) // JSON-string from `response.json()` call
    .catch(error => console.error(error));
  
  function postData(url = '', data = {}) {
    // Default options are marked with *
      return fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, cors, *same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
              'Content-Type': 'application/json',
              // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrer: 'no-referrer', // no-referrer, *client
          body: JSON.stringify(data), // body data type must match "Content-Type" header
      })
      .then(response => response.json()); // parses JSON response into native Javascript objects 
  }
  
  fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'   
          },
          body: JSON.stringify(data)
      })
      .then(response => response.json());  
  }
  


  
  
  */