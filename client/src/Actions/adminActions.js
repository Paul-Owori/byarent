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

//Function to get all admins in the database
export const getAdmins = () => dispatch => {
  dispatch(setAdminsLoading());
  fetch("/admins")
    .then(res => res.json())
    .then(res => dispatch({ type: GET_ADMINS, payload: res }));
};

//Function to add a new admin to the database
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
    });
};

//Function to sign in an admin
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
      if (res && res.admin_firstName) {
        //Save the admin to the sessionstorage, then dispatch the admin to the redux storage
        sessionStorage.setItem("admin", JSON.stringify(res));
        dispatch({ type: SIGNIN_ADMIN, payload: res });
      } else {
        console.log("Login failed");
      }
    });
};

//Logout an admin
export const adminLogout = () => dispatch => {
  dispatch(setAdminsLoading());

  //Remove the admin from session storage
  sessionStorage.removeItem("admin");
  //
  dispatch({ type: LOGOUT_ADMIN });
};

export const setAdminsLoading = () => {
  return {
    type: ADMINS_LOADING
  };
};
