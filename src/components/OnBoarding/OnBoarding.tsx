import React from "react";
import Boarding, { Page } from "react-native-onboarding-swiper";
import badWeather from "../../animations/onBoarding/bad-weather.json";
import sunCloud from "../../animations/onBoarding/sun-cloud.json";
import umbrella from "../../animations/onBoarding/umbrella.json";
import { translate } from "../../translations";
import { Title } from "../Custom/Custom";
import { Animation } from "./styles";
import * as RNLocalize from "react-native-localize";

interface IBoardingProps {
  done: () => any;
  skip: () => any;
}

const OnBoarding = ({ done, skip }: IBoardingProps) => {
  const boardingPages: Page[] = [
    {
      image: <Animation source={sunCloud} autoPlay loop />,
      title: (
        <Title fontSize="23px" fontFamily="Raleway-SemiBold" align="center">
          {translate("components.onBoarding.screens.first.title")}
        </Title>
      ),
      subtitle: translate("components.onBoarding.screens.first.content", {
        country: RNLocalize.getCountry(),
      }),
      backgroundColor: "#efefef",
    },
    {
      image: <Animation source={badWeather} autoPlay loop />,
      title: (
        <Title
          color="#fff"
          fontSize="23px"
          fontFamily="Raleway-SemiBold"
          align="center"
        >
          {translate("components.onBoarding.screens.second.title")}
        </Title>
      ),
      subtitle: translate("components.onBoarding.screens.second.content"),
      backgroundColor: "#1b7eff",
    },
    {
      image: <Animation source={umbrella} autoPlay loop />,
      title: (
        <Title fontSize="23px" fontFamily="Raleway-SemiBold" align="center">
          {translate("components.onBoarding.screens.third.title")}
        </Title>
      ),
      subtitle: translate("components.onBoarding.screens.third.content"),
      backgroundColor: "#ffc115",
    },
  ];

  return (
    <Boarding
      pages={boardingPages}
      bottomBarColor="#506ae9"
      controlStatusBar={false}
      subTitleStyles={{
        fontFamily: "Raleway-Regular",
        fontSize: 18,
      }}
      skipLabel={translate("components.onBoarding.buttons.skip")}
      nextLabel={translate("components.onBoarding.buttons.next")}
      onDone={done}
      onSkip={skip}
      bottomBarHighlight
      containerStyles={{ padding: 10 }}
      transitionAnimationDuration={250}
      showDone
    />
  );
};

export default OnBoarding;
