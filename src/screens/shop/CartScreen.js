import React, { useState } from "react";
import {
  Button,
  Platform,
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";

import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constant/Colors";
import { removeFromCart } from "../../store/actions/CartActions";
import { add_order } from "../../store/actions/OrdersActions";
import CartItem from "./../../components/CartItem";

const CartScreen = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const cartTotalAmount = useSelector((state) => state.cart.total);

  const cartItems = useSelector((state) => {
    const transformedCartItems = [];

    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });

  const orderHandler = async () => {
    setLoading(true);
    await dispatch(add_order(cartItems, cartTotalAmount));
    setLoading(false);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{" "}
          <Text style={styles.totalAmount}>
            ${cartTotalAmount < 0 ? 0 : cartTotalAmount.toFixed(2)}
          </Text>
        </Text>
        {isLoading ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Button
            color={Colors.accent}
            title="Order Now"
            disabled={cartItems.length === 0}
            onPress={orderHandler}
          />
        )}
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={({ item }) => (
          <CartItem
            quantity={item.quantity}
            price={item.productPrice}
            title={item.productTitle}
            onRemove={() => dispatch(removeFromCart(item.productId))}
            deletable
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
  summaryText: {
    fontSize: 18,
  },
  totalAmount: {
    color: Colors.primary,
  },
});

export default CartScreen;
