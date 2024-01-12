export function convertUnixTimestampToDateTime(unixTimestamp: number): string {
  const date = new Date(unixTimestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds
  const options: Intl.DateTimeFormatOptions = {
    // weekday: "long",
    // year: "numeric",
    // month: "long",
    // day: "numeric",
    hour: "numeric",
    minute: "numeric",
    // second: "numeric",
    // timeZoneName: "short",
  };

  return date.toLocaleString("en-US", options);
}
