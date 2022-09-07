import React, { useContext } from "react";
import { View, StatusBar } from "react-native";
import { Button, Text } from "react-native-elements";
import { Context as AuthContext } from "../context/AuthContext";
import { SafeAreaView } from "react-navigation";
import { FontAwesome } from "@expo/vector-icons";
import Spacer from "../components/Spacer";

function AccountScreen() {
  const { signOut } = useContext(AuthContext);
  return (
    <SafeAreaView
      forceInset={{ top: "always" }}
      style={{ flex: 1, marginTop: StatusBar.currentHeight }}
    >
      <View>
        <Spacer>
          <Text h2 style={{ textAlign: "center" }}>
            AccountScreen
          </Text>
        </Spacer>
        <Spacer>
          <Button title="Sign Out" onPress={() => signOut()} />
        </Spacer>
      </View>
    </SafeAreaView>
  );
}

AccountScreen.navigationOptions = {
  title: "Account",
  tabBarIcon: <FontAwesome name="gear" size={20} />,
};

export default AccountScreen;
