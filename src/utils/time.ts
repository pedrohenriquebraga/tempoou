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
        return `${String(Number(hours) + 12).padStart(
            2,
            "0"
        )}:${minutes.padStart(2, "0")}`;
    }
}

export { transformTime };
