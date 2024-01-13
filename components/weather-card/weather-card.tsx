// WeatherDisplayBox.tsx
import { Flex, Image, Spinner, Switch, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { capitalizeFirstLetter, daysOfWeek } from "../../constants";

import { Clock } from "..";
import { MoreWeatherData, WeatherForecast } from "../../interfaces";
import { CiLocationArrow1 } from "react-icons/ci";
interface WeatherCardProps {
  today: Date;
  forecastData: WeatherForecast | undefined;
  moreWeatherData: MoreWeatherData | undefined;
  isLoading: boolean;
  setParentCelsius: React.Dispatch<React.SetStateAction<any>>;
  setParentFahrenheit: React.Dispatch<React.SetStateAction<any>>;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({
  today,
  forecastData,
  moreWeatherData,
  isLoading,
  setParentCelsius,
  setParentFahrenheit,
}) => {
  if (!forecastData) {
    return (
      <Flex
        p="4"
        mt="10"
        borderRadius="0.75rem"
        border="0.0625rem solid #e5e5e5"
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

  const { location, current, forecast } = forecastData;
  const [isCelsius, setIsCelsius] = useState(true);
  const [isFahrenheit, setIsFahrenheit] = useState(false);

  return (
    <Flex
      mt="10"
      borderRadius="0.75rem"
      border="1px solid #e5e5e5"
      direction="column"
      w="23.125rem"
      h="26.5625rem"
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
          {/* day and time */}
          <Flex mt="4" justifyContent="space-between" px="6">
            <Text fontSize="1.125rem" fontWeight="semibold">
              {daysOfWeek[today.getDay()]}
            </Text>
            <Clock />
          </Flex>

          {/* City name */}
          <Text
            px="6"
            mt="4"
            fontSize="1.125rem"
            fontWeight="bold"
            display="flex"
          >
            <CiLocationArrow1 width="16px" height="16px" />
            {forecastData?.location.name}
          </Text>

          {/* temperature  */}
          <Flex justify="center" align="center" direction="column">
            <Flex mt="10" w="full" justify="center" align="center">
              <Text
                p="2"
                border="0.0625rem"
                borderRadius="full"
                fontSize="4rem"
                fontWeight="bold"
              >
                {isCelsius
                  ? moreWeatherData?.current.temp_c.toFixed(0)
                  : isFahrenheit
                  ? moreWeatherData?.current.temp_f.toFixed(0)
                  : null}
                °
              </Text>
              <Flex fontSize="18px" direction="column">
                <Text
                  onClick={() => {
                    setIsFahrenheit(false);
                    setParentFahrenheit(false);

                    setIsCelsius(true);
                    setParentCelsius(true);
                  }}
                  cursor="pointer"
                  fontWeight={isCelsius ? "bold" : "light"}
                >
                  C
                </Text>
                <Text
                  onClick={() => {
                    setIsCelsius(false);
                    setParentCelsius(false);

                    setIsFahrenheit(true);
                    setParentFahrenheit(true);
                  }}
                  cursor="pointer"
                  fontWeight={isFahrenheit ? "bold" : "light"}
                >
                  F
                </Text>
              </Flex>
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
                  {(isCelsius
                    ? forecastData.forecast.forecastday[0].day.maxtemp_c
                    : isFahrenheit
                    ? forecastData.forecast.forecastday[0].day.maxtemp_f
                    : null
                  )?.toFixed(0)}
                  ° L:{" "}
                  {(isCelsius
                    ? forecastData?.forecast.forecastday[0].day.mintemp_c
                    : isFahrenheit
                    ? forecastData?.forecast.forecastday[0].day.mintemp_f
                    : null
                  )?.toFixed(0)}
                  °
                </Text>
              </Flex>
              {/* feels like */}
              <Flex alignSelf="flex-end" direction="column">
                <Flex gap="1" justifyContent="center" align="center">
                  <Image
                    src="lib/images/thermometer.png"
                    alt="Thermometer"
                    w="1rem"
                    h="1rem"
                  />
                  <Text fontWeight="semibold">Feels like</Text>
                </Flex>
                <Text textAlign="right">
                  {isCelsius && moreWeatherData?.current.feelslike_c.toFixed(0)}
                  {isFahrenheit &&
                    moreWeatherData?.current.feelslike_f.toFixed(0)}
                  °
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </>
      )}
    </Flex>
  );
};
