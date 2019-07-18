import {
  GET_ORDERS_USER,
  GET_ORDERS,
  GET_ORDER,
  ADD_ORDERS,
  DELETE_ORDER,
  PRE_ORDER,
  DELETE_PRE_ORDER,
  UPDATE_ORDER,
  ORDERS_LOADING
} from "../Types/orderTypes";

//Get all the orders associated with a particular user
export const getOrdersUser = id => dispatch => {
  dispatch(setOrdersLoading());
  fetch(`/orders/user/${id}`)
    .then(res => res.json())
    .then(res => {
      sessionStorage.setItem("orders", JSON.stringify(res));
      dispatch({ type: GET_ORDERS_USER, payload: res });
    })
    .catch(error => {
      console.error("Error:", error);
    });
};

//Get all orders available in the database
export const getOrders = id => dispatch => {
  dispatch(setOrdersLoading());
  fetch(`/orders`)
    .then(res => res.json())
    .then(res => {
      sessionStorage.setItem("orders", JSON.stringify(res));
      dispatch({ type: GET_ORDERS, payload: res });
    })
    .catch(error => {
      console.error("Error:", error);
    });
};

//Add an order to the database
export const addOrders = orders => dispatch => {
  dispatch(setOrdersLoading());

  let sendOrders = orders => {
    let newOrders = [];
    orders.forEach(order => {
      fetch("/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
      })
        .then(response => {
          console.log(response);
          newOrders.push(response.order);
          return newOrders;
        })
        .then(newOrders => {
          if (newOrders.length === orders.length) {
            dispatch({ type: ADD_ORDERS, payload: newOrders });
          }
        });
    });
  };
};

//Delete a single order
export const deleteOrder = id => dispatch => {
  dispatch(setOrdersLoading());

  fetch(`/orders/${id}`, {
    method: "DELETE"
  })
    .then(response => {
      return response.json();
    })
    .then(response => {
      dispatch({ type: DELETE_ORDER, payload: response });
    });
};

export const setOrdersLoading = () => {
  return {
    type: ORDERS_LOADING
  };
};

//Place a pre_order in a users cart
export const preOrder = order => dispatch => {
  dispatch(setOrdersLoading());
  let cart = [];
  cart.push(order);
  if (sessionStorage.getItem("cart") === null) {
    sessionStorage.setItem("cart", JSON.stringify(cart));
  } else {
    let oldCart = JSON.parse(sessionStorage.getItem("cart"));
    if (oldCart.includes(order) === false) {
      let newCart = [...oldCart, ...cart];

      sessionStorage.setItem("cart", JSON.stringify(newCart));
    }
  }
  dispatch({ type: PRE_ORDER, payload: order });
};

//Delete a pre_order from a users cart
export const deletePreOrder = id => dispatch => {
  dispatch(setOrdersLoading());

  //Function to make a new cart
  const makeNewCart = (_id, _oldCart, callReplaceCart) => {
    let newCart = _oldCart.filter(item => {
      return item._id !== _id;
    });

    callReplaceCart(newCart);
  };

  //Function to replace the old cart with a new one
  const replaceCart = newCart => {
    sessionStorage.setItem("cart", JSON.stringify(newCart));
    dispatch({ type: DELETE_PRE_ORDER, payload: id });
  };

  makeNewCart(id, JSON.parse(sessionStorage.getItem("cart")), replaceCart);
};
