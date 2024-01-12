import React from "react";
import { Flex, Text, Divider, Image } from "@chakra-ui/react";
import { WeatherForecast } from "@/interfaces/weather-forecast";

interface WeatherDisplayProps {
  weatherData: WeatherForecast;
}

export const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  weatherData,
}) => {
  // Check if weatherData is undefined or null
  if (!weatherData) {
    return (
      <Flex
        p="4"
        mt="10"
        borderRadius="0.75rem"
        border="1px solid #e5e5e5"
        direction="column"
        w="370px"
        h="430px"
        boxShadow="lg"
      >
        <Text>Error: Weather data not available</Text>
      </Flex>
    );
  }

  const { location, current, forecast } = weatherData;

  return (
    <Flex
      p="4"
      mt="10"
      borderRadius="0.75rem"
      border="1px solid #e5e5e5"
      direction="column"
      w="370px"
      h="430px"
      boxShadow="lg"
    >
      <Flex mt="3" justifyContent="space-between">
        <Text fontSize="md" color="#525252" fontWeight="bold">
          7-Day Forecast
        </Text>
        <Flex mr="2" justifyContent="space-between" w="40px">
          <Text>H</Text>
          <Text>L</Text>
        </Flex>
      </Flex>

      {forecast.forecastday.map((day, index) => (
        <React.Fragment key={index}>
          <Flex alignItems="center" justify="space-between" mt="3">
            <Flex w="150px" justify="space-between">
              <Text fontWeight="bold">
                {index === 0
                  ? "Today"
                  : new Date(day.date).toLocaleDateString("en-US", {
                      weekday: "long",
                    })}
              </Text>

              <Flex justify="center" align="center">
                <Image
                  w="32px"
                  h="32px"
                  src={day.day.condition.icon}
                  alt="weather icon"
                />
              </Flex>
            </Flex>
            <Flex gap="1" align="center" justify="center">
              <Image src="lib/images/humidity.png" w="16px" h="16px" />
              <Text>{day.day.avghumidity}%</Text>
            </Flex>

            <Text>
              {day.day.maxtemp_c.toFixed(0)}° {day.day.mintemp_c.toFixed(0)}°
            </Text>
          </Flex>
          {index < forecast.forecastday.length - 1 && <Divider mt="2" />}
        </React.Fragment>
      ))}
    </Flex>
  );
};
