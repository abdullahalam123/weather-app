import React from "react";
import { Flex, Text, Divider, Image, Spinner } from "@chakra-ui/react";
import { WeatherForecast } from "@/interfaces/weather-forecast";

interface WeatherDisplayProps {
  weatherData: WeatherForecast;
  isLoading: boolean;
  isCelsius: boolean;
  isFahrenheit: boolean;
}

export const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  weatherData,
  isLoading,
  isCelsius,
  isFahrenheit,
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
        w="23.125rem"
        h="26.875rem"
        boxShadow="lg"
        justify="center"
        align="center"
      >
        <Spinner
          thickness="0.25rem"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Flex>
    );
  }

  const { location, current, forecast } = weatherData;

  return (
    <Flex
      p="4"
      mt="8"
      borderRadius="0.75rem"
      border="1px solid #e5e5e5"
      direction="column"
      w="23.125rem"
      h="26.875rem"
      boxShadow="lg"
    >
      {isLoading ? (
        <Flex w="full" h="full" justify="center" align="center">
          <Spinner
            thickness="0.25rem"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Flex>
      ) : (
        <>
          <Flex mt="3" justifyContent="space-between">
            <Text fontSize="md" color="#525252" fontWeight="bold">
              7-Day Forecast
            </Text>
            <Flex mr="2" justifyContent="space-between" w="2.5rem">
              <Text>H</Text>
              <Text>L</Text>
            </Flex>
          </Flex>

          {forecast.forecastday.map((day, index) => (
            <React.Fragment key={index}>
              <Flex alignItems="center" justify="space-between" mt="3">
                <Flex w="9.375rem" justify="space-between">
                  <Text fontWeight="bold">
                    {index === 0
                      ? "Today"
                      : new Date(day.date).toLocaleDateString("en-US", {
                          weekday: "long",
                        })}
                  </Text>

                  <Flex justify="center" align="center">
                    <Image
                      w="2rem"
                      h="2rem"
                      src={day.day.condition.icon}
                      alt="weather icon"
                    />
                  </Flex>
                </Flex>
                <Flex gap="1" align="center" justify="center">
                  <Image src="lib/images/humidity.png" w="1rem" h="1rem" />
                  <Text>{day.day.avghumidity}%</Text>
                </Flex>

                <Text>
                  {isCelsius
                    ? `${day.day.maxtemp_c.toFixed(
                        0
                      )}° ${day.day.mintemp_c.toFixed(0)}°`
                    : isFahrenheit
                    ? `${day.day.maxtemp_f.toFixed(
                        0
                      )}° ${day.day.mintemp_f.toFixed(0)}°`
                    : "Temperature unit not specified"}
                </Text>
              </Flex>
              {index < forecast.forecastday.length - 1 && <Divider mt="2" />}
            </React.Fragment>
          ))}
        </>
      )}
    </Flex>
  );
};
