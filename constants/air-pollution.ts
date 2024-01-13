export function generateAirPollutionMessage(index: number) {
  if (index >= 1 && index <= 3) {
    return "Air quality is good. Enjoy the fresh air!";
  } else if (index >= 4 && index <= 6) {
    return "Moderate air pollution. Some precautions may be needed.";
  } else if (index >= 7 && index <= 9) {
    return "High air pollution levels. Take necessary precautions.";
  } else if (index === 10) {
    return "Severe air pollution. Avoid outdoor activities if possible.";
  } else {
    return "Invalid air pollution index. Please provide a value between 1 and 10.";
  }
}
