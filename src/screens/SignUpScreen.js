import React, { useContext } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import AccountForm from "../components/AccountForm";

function SignUpScreen() {
  const { state, signUp } = useContext(AuthContext);
  const { errorMessage } = state;

  return (
    <>
      <AccountForm
        mode="signup"
        onSubmit={signUp}
        errorMessage={errorMessage}
      />
    </>
  );
}

SignUpScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

export default SignUpScreen;
