import admob, {
  MaxAdContentRating,
} from "@react-native-firebase/admob";
import React, { useEffect } from "react";
import "react-native-gesture-handler";
import AppRoutes from "./src/routes";

export default function App() {
  useEffect(() => {
    admob().setRequestConfiguration({
      maxAdContentRating: MaxAdContentRating.MA,
      tagForChildDirectedTreatment: false,
    });
  }, []);
  return <AppRoutes />;
}
