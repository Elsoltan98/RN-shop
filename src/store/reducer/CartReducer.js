import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/CartActions";
import { ADD_ORDER } from "../actions/OrdersActions";
import { DELETE_ITEM } from "../actions/ProductActions";
import CartItem from "./../../models/CartModel";

const initialState = {
  items: {},
  total: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addProduct = action.payload;
      const prodPrice = addProduct.price;
      const prodTitle = addProduct.title;

      let updateOrNewCartItem;

      if (state.items[addProduct.id]) {
        updateOrNewCartItem = new CartItem(
          state.items[addProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addProduct.id].sum + prodPrice
        );
      } else {
        updateOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
      }
      return {
        ...state,
        items: { ...state.items, [addProduct.id]: updateOrNewCartItem },
        total: state.total + prodPrice,
      };

    case REMOVE_FROM_CART:
      const selectedCartItem = state.items[action.payload];
      const currentQuantity = selectedCartItem.quantity;
      let updatedCartItem;
      if (currentQuantity > 1) {
        updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.productPrice,

          selectedCartItem.productTitle,
          selectedCartItem.sum - selectedCartItem.productPrice
        );
        updatedCartItem = { ...state.items, [action.payload]: updatedCartItem };
      } else {
        updatedCartItem = { ...state.items };
        delete updatedCartItem[action.payload];
      }
      return {
        ...state,
        items: updatedCartItem,
        total: state.total - selectedCartItem.productPrice,
      };
    case ADD_ORDER:
      return initialState;
    case DELETE_ITEM:
      if (!state.items[action.payload]) {
        return state;
      }
      const updatedItems = { ...state.items };
      const itemTotal = state.items[action.payload].sum;
      delete updatedItems[action.payload];
      return {
        ...state,
        items: updatedItems,
        total: state.total - itemTotal,
      };
  }
  return state;
};
