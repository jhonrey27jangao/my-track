import React from "react";
import { TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import { Text } from "react-native-elements";
import Spacer from "./Spacer";

function NavLink({ navigation, mode }) {
  return (
    <Spacer>
      <TouchableOpacity
        onPress={
          mode === "signin"
            ? () => navigation.navigate("SignUp")
            : () => navigation.navigate("SignIn")
        }
      >
        {mode === "signin" ? (
          <Text>Doesn't have an account? Sign up here.</Text>
        ) : (
          <Text>Already have an account? Sign in your account.</Text>
        )}
      </TouchableOpacity>
    </Spacer>
  );
}

export default withNavigation(NavLink);
