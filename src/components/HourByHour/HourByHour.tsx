import { format, getHours, isBefore, isTomorrow, parseISO } from "date-fns";
import { isToday } from "date-fns/esm";
import React, { memo } from "react";
import Feather from "react-native-vector-icons/Feather";
import {
  HourByHourCard,
  HourByHourChanceRain,
  HourByHourIcon,
  HourByHourTemperature,
  HourByHourTime,
} from "./styles";

interface IHourByHour {
  fore: any;
  date: string;
}

const HourByHour = ({ fore, date }: IHourByHour) => {
  const isValidHour =
    !isTomorrow(parseISO(date)) &&
    !isBefore(parseISO(fore.time), new Date()) &&
    getHours(parseISO(fore.time)) !== new Date().getHours();

  if (!isValidHour) return null;

  return (
    <HourByHourCard>
      <HourByHourIcon
        source={{
          uri: "https:" + fore.condition.icon,
          priority: "high",
        }}
      />
      <HourByHourTemperature>{Math.round(fore.temp_c)}°C</HourByHourTemperature>
      <HourByHourTime>{format(parseISO(fore.time), "HH:mm")}</HourByHourTime>
      <HourByHourChanceRain>
        <Feather name="cloud-rain" size={18} /> {fore.chance_of_rain}%
      </HourByHourChanceRain>
    </HourByHourCard>
  );
};

export default memo(HourByHour);
