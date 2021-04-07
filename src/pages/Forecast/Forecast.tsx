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
import Fontisto from "react-native-vector-icons/Fontisto";
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
  DetailBar,
  DetailsContainer,
  DetailTitle,
  DetailValue,
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
import { format, parseISO } from "date-fns/esm";
import { translate } from "../../translations";
import I18n from "i18n-js";

const Forecast: React.FC = () => {
  const [showedAd, setShowedAd] = useState(false);
  const [forecast, setForecast] = useState<IForecast>();

  const route = useRoute();
  const navigation = useNavigation();
  const { city } = route.params as { city: string };
  const interstitial = InterstitialAd.createForAdRequest(
    GetAdId(AdTypes.INTERSTITIAL)
  );

  interstitial.onAdEvent((type) => {
    if (type === AdEventType.LOADED && !showedAd) {
      interstitial.show({
        immersiveModeEnabled: true,
      });
    }

    return setShowedAd(true);
  });

  useEffect(() => {
    api
      .get(
        `/forecast.json?key=${API_KEY}&q=${city}&days=3&aqi=yes&alerts=no&lang=${I18n.currentLocale()}`
      )
      .then((response) => {
        interstitial.load();
        setForecast(response.data);
      })
      .catch((err) => {
        Alert.alert(
          translate("forecast.alerts.cityNotFound.title"),
          translate("forecast.alerts.cityNotFound.content", { city })
        );
        return navigation.navigate("Home");
      });
  }, []);

  if (!forecast) {
    return (
      <Loading
        message={translate("loadings.getCityForecast", { city })}
        showInterstitialAd
      />
    );
  }

  return (
    <Container>
      <Title
        fontSize="15px"
        margin="10px 5px -5px 10px"
        fontFamily="Raleway-Regular"
        align="right"
      >
        {translate("forecast.updatedAt", {
          time: format(parseISO(forecast.current.last_updated), "HH:mm"),
        })}
      </Title>
      <CurrentlyForecastContainer>
        <Title fontSize="20px" color="white" align="center" margin="20px 0">
          <Feather name="map-pin" size={20} /> {forecast.location.name}
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
            {translate("forecast.feelsLike", {
              temp: Math.round(forecast.current.feelslike_c),
            })}
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
            <Feather name="wind" size={18} /> {translate("forecast.wind")}
          </InfoCardTitle>
          <InfoCardValue>
            {Math.round(forecast.current.wind_kph)} Km/h
          </InfoCardValue>
        </View>
        <View>
          <InfoCardTitle>
            <Ionicons name="water-outline" size={16} color="#5773ff" />{" "}
            {translate("forecast.humidity")}
          </InfoCardTitle>
          <InfoCardValue>{forecast.current.humidity}%</InfoCardValue>
        </View>
        <View>
          <InfoCardTitle>
            <Feather name="eye" size={18} /> {translate("forecast.visibility")}
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
          {translate("forecast.forecastHourByHour")}
        </Title>
        <ScrollView horizontal>
          {forecast.forecast.forecastday.map((forecast) => {
            const date = forecast.date;

            return forecast.hour.map((fore, index) => {
              return <HourByHour fore={fore} key={index} date={date} />;
            });
          })}
        </ScrollView>
      </HourByHourContainer>
      <ExtraInfos>
        <View>
          <InfoCardTitle>
            <Feather name="sunrise" size={18} color="#fcca27" />{" "}
            {translate("forecast.sunrise")}
          </InfoCardTitle>
          <InfoCardValue>
            {transformTime(forecast.forecast.forecastday[0].astro.sunrise)}
          </InfoCardValue>
        </View>
        <View>
          <InfoCardTitle>
            <Feather name="sunset" size={18} color="#ffc400" />{" "}
            {translate("forecast.sunset")}
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

      <DetailsContainer>
        <Title
          align="center"
          fontSize="20px"
          fontFamily="Raleway-Regular"
          margin="0px 0px 10px 0px"
        >
          {translate("forecast.details")}
        </Title>
        <View>
          <DetailBar>
            <DetailTitle>
              <Feather name="thermometer" size={20} color="#f00" />{" "}
              {translate("forecast.minMaxTemp")}
            </DetailTitle>
            <DetailValue>
              {Math.round(forecast.forecast.forecastday[0].day.mintemp_c)}°C/
              {Math.round(forecast.forecast.forecastday[0].day.maxtemp_c)}°C
            </DetailValue>
          </DetailBar>
          <DetailBar>
            <DetailTitle>
              <Ionicons name="water-outline" size={20} color="#5773ff" />{" "}
              {translate("forecast.precipitation")}
            </DetailTitle>
            <DetailValue>
              {forecast.forecast.forecastday[0].day.totalprecip_mm.toFixed(2)}{" "}
              mm
            </DetailValue>
          </DetailBar>
          <DetailBar>
            <DetailTitle>
              <Fontisto name="day-sunny" size={20} color="#ffc400" />{" "}
              {translate("forecast.UV")}
            </DetailTitle>
            <DetailValue>{forecast.current.uv}</DetailValue>
          </DetailBar>
          <DetailBar>
            <DetailTitle>
              <Fontisto name="wind" size={20} /> {translate("forecast.gust")}
            </DetailTitle>
            <DetailValue>{forecast.current.gust_kph} Km/h</DetailValue>
          </DetailBar>
          <DetailBar>
            <DetailTitle>
              <Fontisto name="rains" size={20} />{" "}
              {translate("forecast.chanceRain")}
            </DetailTitle>
            <DetailValue>
              {forecast.forecast.forecastday[0].day.daily_chance_of_rain}%
            </DetailValue>
          </DetailBar>
          <DetailBar>
            <DetailTitle>
              <Feather name="cloud-snow" size={20} />{" "}
              {translate("forecast.chanceSnow")}
            </DetailTitle>
            <DetailValue>
              {forecast.forecast.forecastday[0].day.daily_chance_of_snow}%
            </DetailValue>
          </DetailBar>
        </View>
      </DetailsContainer>
      <DetailsContainer>
        <Title
          align="center"
          fontSize="20px"
          fontFamily="Raleway-Regular"
          margin="0px 0px 10px 0px"
        >
          {translate("forecast.airQuality")}
        </Title>
        <DetailBar>
          <DetailTitle>CO</DetailTitle>
          <DetailValue>
            {forecast.current.air_quality.co.toFixed(2)} ppm
          </DetailValue>
        </DetailBar>
        <DetailBar>
          <DetailTitle>NO2</DetailTitle>
          <DetailValue>
            {forecast.current.air_quality.no2.toFixed(2)} ug/m³
          </DetailValue>
        </DetailBar>
        <DetailBar>
          <DetailTitle>O3</DetailTitle>
          <DetailValue>
            {forecast.current.air_quality.o3.toFixed(2)} ug/m³
          </DetailValue>
        </DetailBar>
        <DetailBar>
          <DetailTitle>SO2</DetailTitle>
          <DetailValue>
            {forecast.current.air_quality.so2.toFixed(2)} ug/m³
          </DetailValue>
        </DetailBar>
        <DetailBar>
          <DetailTitle>PM10</DetailTitle>
          <DetailValue>
            {forecast.current.air_quality.pm10.toFixed(2)} ug/m³
          </DetailValue>
        </DetailBar>
        <DetailBar>
          <DetailTitle>PM2.5</DetailTitle>
          <DetailValue>
            {forecast.current.air_quality.pm2_5.toFixed(2)} ug/m³
          </DetailValue>
        </DetailBar>
      </DetailsContainer>
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
          {translate("forecast.nextDays", {
            amount: forecast.forecast.forecastday.slice(1).length,
          })}
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
