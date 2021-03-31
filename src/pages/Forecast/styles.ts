import { Dimensions } from "react-native";
import Animated from "react-native-reanimated";
import styled from "styled-components/native";

export const Container = styled(Animated.ScrollView)`
    width: ${Dimensions.get("screen").width}px;
    height: ${Dimensions.get("screen").height}px;
    flex: 1;
`;

export const CurrentlyForecastContainer = styled(Animated.View)`
    position: relative;
    width: 98%;
    height: 300px;
    background: #5773ff;
    margin: 15px auto;
    border-radius: 15px;

    elevation: 3;
`;

export const ExtraInfos = styled.View`
    width: 98%;
    padding: 25px;
    background: #fff;
    margin: 0 auto;
    border-radius: 15px;
    flex-direction: row;
    justify-content: space-between;
    margin: 15px auto;

    elevation: 3;
`;

export const InfoCardTitle = styled.Text`
    font-family: Raleway-Regular;
    font-size: 16px;
    color: #888;
`;

export const InfoCardValue = styled.Text`
    font-family: Raleway-SemiBold;
    font-size: 18px;
`;

export const HourByHourContainer = styled.View`
    width: 98%;
    padding: 25px;
    background: #fff;
    margin: 0 auto;
    border-radius: 15px;

    elevation: 3;
`;

export const HourByHourTitle = styled.Text`
    text-align: center;
    font-size: 20px;
    font-family: Raleway-Regular;
    margin-bottom: 10px;
`;

export const HourByHourChanceRain = styled.Text`
    text-align: center;
    font-family: Raleway-SemiBold;
    font-size: 16px;
    color: #5773ff;
    margin-top: 3px;
`;

export const HourByHourCard = styled.View`
    margin-right: 15px;
`;

export const HourByHourIcon = styled.Image`
    width: 75px;
    height: 75px;
    margin: 0 auto;
`;

export const HourByHourTemperature = styled.Text`
    text-align: center;
    font-size: 22px;
    font-family: Raleway-Bold;
`;

export const HourByHourTime = styled.Text`
    text-align: center;
    color: #666;
    font-size: 18px;
    font-family: Raleway-Regular;
`;

export const CurrentlyForecastLeftContent = styled.View`
    position: absolute;
    left: 0;
    width: 49%;
    height: 100%;
    flex: 1;
    justify-content: center;
`;
export const CurrentlyForecastRightContent = styled.View`
    position: absolute;
    height: 100%;
    width: 49%;
    right: 0;
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 10px;
`;

export const CurrentlyForecastIcon = styled.Image`
    width: 130px;
    height: 130px;
    margin: 5px 10px;
`;
export const ForecastInfo = styled.Text`
    font-size: 22px;
    font-family: Raleway-SemiBold;
    margin: -15px 0 0 15px;
    color: #fff;
`;

export const ForecastTemperature = styled.Text`
    font-family: Raleway-SemiBold;
    font-size: 50px;
    color: #fff;
`;

export const ForecastFeelsLikeTemperature = styled.Text`
    font-family: Raleway-Regular;
    font-size: 16px;
    color: #fff;
    margin-top: 15px;
`;

export const NextDaysForecastContainer = styled.View`
    background: #fff;
    width: 98%;
    border-radius: 15px;
    margin: 10px auto;

    elevation: 3;
`;
export const NextDaysTitle = styled.Text`
    font-family: Raleway-SemiBold;
    font-size: 20px;
    text-align: center;
    margin: 20px 0;
`;

export const NextDaysForecastScroll = styled.View`
    height: 100%;
`;
