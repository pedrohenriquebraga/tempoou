import { Dimensions } from "react-native";
import styled from "styled-components/native";
import { AnimationContainer } from "../Loading/styles";

export const Container = styled.View`
    width: ${Dimensions.get("screen").width}px;
    height: ${Dimensions.get("screen").height}px;
    background: #fff;
    align-items: center;
    justify-content: center;
`;

export const Animation = styled(AnimationContainer)``;

export const MainMessage = styled.Text`
    font-size: 25px;
    font-family: Raleway-SemiBold;
    color: #666;
    text-align: center;
    margin-top: 5px;
`;

export const Message = styled.Text`
    text-align: center;
    font-size: 20px;
    font-family: Raleway-Regular;
`;
