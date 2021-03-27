import storage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import geo from "react-native-geocoder";
import location from "react-native-location";
import Feather from "react-native-vector-icons/Feather";
import background from "../../images/background.jpg";
import {
    Background,
    Button,
    ButtonText,
    Container,
    FormContainer,
    GetLocationButton,
    Input,
    InputContainer,
    Label,
    SearchContainer,
    Title,
} from "./styles";

const Home: React.FC = () => {
    const navigation = useNavigation();
    const [city, setCity] = useState("");

    useEffect(() => {
        storage.getItem("@city", (err, result) => {
            if (err) return;
            return setCity(result);
        });
    }, []);

    async function handleGetCurrentlyCity() {
        const status = await location.checkPermission({
            ios: "whenInUse",
            android: {
                detail: "fine",
            },
        });

        if (!status) {
            const permission = await location.requestPermission({
                ios: "whenInUse",
                android: {
                    detail: "fine",
                    rationale: {
                        title: "Preciso de sua Localização",
                        message:
                            "Preciso de sua localização para obter sua cidade",
                        buttonPositive: "Aceitar",
                        buttonNegative: "Recusar",
                    },
                },
            });

            if (!permission) {
                return Alert.alert(
                    "Preciso de permissão!",
                    "Preciso da sua localização para obter a cidade!"
                );
            }
        }

        const { latitude, longitude } = await location.getLatestLocation({
            timeout: 1000,
        });

        if (!(latitude && longitude)) {
            return Alert.alert(
                "Não foi possível obter a cidade!",
                "Tente novamente em alguns segundos!"
            );
        }

        const { locality } = await geo.geocodePosition({ latitude, longitude });
        return setCity(locality);
    }

    async function handleForecastNavigate() {
        if (!city)
            return Alert.alert(
                "Informe uma cidade!",
                "Preciso de uma cidade para que consiga obter a previsão do tempo!"
            );

        await storage.setItem("@city", city);
        return navigation.navigate("Forecast", { city });
    }

    return (
        <Container>
            <Background source={background} resizeMode="stretch">
                <SearchContainer>
                    <Title>
                        <Feather name="cloud-rain" size={25} /> Veja a previsão
                        do tempo
                    </Title>
                    <FormContainer>
                        <InputContainer>
                            <Label>Nome da cidade</Label>
                            <Input
                                placeholder="Digite sua cidade"
                                placeholderTextColor="#444"
                                value={city}
                                onChangeText={setCity}
                            />
                            <Button onPress={handleForecastNavigate}>
                                <ButtonText>
                                    <Feather name="search" size={20} />{" "}
                                    Pesquisar
                                </ButtonText>
                            </Button>
                            <GetLocationButton onPress={handleGetCurrentlyCity}>
                                <ButtonText color="#5773ff">
                                    <Feather name="map-pin" size={20} /> Obter
                                    cidade atual
                                </ButtonText>
                            </GetLocationButton>
                        </InputContainer>
                    </FormContainer>
                </SearchContainer>
            </Background>
        </Container>
    );
};

export default Home;
