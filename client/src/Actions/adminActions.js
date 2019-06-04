import {
  GET_ADMINS,
  GET_ADMIN,
  UPDATE_ADMIN,
  ADD_ADMIN,
  DELETE_ADMIN,
  ADMINS_LOADING,
  SIGNIN_ADMIN
} from "./adminTypes";

export const getAdmins = () => dispatch => {
  dispatch(setAdminsLoading());
  fetch("/admins")
    .then(res => res.json())
    .then(res => dispatch({ type: DELETE_ADMIN, payload: res }));
};

export const addAdmin = admin => dispatch => {
  dispatch(setAdminsLoading());
  fetch("/admins/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(admin)
  })
    .then(response => {
      return response.json();
    })
    .then(response => {
      dispatch({ type: ADD_ADMIN, payload: response });
      //console.log("CLIENT SIDE", response.status);
    });
  //.then(res => dispatch({ type: ADD_USER, payload: res.data })); //PAYLOAD WAS res.data
};

export const signInAdmin = admin => dispatch => {
  dispatch(setAdminsLoading());
  fetch("/admins/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(admin)
  })
    .then(response => {
      return response.json();
    })
    .then(res => {
      sessionStorage.setItem("admin", JSON.stringify(res));
      dispatch({ type: SIGNIN_ADMIN, payload: res });
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

export const setAdminsLoading = () => {
  return {
    type: ADMINS_LOADING
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
