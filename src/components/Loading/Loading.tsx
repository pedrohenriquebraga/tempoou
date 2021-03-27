import React from "react";
import LoadingAnimation from "../../animations/loading.json";
import { AnimationContainer, Container, MessageText } from "./styles";

interface ILoadingProps {
    message: string;
}

const Loading = ({ message }: ILoadingProps) => {
    return (
        <Container>
            <AnimationContainer source={LoadingAnimation} autoPlay loop />
            <MessageText>{message}</MessageText>
        </Container>
    );
};

export default Loading;
