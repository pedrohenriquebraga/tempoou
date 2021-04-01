import { API_KEY } from "@env";
import {
  AdEventType,
  BannerAd,
  BannerAdSize,
  InterstitialAd,
} from "@react-native-firebase/admob";
import { useNavigation, useRoute } from "@react-navigation/core";
import React, { memo, useEffect, useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Title } from "../../components/Custom/Custom";
import HourByHour from "../../components/HourByHour/HourByHour";
import Loading from "../../components/Loading/Loading";
import NextDay from "../../components/NextDaysCard/NextDaysCard";
import api from "../../services/api";
import { IForecast } from "../../ts/interfaces/IForecast";
import { AdTypes, GetAdId } from "../../utils/ads";
import { transformTime } from "../../utils/time";
import {
  Container,
  CurrentlyForecastContainer,
  CurrentlyForecastIcon,
  CurrentlyForecastLeftContent,
  CurrentlyForecastRightContent,
  ExtraInfos,
  ForecastFeelsLikeTemperature,
  ForecastInfo,
  ForecastTemperature,
  HourByHourContainer,
  InfoCardTitle,
  InfoCardValue,
  NextDaysForecastContainer,
  NextDaysForecastScroll,
} from "./styles";

const Forecast: React.FC = () => {
  const [showedAd, setShowedAd] = useState(false);
  const [forecast, setForecast] = useState<IForecast>();
  const route = useRoute();
  const navigation = useNavigation();
  const { city } = route.params as { city: string };

  const interstitial = InterstitialAd.createForAdRequest(
    GetAdId(AdTypes.INTERSTICIAL)
  );

  interstitial.onAdEvent((type) => {
    if (type === AdEventType.LOADED && !showedAd) {
      return interstitial.show({
        immersiveModeEnabled: true,
      });
    }

    if (type === AdEventType.OPENED) {
      return setShowedAd(true);
    }

    if (type === AdEventType.CLOSED) {
      return setShowedAd(true);
    }
  });

  useEffect(() => {
    api
      .get(
        `/forecast.json?key=${API_KEY}&q=${city}&days=3&aqi=yes&alerts=no&lang=pt`
      )
      .then((response) => {
        interstitial.load();
        setForecast(response.data);
      })
      .catch((err) => {
        Alert.alert(
          "Cidade não encontrada!",
          `A cidade "${city}" não foi encontrada!`
        );
        return navigation.navigate("Home");
      });
  }, []);

  if (!forecast) {
    return (
      <Loading message={`Previsão do Tempo de ${city}...`} showInterstitialAd />
    );
  }

  return (
    <Container>
      <CurrentlyForecastContainer>
        <Title fontSize="20px" color="white" align="center" margin="20px 0">
          <Feather name="map-pin" size={20} /> {city}
        </Title>
        <CurrentlyForecastLeftContent>
          <CurrentlyForecastIcon
            source={{
              uri: "https:" + forecast.current.condition.icon,
              priority: "high",
            }}
          />
          <ForecastInfo>{forecast.current.condition.text}</ForecastInfo>
        </CurrentlyForecastLeftContent>
        <CurrentlyForecastRightContent>
          <ForecastTemperature>
            {Math.round(forecast.current.temp_c)}°C
          </ForecastTemperature>
          <ForecastFeelsLikeTemperature>
            Sensação térmica: {"\n"} {Math.round(forecast.current.feelslike_c)}
            °C
          </ForecastFeelsLikeTemperature>
        </CurrentlyForecastRightContent>
      </CurrentlyForecastContainer>
      <BannerAd
        unitId={GetAdId(AdTypes.BANNER)}
        size={BannerAdSize.ADAPTIVE_BANNER}
        onAdClosed={() => {}}
        onAdOpened={() => {}}
        onAdFailedToLoad={() => {}}
        onAdLoaded={() => {}}
        onAdLeftApplication={() => {}}
      />
      <ExtraInfos>
        <View>
          <InfoCardTitle>
            <Feather name="wind" size={18} /> Vento
          </InfoCardTitle>
          <InfoCardValue>
            {Math.round(forecast.current.wind_kph)} Km/h
          </InfoCardValue>
        </View>
        <View>
          <InfoCardTitle>
            <Ionicons name="water-outline" size={16} /> Umidade
          </InfoCardTitle>
          <InfoCardValue>{forecast.current.humidity}%</InfoCardValue>
        </View>
        <View>
          <InfoCardTitle>
            <Feather name="eye" size={18} /> Visibilidade
          </InfoCardTitle>
          <InfoCardValue>
            {Math.floor(forecast.current.vis_km)} km
          </InfoCardValue>
        </View>
      </ExtraInfos>
      <HourByHourContainer>
        <Title
          align="center"
          fontSize="20px"
          fontFamily="Raleway-Regular"
          margin="0px 0px 10px 0px"
        >
          Previsão para hoje
        </Title>
        <ScrollView horizontal>
          {forecast.forecast.forecastday[0].hour.map((fore, index: number) => (
            <HourByHour fore={fore} key={index} />
          ))}
        </ScrollView>
      </HourByHourContainer>
      <ExtraInfos>
        <View>
          <InfoCardTitle>
            <Feather name="sunrise" size={18} /> Nascer do Sol
          </InfoCardTitle>
          <InfoCardValue>
            {transformTime(forecast.forecast.forecastday[0].astro.sunrise)}
          </InfoCardValue>
        </View>
        <View>
          <InfoCardTitle>
            <Feather name="sunset" size={18} /> Pôr do Sol
          </InfoCardTitle>
          <InfoCardValue>
            {transformTime(forecast.forecast.forecastday[0].astro.sunset)}
          </InfoCardValue>
        </View>
      </ExtraInfos>
      <BannerAd
        unitId={GetAdId(AdTypes.BANNER)}
        size={BannerAdSize.ADAPTIVE_BANNER}
        onAdClosed={() => {}}
        onAdOpened={() => {}}
        onAdFailedToLoad={() => {}}
        onAdLoaded={() => {}}
        onAdLeftApplication={() => {}}
      />
      <NextDaysForecastContainer>
        <Title
          fontFamily="Raleway-SemiBold"
          fontSize="20px"
          align="center"
          margin="20px 0"
        >
          Próximos 2 dias
        </Title>
        <NextDaysForecastScroll>
          {forecast.forecast.forecastday.slice(1).map((fore, index) => (
            <NextDay key={index} fore={fore} />
          ))}
        </NextDaysForecastScroll>
      </NextDaysForecastContainer>
    </Container>
  );
};

export default memo(Forecast);
