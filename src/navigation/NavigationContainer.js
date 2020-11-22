import React, { useEffect, useRef } from "react";
import { NavigationActions } from "react-navigation";
import { useSelector } from "react-redux";
import ProductNavigation from "./ProductNavigation";

const NavigationContainer = () => {
  const navRef = useRef();
  const isAuth = useSelector((state) => !!state.auth.token);

  useEffect(() => {
    if (!isAuth) {
      navRef.current.dispatch(
        NavigationActions.navigate({ routeName: "AuthNav" })
      );
    }
  }, [isAuth]);

  return <ProductNavigation ref={navRef} />;
};

export default NavigationContainer;
