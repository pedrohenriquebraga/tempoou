import { Dimensions } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import styled from "styled-components/native";

interface IButtonText {
  color?: string;
}

export const Container = styled.View`
  width: ${Dimensions.get("screen").width}px;
  height: ${Dimensions.get("screen").height}px;
  align-items: center;
`;

export const SearchContainer = styled.View`
  background: #fff;
  width: ${Dimensions.get("screen").width - 20}px;
  border-radius: 20px;
  padding: 12px;
`;

export const Background = styled.ImageBackground`
  position: relative;
  width: 100%;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Label = styled.Text`
  font-size: 18px;
  font-family: Raleway-SemiBold;
  margin-bottom: 5px;
  text-align: center;
`;

export const InputContainer = styled.View`
  width: 100%;
  padding: 10px;
`;

export const Input = styled.TextInput`
  color: #444;
  border: 1px solid #5773ff;
  border-radius: 12px;
  font-size: 18px;
  font-family: Raleway-Regular;
  width: 100%;
  padding: 16px;
  text-align: center;
`;

export const Button = styled(RectButton)`
  padding: 20px;
  text-align: center;
  background: #5773ff;
  color: #fff;
  margin-top: 10px;
  border-radius: 12px;
`;

export const FormContainer = styled.View`
  margin-top: 10px;
`;

export const ButtonText = styled.Text<IButtonText>`
  text-align: center;
  color: ${(props) => props.color || "#fff"};
  font-size: 18px;
  font-family: Raleway-SemiBold;
`;
