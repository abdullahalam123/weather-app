import React from "react";
import { Flex, Image, Spinner, Text } from "@chakra-ui/react";
import { convertUnixTimestampToDateTime } from "@/constants";
import { AirQualitySlider } from "..";
import { MoreWeatherData, WeatherData, WeatherForecast } from "@/interfaces";

interface WeatherAdditionalInfoBoxProps {
  weatherDataMore: MoreWeatherData;
  forecastData: WeatherForecast;
  isLoading: boolean;
}

const WeatherAdditionalInfoBox: React.FC<WeatherAdditionalInfoBoxProps> = ({
  forecastData,
  weatherDataMore,
  isLoading,
}) => {
  return (
    <Flex ml="10" mt="10" w="28.125rem" gap="6" direction="column">
      <Flex gap="10">
        {/* SUNRISE AND SUNSET */}
        <Flex
          boxShadow="lg"
          w="full"
          h="12.5rem"
          borderRadius="0.75rem"
          border="1px solid #e5e5e5"
          direction="column"
          px="4"
          gap="5"
        >
          {isLoading ? (
            <Flex w="full" h="full" justify="center" align="center">
              <Spinner
                thickness="0.25rem"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="lg"
              />
            </Flex>
          ) : (
            <>
              <Flex mt="3" justifyContent="space-between">
                <Flex direction="column">
                  <Image
                    src="lib/images/sunrise.png"
                    alt="sunrise"
                    w="4rem"
                    h="4rem"
                  />
                  <Text fontWeight="bold" fontSize="xl" color="#525252">
                    Sunrise
                  </Text>
                  <Text>
                    {forecastData?.forecast.forecastday[0].astro.sunrise}
                  </Text>
                </Flex>
                <Flex direction="column">
                  <Image
                    src="lib/images/sunset.png"
                    alt="sunseet"
                    w="4rem"
                    h="4rem"
                  />
                  <Text fontWeight="bold" fontSize="xl" color="#525252">
                    Sunset
                  </Text>
                  <Text>
                    {forecastData?.forecast.forecastday[0].astro.sunset}
                  </Text>
                </Flex>
              </Flex>
            </>
          )}
        </Flex>

        {/* UV INDEX */}
        <AirQualitySlider
          imageTag="UV Index"
          imageSource="lib/images/uv.png"
          isLoading={isLoading}
          title="UV Index"
          minValue={1}
          maxValue={10}
          value={weatherDataMore?.current?.uv as number}
        />
      </Flex>

      {/* AIR POLLUTION */}
      <Flex mt="1">
        <AirQualitySlider
          imageTag="Air Pollution"
          imageSource="lib/images/air-pollution.png"
          isLoading={isLoading}
          title="Air Pollution"
          minValue={1}
          maxValue={10}
          value={
            weatherDataMore?.current?.air_quality["gb-defra-index"] as number
          }
        />
      </Flex>
    </Flex>
  );
};

export default WeatherAdditionalInfoBox;
