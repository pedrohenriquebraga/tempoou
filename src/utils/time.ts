enum TimeTypes {
  SECOND = "SECOND",
  MINUTE = "MINUTE",
  HOUR = "HOUR",
}

function transformTime(time: string): string {
  const timeArray = time.toUpperCase().split(" ");
  const separatedTime = timeArray[0].split(":");
  const hours = separatedTime[0].replace("0", "");
  const minutes = separatedTime[1];
  const period = timeArray[1];

  if (period === "AM") {
    if (hours == "12") return `00:${minutes.padStart(2, "0")}`;
    return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
  } else {
    return `${String(Number(hours) + 12).padStart(2, "0")}:${minutes.padStart(
      2,
      "0"
    )}`;
  }
}

function transformToMS(
  time: number | string,
  timeType?: TimeTypes,
  roundTime = true
): number {
  let validTime = Number(time);
  if (roundTime) {
    validTime = Math.round(validTime);
  }

  if (!validTime) throw new Error("Parameter 'time' not is valid!");

  switch (timeType) {
    case "SECOND":
      return validTime * 1000;
    case "MINUTE":
      return validTime * 60 * 1000;
    case "HOUR":
      return validTime * 60 * 60 * 1000;
    default:
      return validTime * 1000;
  }
}

export { transformTime, transformToMS, TimeTypes };
