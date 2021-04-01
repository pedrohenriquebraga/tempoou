import { format, parseISO } from "date-fns";
import React, { memo } from "react";
import Feather from "react-native-vector-icons/Feather";
import {
  NextDaysCard,
  NextDaysDay,
  NextDaysIcon,
  NextDaysMinMaxContainer,
  NextDaysMinMaxTemp,
} from "./styles";

interface INextDay {
  fore: any;
}

const NextDay = ({ fore }: INextDay) => {
  return (
    <NextDaysCard key={Math.random()}>
      <NextDaysDay>{format(parseISO(fore.date), "dd/MM")}</NextDaysDay>
      <NextDaysMinMaxContainer>
        <NextDaysMinMaxTemp>
          <Feather name="thermometer" size={16} />{" "}
          {Math.round(fore.day.mintemp_c)}°C/
          {Math.round(fore.day.maxtemp_c)}°C
        </NextDaysMinMaxTemp>
      </NextDaysMinMaxContainer>
      <NextDaysIcon
        source={{
          uri: "https:" + fore.day.condition.icon,
          priority: "high",
        }}
      />
    </NextDaysCard>
  );
};

export default memo(NextDay);
