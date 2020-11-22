import { ADD_ORDER, SET_ORDERS } from "./../actions/OrdersActions";
import Order from "./../../models/OrderModel";

const initialState = {
  orders: [],
};

const OrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return {
        orders: action.payload,
      };
    case ADD_ORDER:
      const newOrder = new Order(
        action.payload.id,
        action.payload.items,
        action.payload.total,
        action.payload.date
      );
      return {
        ...state,
        orders: state.orders.concat(newOrder),
      };
  }

  return state;
};

export default OrderReducer;
