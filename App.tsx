import storage from "@react-native-async-storage/async-storage";
import admob, { MaxAdContentRating } from "@react-native-firebase/admob";
import React, { useEffect, useState } from "react";
import "react-native-gesture-handler";
import SplashScreen from "react-native-splash-screen";
import OnBoarding from "./src/components/OnBoarding/OnBoarding";
import AppRoutes from "./src/routes";
import * as RNLocalize from "react-native-localize";
import RNRestart from "react-native-restart";
import { setI18nConfig } from "./src/translations/index";

export default function App() {
  const [showBoarding, setShowBoarding] = useState<boolean>();

  function handleUpdateLocale() {
    setI18nConfig();
    RNRestart.Restart();
  }

  setI18nConfig();
  useEffect(() => {
    RNLocalize.addEventListener("change", handleUpdateLocale);

    admob().setRequestConfiguration({
      maxAdContentRating: MaxAdContentRating.MA,
      tagForChildDirectedTreatment: false,
    });

    storage
      .getItem("@ShowBoarding", (err, result) => {
        if (err) {
          return setShowBoarding(true);
        }
        const boarding = JSON.parse(result);

        if (!boarding) {
          return setShowBoarding(true);
        }
        return setShowBoarding(boarding.show);
      })
      .then(() => {
        SplashScreen.hide();
      });
  }, []);

  async function handleDone() {
    await storage.setItem("@ShowBoarding", JSON.stringify({ show: false }));
    return setShowBoarding(false);
  }

  if (showBoarding) return <OnBoarding done={handleDone} skip={handleDone} />;
  else return <AppRoutes />;
}
