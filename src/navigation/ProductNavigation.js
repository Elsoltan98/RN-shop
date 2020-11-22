import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import ProductsOverviewScreen from "./../screens/shop/ProductsOverviewScreen";
import Colors from "./../constant/Colors";
import { Button, Platform, SafeAreaView, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ProductsDetailsScreen from "../screens/shop/ProductDetailsScreen";
import CartScreen from "./../screens/shop/CartScreen";
import OrdersScreen from "./../screens/shop/OrdersScreen";
import UserProductScreen from "../screens/user/UserProductScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import Authentication from "../screens/user/Authentication";
import StartUpScreen from "../screens/StartUpScreen";
import { useDispatch } from "react-redux";
import { logout } from "../store/actions/AuthActions";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "white",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverView: ProductsOverviewScreen,
    ProductDetail: ProductsDetailsScreen,
    Cart: CartScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          color={drawerConfig.tintColor}
          size={23}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const OrderNavigator = createStackNavigator(
  {
    Order: OrdersScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-list" : "ios-list"}
          color={drawerConfig.tintColor}
          size={23}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);
const AdminNavigator = createStackNavigator(
  {
    UserProduct: UserProductScreen,
    EditProduct: EditProductScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-create" : "ios-create"}
          color={drawerConfig.tintColor}
          size={23}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    Product: ProductsNavigator,
    Order: OrderNavigator,
    Admin: AdminNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
    },
    contentComponent: (props) => {
      const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <DrawerItems {...props} />
            <Button
              title="Log out"
              color={Colors.primary}
              onPress={() => {
                dispatch(logout());
                // props.navigation.navigate("AuthNav");
              }}
            />
          </SafeAreaView>
        </View>
      );
    },
  }
);

const AuthNavigator = createStackNavigator(
  {
    Auth: Authentication,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const MainNavigator = createSwitchNavigator({
  Start: StartUpScreen,
  AuthNav: AuthNavigator,
  ShopNav: ShopNavigator,
});

export default createAppContainer(MainNavigator);
