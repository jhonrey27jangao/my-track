import React, { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import Spacer from "../components/Spacer";
import NavLink from "./NavLink";
import { Context as AuthContext } from "../context/AuthContext";

function AccountForm({ onSubmit, mode, errorMessage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { clearErrors } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={clearErrors} />
      <Spacer>
        <Text h3>{mode === "signin" ? "Sign In" : "Sign Up"} for Tracker</Text>
      </Spacer>
      <Spacer>
        <Input
          value={email}
          label="Email"
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </Spacer>
      <Spacer>
        <Input
          value={password}
          secureTextEntry
          label="Password"
          onChangeText={setPassword}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </Spacer>
      {errorMessage ? (
        <Text style={{ textAlign: "center", color: "red" }}>
          {errorMessage}
        </Text>
      ) : (
        <></>
      )}
      <Spacer>
        <Button
          title={mode === "signin" ? "Sign In" : "Sign Up"}
          onPress={() => onSubmit({ email, password })}
        />
      </Spacer>
      <NavLink mode={mode} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingBottom: 200,
  },
});

export default AccountForm;
