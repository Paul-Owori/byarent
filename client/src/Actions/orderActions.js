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

export const addOrders = orders => dispatch => {
  dispatch(setOrdersLoading());
  console.log("ORDERS BEING SENT BY ACTIONS==>>", orders);
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

export const preOrder = order => dispatch => {
  dispatch(setOrdersLoading());
  let cart = [];
  cart.push(order);
  if (sessionStorage.getItem("cart") === null) {
    console.log("Cart was empty so this is fresh cart==>>", cart);
    sessionStorage.setItem("cart", JSON.stringify(cart));
  } else {
    let oldCart = JSON.parse(sessionStorage.getItem("cart"));
    if (oldCart.includes(order) === false) {
      let newCart = [...oldCart, ...cart];
      console.log("This is the new cart made==>>", newCart);
      sessionStorage.setItem("cart", JSON.stringify(newCart));
    }
  }
  dispatch({ type: PRE_ORDER, payload: order });
};

export const deletePreOrder = id => dispatch => {
  dispatch(setOrdersLoading());
  console.log("id received==>>", id);

  const makeNewCart = (_id, _oldCart, callReplaceCart) => {
    console.log("Old cart==>>", _oldCart);
    let newCart = _oldCart.filter(item => {
      return item._id !== _id;
    });
    console.log("New Cart==>>", newCart);
    callReplaceCart(newCart);
  };

  const replaceCart = newCart => {
    sessionStorage.setItem("cart", JSON.stringify(newCart));
    dispatch({ type: DELETE_PRE_ORDER, payload: id });
  };

  console.log(
    "JSON.parse(sessionStorage.getItem(`cart`))==>>",
    JSON.parse(sessionStorage.getItem("cart"))
  );

  makeNewCart(id, JSON.parse(sessionStorage.getItem("cart")), replaceCart);
};
