import { Dimensions } from "react-native";
import styled from "styled-components/native";
import Lottie from "lottie-react-native";

export const Container = styled.View`
    width: ${Dimensions.get("screen").width}px;
    height: ${Dimensions.get("screen").height}px;
    flex: 1;
    align-items: center;
    justify-content: center;
    background: #fff;
    padding: 12px;
`;

export const AnimationContainer = styled(Lottie)`
    width: 350px;
    height: 350px;
`;

export const MessageText = styled.Text`
    font-family: Raleway-SemiBold;
    font-size: 22px;
    color: #666;
    text-align: center;
`;
