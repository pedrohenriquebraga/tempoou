import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import NetInfo from "@react-native-community/netinfo";
import React, { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import NoNetwork from "./components/NoNetwork/NoNetwork";
import Forecast from "./pages/Forecast/Forecast";
import Home from "./pages/Home/Home";
import { translate } from "./translations";

const { Screen, Navigator } = createStackNavigator();

const AppRoutes: React.FC = () => {
  const [connected, setConnected] = useState(true);

  useEffect(() => {
    NetInfo.fetch().then((state) => {
      setConnected(state.isConnected && state.isInternetReachable);

      NetInfo.addEventListener((state) => {
        setConnected(state.isConnected && state.isInternetReachable);
      });
    });
  }, []);

  if (!connected) {
    return <NoNetwork />;
  }

  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="Home" component={Home} />
        <Screen
          name="Forecast"
          component={Forecast}
          options={{
            header: () => (
              <Header title={translate("components.header.weatherForecast")} />
            ),
            headerShown: true,
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
};

export default AppRoutes;
