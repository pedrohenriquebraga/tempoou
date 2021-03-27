import React from "react";
import Feather from "react-native-vector-icons/Feather";
import { Button, Container, HeaderContent, HeaderTitle } from "./styles";
import { useNavigation } from "@react-navigation/core";

interface IHeaderProps {
    title: string;
}

const Header = ({ title }: IHeaderProps) => {
    const navigation = useNavigation();

    return (
        <Container>
            <HeaderContent>
                <HeaderTitle>{title}</HeaderTitle>
                <Button onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left" size={25} />
                </Button>
            </HeaderContent>
        </Container>
    );
};

export default Header;
