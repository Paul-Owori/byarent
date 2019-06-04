import {
  GET_USERS,
  GET_USER,
  UPDATE_USER,
  ADD_USER,
  DELETE_USER,
  USERS_LOADING,
  SIGNIN_USER
} from "./userTypes";

export const getUsers = () => dispatch => {
  dispatch(setUsersLoading());
  fetch("/users")
    .then(res => res.json())
    .then(res => dispatch({ type: GET_USERS, payload: res }));
};

export const addUser = user => dispatch => {
  dispatch(setUsersLoading(), { STUFF: "RANDOM OBJECT" });
  fetch("/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .then(response => {
      dispatch({ type: ADD_USER, payload: response });
      //console.log("CLIENT SIDE", response.status);
    });
  //.then(res => dispatch({ type: ADD_USER, payload: res.data })); //PAYLOAD WAS res.data
};

export const signInUser = user => dispatch => {
  dispatch(setUsersLoading());
  fetch("/users/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .then(res => {
      sessionStorage.setItem("user", JSON.stringify(res));
      dispatch({ type: SIGNIN_USER, payload: res });
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

export const setUsersLoading = () => {
  return {
    type: USERS_LOADING
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
