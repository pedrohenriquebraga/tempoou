import { Dimensions } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
    width: ${Dimensions.get("screen").width}px;
    height: 65px;
    background: #fff;
    padding: 10px;
    elevation: 5;
    justify-content: flex-end;
    border-radius: 12px;
`;

export const HeaderTitle = styled.Text`
    color: #000;
    font-family: Raleway-SemiBold;
    font-size: 18px;
`;
export const Button = styled(RectButton)``;

export const HeaderContent = styled.View`
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: flex-end;
`;
