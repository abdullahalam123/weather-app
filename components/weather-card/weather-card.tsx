// WeatherDisplayBox.tsx
import { Flex, Image, Spinner, Text } from "@chakra-ui/react";
import React from "react";
import {
  capitalizeFirstLetter,
  daysOfWeek,
  weatherImageMapping,
} from "../../constants";

import { Clock } from "..";
import { MoreWeatherData, WeatherForecast } from "../../interfaces";
interface WeatherCardProps {
  today: Date;
  forecastData: WeatherForecast | undefined;
  moreWeatherData: MoreWeatherData | undefined;
  isLoading: boolean;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({
  today,
  forecastData,
  moreWeatherData,
  isLoading,
}) => {
  // Check if weatherData is undefined or null
  if (!forecastData) {
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
        justify="center"
        align="center"
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Flex>
    );
  }

  const { location, current, forecast } = forecastData;

  return (
    <Flex
      mt="10"
      borderRadius="0.75rem"
      border="1px solid #e5e5e5"
      direction="column"
      w="370px"
      h="430px"
      boxShadow="sm"
    >
      {isLoading ? (
        <Flex w="full" h="full" justify="center" align="center">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Flex>
      ) : (
        <>
          {/* day and time */}
          <Flex mt="4" justifyContent="space-between" px="6">
            <Text fontSize="18px" fontWeight="semibold">
              {daysOfWeek[today.getDay()]}
            </Text>
            <Clock />
          </Flex>

          {/* City name */}
          <Text px="6" mt="4" fontSize="18px" fontWeight="bold">
            {forecastData?.location.name}
          </Text>

          {/* temperature  */}
          <Flex justify="center" align="center" direction="column">
            <Flex mt="10" w="full" justify="center" align="center">
              <Text
                p="2"
                border="1px"
                borderRadius="full"
                fontSize="64px"
                fontWeight="bold"
              >
                {moreWeatherData?.current.temp_c.toFixed(0)}°
              </Text>
            </Flex>

            <Flex px="6" w="full" justifyContent="space-between">
              {/* weather description and image */}
              <Flex direction="column" alignSelf="flex-start" mt="14">
                {forecastData &&
                  forecastData.forecast &&
                  forecastData.location && (
                    <Image
                      src={forecastData.current.condition.icon}
                      alt="Weather Image"
                      w="2.25rem"
                      h="2.25rem"
                    />
                  )}

                <Text fontWeight="semibold" mt="2">
                  {capitalizeFirstLetter(forecastData?.current.condition.text)}
                </Text>
                <Text>
                  H:{" "}
                  {forecastData?.forecast.forecastday[0].day.maxtemp_c.toFixed(
                    0
                  )}
                  ° L:{" "}
                  {forecastData?.forecast.forecastday[0].day.mintemp_c.toFixed(
                    0
                  )}
                  °{" "}
                </Text>
              </Flex>
              {/* feels like */}
              <Flex alignSelf="flex-end" direction="column">
                <Flex gap="1" justifyContent="center" align="center">
                  <Image
                    src="lib/images/thermometer.png"
                    alt="Thermometer"
                    w="16px"
                    h="16px"
                  />
                  <Text fontWeight="semibold">Feels like</Text>
                </Flex>
                <Text textAlign="right">
                  {moreWeatherData?.current.feelslike_c.toFixed(0)}°
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </>
      )}
    </Flex>
  );
};
