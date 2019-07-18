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

export const getAdmins = () => dispatch => {
  dispatch(setAdminsLoading());
  fetch("/admins")
    .then(res => res.json())
    .then(res => dispatch({ type: GET_ADMINS, payload: res }));
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
    });
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
      if (res && res.admin_firstName) {
        sessionStorage.setItem("admin", JSON.stringify(res));
        dispatch({ type: SIGNIN_ADMIN, payload: res });
      } else {
        console.log("Login failed");
      }
    });
};

export const adminLogout = () => dispatch => {
  dispatch(setAdminsLoading());
  sessionStorage.removeItem("admin");

  return {
    type: LOGOUT_ADMIN
  };
};

export const setAdminsLoading = () => {
  return {
    type: ADMINS_LOADING
  };
};
