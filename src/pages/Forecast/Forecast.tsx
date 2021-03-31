import { useNavigation, useRoute } from "@react-navigation/core";
import { format, getHours, isBefore, parseISO } from "date-fns";
import React, { memo, useEffect, useState } from "react";
import { Alert, Dimensions, ScrollView, View } from "react-native";
import {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import Loading from "../../components/Loading/Loading";
import config from "../../config.json";
import api from "../../services/api";
import { IForecast } from "../../ts/interfaces/IForecast";
import { transformTime } from "../../utils/time";
import {
    CityTitle,
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
    NextDaysCard,
    NextDaysDay,
    NextDaysForecastContainer,
    NextDaysForecastScroll,
    NextDaysIcon,
    NextDaysMinMaxContainer,
    NextDaysMinMaxTemp,
    NextDaysTitle,
} from "./styles";

const Forecast: React.FC = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const [forecast, setForecast] = useState<IForecast>();
    const { city } = route.params as { city: string };

    const containerPosition = useSharedValue(Dimensions.get("screen").width);
    const currentlyForecastPosition = useSharedValue(
        -Dimensions.get("screen").height / 2
    );

    const containerAnimation = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: containerPosition.value }],
        };
    });

    const currentlyAnimation = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: currentlyForecastPosition.value }],
        };
    });

    useEffect(() => {
        api.get(
            `/forecast.json?key=${config.apikey}&q=${city}&days=3&aqi=yes&alerts=no&lang=pt`
        )
            .then((response) => {
                setForecast(response.data);
                containerPosition.value = withTiming(
                    0,
                    {
                        duration: 800,
                        easing: Easing.elastic(1),
                    },
                    () => {
                        currentlyForecastPosition.value = withTiming(0, {
                            duration: 350,
                            easing: Easing.linear,
                        });
                    }
                );
            })
            .catch((err) => {
                Alert.alert(
                    "Cidade não encontrada!",
                    `A cidade "${city}" não foi encontrada!`
                );
                return navigation.navigate("Home");
            });
    }, []);

    if (!forecast)
        return <Loading message={`Previsão do Tempo de ${city}...`} />;

    return (
        <Container style={containerAnimation}>
            <CurrentlyForecastContainer style={currentlyAnimation}>
                <CityTitle>
                    <Feather name="map-pin" size={20} /> {city}
                </CityTitle>
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
                        .map((fore, index) => {
                            return (
                                <NextDaysCard key={index}>
                                    <NextDaysDay>
                                        {format(parseISO(fore.date), "dd/MM")}
                                    </NextDaysDay>
                                    <NextDaysMinMaxContainer>
                                        <NextDaysMinMaxTemp>
                                            <Feather
                                                name="thermometer"
                                                size={16}
                                            />{" "}
                                            {Math.round(fore.day.mintemp_c)}°C/
                                            {Math.round(fore.day.maxtemp_c)}°C
                                        </NextDaysMinMaxTemp>
                                    </NextDaysMinMaxContainer>
                                    <NextDaysIcon
                                        source={{
                                            uri:
                                                "https:" +
                                                fore.day.condition.icon,
                                        }}
                                    />
                                </NextDaysCard>
                            );
                        })}
                </NextDaysForecastScroll>
            </NextDaysForecastContainer>
        </Container>
    );
};

export default memo(Forecast);
