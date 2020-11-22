import React, { useReducer, useCallback, useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";
import Card from "../../components/Card";
import Colors from "../../constant/Colors";
import Input from "./../../components/Input";
import { signin, signup } from "../../store/actions/AuthActions";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const Authentication = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isSignUp, setSignUp] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  const authHandler = async () => {
    let action;
    if (isSignUp) {
      action = signup(
        formState.inputValues.email,
        formState.inputValues.password
      );
    } else {
      action = signin(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }
    setError(null);
    setLoading(true);
    try {
      await dispatch(action);
      navigation.navigate("ShopNav");
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  useEffect(() => {
    if (error) {
      Alert.alert("An occuerd error!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  return (
    <View style={styles.screen}>
      <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <KeyboardAvoidingView behavior="padding">
              <Input
                id="email"
                label="E-mail"
                keyboardType="email-address"
                required
                email
                autoCapitalize="none"
                errorText="Please enter a valid email address"
                onInputChange={inputChangeHandler}
                initialValue=""
              />
              <Input
                id="password"
                label="Password"
                keyboardType="default"
                required
                secureTextEntry
                minLength={5}
                autoCapitalize="none"
                errorText="Please enter a valid password"
                onInputChange={inputChangeHandler}
                initialValue=""
              />
              <View style={styles.btnContainer}>
                {isLoading ? (
                  <ActivityIndicator color={Colors.primary} size="small" />
                ) : (
                  <Button
                    title={isSignUp ? "Sign up" : "Log in"}
                    color={Colors.primary}
                    onPress={authHandler}
                  />
                )}
              </View>
              <View style={styles.btnContainer}>
                <Button
                  title={`Switch to ${isSignUp ? "Log in" : "Sign up"}`}
                  color={Colors.accent}
                  onPress={() => {
                    setSignUp((prevState) => !prevState);
                  }}
                />
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </Card>
      </LinearGradient>
    </View>
  );
};

Authentication.navigationOptions = {
  headerTitle: "Authanticate",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
  },
  btnContainer: {
    marginTop: 10,
  },
});

export default Authentication;
