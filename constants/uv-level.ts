export function generateUVMessage(uvIndex: number) {
  if (uvIndex >= 0 && uvIndex <= 2) {
    return "Enjoy the sun safely.";
  } else if (uvIndex >= 3 && uvIndex <= 5) {
    return "Moderate. Use sunscreen.";
  } else if (uvIndex >= 6 && uvIndex <= 7) {
    return "High UV. Seek shade.";
  } else if (uvIndex >= 8 && uvIndex <= 10) {
    return "Very high UV! Limit sun exposure.";
  } else if (uvIndex >= 11) {
    return "Extreme UV levels! Minimize outdoor activities.";
  }
}
