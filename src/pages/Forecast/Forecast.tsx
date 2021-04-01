import { API_KEY } from "@env";
import {
    AdEventType,
    BannerAd,
    BannerAdSize,
    InterstitialAd,
    TestIds,
} from "@react-native-firebase/admob";
import { useNavigation, useRoute } from "@react-navigation/core";
import { format, getHours, isBefore, parseISO } from "date-fns";
import React, { useEffect, useState, memo } from "react";
import { Alert, ScrollView, View } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Title } from "../../components/Custom/Custom";
import Loading from "../../components/Loading/Loading";
import NextDay from "../../components/NextDaysCard/NextDaysCard";
import api from "../../services/api";
import { IForecast } from "../../ts/interfaces/IForecast";
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
    HourByHourCard,
    HourByHourChanceRain,
    HourByHourContainer,
    HourByHourIcon,
    HourByHourTemperature,
    HourByHourTime,
    HourByHourTitle,
    InfoCardTitle,
    InfoCardValue,
    NextDaysForecastContainer,
    NextDaysForecastScroll,
    NextDaysTitle,
} from "./styles";

const Forecast: React.FC = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const [forecast, setForecast] = useState<IForecast>();
    const [showedAd, setShowedAd] = useState(false);
    const { city } = route.params as { city: string };

    useEffect(() => {
        api.get(
            `/forecast.json?key=${API_KEY}&q=${city}&days=3&aqi=yes&alerts=no&lang=pt`
        )
            .then((response) => {
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
            <Loading
                message={`Previsão do Tempo de ${city}...`}
                showInterstitialAd
            />
        );
    }

    return (
        <Container>
            <CurrentlyForecastContainer>
                <Title fontSize="20px">
                    <Feather name="map-pin" size={20} /> {city}
                </Title>
                <CurrentlyForecastLeftContent>
                    <CurrentlyForecastIcon
                        source={{
                            uri: "https:" + forecast.current.condition.icon,
                        }}
                    />
                    <ForecastInfo>
                        {forecast.current.condition.text}
                    </ForecastInfo>
                </CurrentlyForecastLeftContent>
                <CurrentlyForecastRightContent>
                    <ForecastTemperature>
                        {Math.round(forecast.current.temp_c)}°C
                    </ForecastTemperature>
                    <ForecastFeelsLikeTemperature>
                        Sensação térmica: {"\n"}{" "}
                        {Math.round(forecast.current.feelslike_c)}
                        °C
                    </ForecastFeelsLikeTemperature>
                </CurrentlyForecastRightContent>
            </CurrentlyForecastContainer>
            <BannerAd
                unitId={TestIds.BANNER}
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
                <HourByHourTitle>Previsão para hoje</HourByHourTitle>
                <ScrollView horizontal>
                    {forecast.forecast.forecastday[0].hour.map(
                        (fore, index: number) => {
                            if (
                                isBefore(parseISO(fore.time), new Date()) &&
                                getHours(parseISO(fore.time)) !==
                                    new Date().getHours()
                            )
                                return;
                            return (
                                <HourByHourCard key={index}>
                                    <HourByHourIcon
                                        source={{
                                            uri: "https:" + fore.condition.icon,
                                        }}
                                    />
                                    <HourByHourTemperature>
                                        {Math.round(fore.temp_c)}°C
                                    </HourByHourTemperature>
                                    <HourByHourTime>
                                        {format(parseISO(fore.time), "HH:mm")}
                                    </HourByHourTime>
                                    <HourByHourChanceRain>
                                        <Feather name="cloud-rain" size={18} />{" "}
                                        {fore.chance_of_rain}%
                                    </HourByHourChanceRain>
                                </HourByHourCard>
                            );
                        }
                    )}
                </ScrollView>
            </HourByHourContainer>
            <ExtraInfos>
                <View>
                    <InfoCardTitle>
                        <Feather name="sunrise" size={18} /> Nascer do Sol
                    </InfoCardTitle>
                    <InfoCardValue>
                        {transformTime(
                            forecast.forecast.forecastday[0].astro.sunrise
                        )}
                    </InfoCardValue>
                </View>
                <View>
                    <InfoCardTitle>
                        <Feather name="sunset" size={18} /> Pôr do Sol
                    </InfoCardTitle>
                    <InfoCardValue>
                        {transformTime(
                            forecast.forecast.forecastday[0].astro.sunset
                        )}
                    </InfoCardValue>
                </View>
            </ExtraInfos>
            <NextDaysForecastContainer>
                <NextDaysTitle>Próximos 2 dias</NextDaysTitle>
                <NextDaysForecastScroll>
                    {forecast.forecast.forecastday
                        .slice(1)
                        .map((fore, index) => (
                            <NextDay key={index} fore={fore} />
                        ))}
                </NextDaysForecastScroll>
            </NextDaysForecastContainer>
        </Container>
    );
};

export default memo(Forecast);
