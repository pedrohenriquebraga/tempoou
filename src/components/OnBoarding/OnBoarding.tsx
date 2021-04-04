import React from "react";
import { StatusBar } from "react-native";
import Boarding, { Page } from "react-native-onboarding-swiper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import badWeather from "../../animations/onBoarding/bad-weather.json";
import sunCloud from "../../animations/onBoarding/sun-cloud.json";
import umbrella from "../../animations/onBoarding/umbrella.json";
import { Title } from "../Custom/Custom";
import { Animation, DoneButton } from "./styles";

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
          Bem-vindo ao Tempoou!
        </Title>
      ),
      subtitle:
        "Aqui você recebe informações sobre a previsão do tempo de qualquer cidade do Brasil e do mundo!",
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
          Saiba a previsão certa!
        </Title>
      ),
      subtitle:
        "Com o Tempoou você pode sempre pode confiar na previsão sempre atualizada!",
      backgroundColor: "#1b7eff",
    },
    {
      image: <Animation source={umbrella} autoPlay loop />,
      title: (
        <Title fontSize="23px" fontFamily="Raleway-SemiBold" align="center">
          Aproveite todos os recursos de graça!
        </Title>
      ),
      subtitle:
        "Aproveite todos os recursos que o Tempoou pode te oferecer totalmente de graça!",
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
      skipLabel="Pular"
      nextLabel="Próximo"
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
