import React, { useContext } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { Context as AuthContext } from "../context/AuthContext";
import AccountForm from "../components/AccountForm";

function SignInScreen() {
  const { state, signIn } = useContext(AuthContext);
  const { errorMessage } = state;
  const keyboardVerticalOffset = Platform.OS === "ios" ? 40 : 0;
  return (
    <>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={keyboardVerticalOffset}
        style={{ flex: 1 }}
      >
        <AccountForm
          mode="signin"
          onSubmit={signIn}
          errorMessage={errorMessage}
        />
      </KeyboardAvoidingView>
    </>
  );
}

SignInScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

export default SignInScreen;
