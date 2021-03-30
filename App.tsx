import admob, { MaxAdContentRating } from "@react-native-firebase/admob";
import React from "react";
import "react-native-gesture-handler";
import AppRoutes from "./src/routes";

admob().setRequestConfiguration({
    maxAdContentRating: MaxAdContentRating.MA,
    tagForChildDirectedTreatment: false,
});

export default function App() {
    return <AppRoutes />;
}
