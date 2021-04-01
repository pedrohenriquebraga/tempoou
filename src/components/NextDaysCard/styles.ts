import styled from "styled-components/native";
import FastImage from "react-native-fast-image";

export const NextDaysCard = styled.View`
  margin: 10px 10px;
  background: #efefef;
  padding: 20px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  border-radius: 15px;

  elevation: 2;
`;

export const NextDaysDay = styled.Text`
  font-family: Raleway-SemiBold;
  font-size: 16px;
`;

export const NextDaysMinMaxContainer = styled.View``;

export const NextDaysMinMaxTemp = styled.Text`
  font-family: Raleway-Regular;
  font-size: 16px;
`;

export const NextDaysIcon = styled(FastImage)`
  width: 50px;
  height: 50px;
`;
