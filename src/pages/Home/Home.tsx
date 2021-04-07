import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/core";
import storage from "@react-native-async-storage/async-storage";
import Feather from "react-native-vector-icons/Feather";
import background from "../../images/background.jpg";
import { Title } from "../../components/Custom/Custom";
import {
  Background,
  Button,
  ButtonText,
  Container,
  FormContainer,
  Input,
  InputContainer,
  Label,
  SearchContainer,
} from "./styles";

import { BannerAd, BannerAdSize } from "@react-native-firebase/admob";
import { GetAdId, AdTypes } from "../../utils/ads";
import { translate } from "../../translations/index";

const Home: React.FC = () => {
  const navigation = useNavigation();
  const [city, setCity] = useState("");

  useEffect(() => {
    storage.getItem("@city", (err, result) => {
      if (err) return;
      return setCity(result);
    });
  }, []);

  async function handleForecastNavigate() {
    if (!city)
      return Alert.alert(
        "Informe uma cidade!",
        "Preciso de uma cidade para que consiga obter a previsão do tempo!"
      );

    await storage.setItem("@city", city);
    return navigation.navigate("Forecast", { city });
  }

  return (
    <Container>
      <BannerAd
        unitId={GetAdId(AdTypes.BANNER)}
        size={BannerAdSize.ADAPTIVE_BANNER}
        onAdClosed={() => {}}
        onAdOpened={() => {}}
        onAdFailedToLoad={() => {}}
        onAdLoaded={() => {}}
        onAdLeftApplication={() => {}}
      />
      <Background source={background} resizeMode="stretch">
        <SearchContainer>
          <Title
            align="center"
            margin="20px 0px 0px 0px"
            fontSize="20px"
            fontFamily="Raleway-Regular"
          >
            <Feather name="cloud-rain" size={25} />{" "}
            {translate("home.mainTitle")}
          </Title>
          <FormContainer>
            <InputContainer>
              <Label>{translate("home.inputLabel")}</Label>
              <Input
                placeholder={translate("home.placeholders.inputCity")}
                placeholderTextColor="#666"
                value={city}
                onChangeText={setCity}
              />
              <Button onPress={handleForecastNavigate}>
                <ButtonText>
                  <Feather name="search" size={20} />{" "}
                  {translate("home.buttons.searchButton")}
                </ButtonText>
              </Button>
            </InputContainer>
          </FormContainer>
        </SearchContainer>
      </Background>
    </Container>
  );
};

export default Home;
