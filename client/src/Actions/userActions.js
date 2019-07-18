import {
  GET_USERS,
  GET_USER,
  UPDATE_USER,
  ADD_USER,
  DELETE_USER,
  USERS_LOADING,
  SIGNIN_USER,
  LOGOUT_USER
} from "../Types/userTypes";

//Function to get all the users in the database
export const getUsers = () => dispatch => {
  dispatch(setUsersLoading());
  fetch("/users")
    .then(res => res.json())
    .then(res => dispatch({ type: GET_USERS, payload: res }));
};

//Add a new user
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
    });
};

//Sign in a user
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
      if (res && res.user_firstName) {
        sessionStorage.setItem("user", JSON.stringify(res));
        dispatch({ type: SIGNIN_USER, payload: res });
      } else {
        console.log("Login failed");
      }
    });
};

//Logout a user
export const userLogout = () => dispatch => {
  dispatch(setUsersLoading());
  sessionStorage.removeItem("user");

  return {
    type: LOGOUT_USER
  };
};

export const setUsersLoading = () => {
  return {
    type: USERS_LOADING
  };
};
