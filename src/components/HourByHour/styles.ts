import styled from "styled-components/native";
import FastImage from "react-native-fast-image";

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

export const HourByHourIcon = styled(FastImage)`
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
