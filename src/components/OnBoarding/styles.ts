import styled from "styled-components/native";
import Lottie from "lottie-react-native";
import { RectButton } from "react-native-gesture-handler";

export const Animation = styled(Lottie)`
  width: 300px;
  height: 300px;
  margin-bottom: -50px;
`;

export const DoneButton = styled(RectButton)`
  margin: 0px 10px;
`;
