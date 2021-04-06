import { Dimensions } from "react-native";
import styled from "styled-components/native";
import FastImage from "react-native-fast-image";

export const Container = styled.ScrollView`
  width: ${Dimensions.get("screen").width}px;
  height: ${Dimensions.get("screen").height}px;
  flex: 1;
`;

export const CityTitle = styled.Text`
  text-align: center;
  font-family: Raleway-Bold;
  font-size: 23px;
  margin: 20px 0;
  color: #fff;
`;

export const CurrentlyForecastContainer = styled.View`
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

export const HourByHourScroll = styled.ScrollView``;

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

export const CurrentlyForecastIcon = styled(FastImage)`
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

export const NextDaysForecastScroll = styled.View`
  height: 100%;
`;

export const DetailsContainer = styled(NextDaysForecastContainer)`
  padding: 20px 0;
`;

export const DetailBar = styled.View`
  flex-direction: row;
  justify-content: space-between;

  padding: 10px;
  margin-bottom: 5px;
`;

export const DetailTitle = styled(InfoCardTitle)``;

export const DetailValue = styled(InfoCardValue)``;
