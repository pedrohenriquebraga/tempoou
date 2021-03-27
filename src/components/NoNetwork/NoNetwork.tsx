import React from "react";
import { Container, Animation, MainMessage, Message } from "./styles";
import NoNetworkAnimation from "../../animations/no-network.json";
import Feather from "react-native-vector-icons/Feather";

const NoNetwork: React.FC = () => {
    return (
        <Container>
            <Animation source={NoNetworkAnimation} autoPlay loop />
            <MainMessage>
                <Feather name="wifi-off" size={25} /> Sem internet!
            </MainMessage>
            <Message>
                Para usar nosso serviço é preciso de uma conexão a internet!
            </Message>
        </Container>
    );
};

export default NoNetwork;
