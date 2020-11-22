import Product from "../../models/ProductModel";
import {
  CREATE_ITEM,
  DELETE_ITEM,
  SET_ITEM_DATA,
  UPDATE_ITEM,
} from "../actions/ProductActions";
import PRODUCT from "./../../data/dummy-data";

const initialState = {
  products: [],
  userProduct: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ITEM_DATA:
      return {
        products: action.payload,
        userProduct: action.userProduct,
      };
    case CREATE_ITEM:
      const newProduct = new Product(
        action.pid,
        action.payload.ownerId,
        action.payload.title,
        action.payload.imageUrl,
        action.payload.description,
        action.payload.price
      );
      return {
        ...state,
        products: state.products.concat(newProduct),
        userProduct: state.userProduct.concat(newProduct),
      };
    case UPDATE_ITEM:
      const userProductIndex = state.userProduct.findIndex(
        (prod) => prod.id === action.pid
      );
      const updatedProduct = new Product(
        action.pid,
        state.userProduct[userProductIndex].ownerId,
        action.payload.title,
        action.payload.imageUrl,
        action.payload.description,
        state.userProduct[userProductIndex].price
      );
      const updateUserProducts = [...state.userProduct];
      updateUserProducts[userProductIndex] = updatedProduct;

      const productsIndex = state.products.findIndex(
        (prod) => prod.id === action.pid
      );
      const updateProducts = [...state.products];
      updateProducts[productsIndex] = updatedProduct;

      return {
        ...state,
        products: updateProducts,
        userProduct: updateUserProducts,
      };

    case DELETE_ITEM:
      return {
        ...state,
        userProduct: state.userProduct.filter(
          (product) => product.id !== action.payload
        ),
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
      };
  }
  return state;
};
