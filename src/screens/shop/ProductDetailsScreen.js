import React from "react";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import Colors from "../../constant/Colors";
import { addToCart } from "../../store/actions/CartActions";
import CustomHeaderButton from "./../../components/HeaderButton";

const ProductsDetailsScreen = ({ navigation }) => {
  const productId = navigation.getParam("id");

  const selectedProduct = useSelector((state) =>
    state.products.products.find((product) => product.id === productId)
  );

  const dispatch = useDispatch();
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={styles.actions}>
        <Button
          color={Colors.primary}
          title="Add to cart"
          onPress={() => dispatch(addToCart(selectedProduct))}
        />
      </View>
      <Text style={styles.price}>${selectedProduct.price}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

ProductsDetailsScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: navigation.getParam("prodTitle"),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          onPress={() => navigation.navigate("Cart")}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  actions: {
    alignItems: "center",
    marginVertical: 20,
  },
  price: {
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 10,
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    marginVertical: 10,
    marginHorizontal: 20,
  },
});

export default ProductsDetailsScreen;
