import styled from "styled-components/native";

interface ITitleProps {
    fontSize: string;
    fontFamily?: string;
    color?: string;
    margin?: string;
    padding?: string;
    align?: string;
}

export const Title = styled.Text<ITitleProps>`
    font-size: ${(props) => props.fontSize};
    font-family: ${(props) => props.fontFamily || "Raleway-Bold"};
    color: ${(props) => props.color || "#000"};
    margin: ${(props) => props.margin || "0px"};
    padding: ${(props) => props.padding || "0px"};
    text-align: ${(props) => props.align || "left"};
`;
