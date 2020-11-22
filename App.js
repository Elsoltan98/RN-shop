import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ProductReducer from "./src/store/reducer/ProductReducer";
import cartReducer from "./src/store/reducer/CartReducer";
import ProductNavigation from "./src/navigation/ProductNavigation";
import OrderReducer from "./src/store/reducer/OrdersReducer";
import authReducer from "./src/store/reducer/AuthReducer";
import thunk from "redux-thunk";
import NavigationContainer from "./src/navigation/NavigationContainer";

const rootReducer = combineReducers({
  products: ProductReducer,
  cart: cartReducer,
  orders: OrderReducer,
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
