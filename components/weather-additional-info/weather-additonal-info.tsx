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
    <Flex
      // border="1px"
      ml={{ md: "10" }}
      mt="10"
      gap="6"
      w={{ base: "fit-content", md: "28.125rem" }}
      direction="column"
    >
      <Flex gap={{ base: "4", md: "10" }}>
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
                <Flex gap="2" direction="column">
                  <Image
                    src="lib/images/sunrise.png"
                    alt="sunrise"
                    w={{ base: "3rem", md: "4rem" }}
                    h={{ base: "3rem", md: "4rem" }}
                  />
                  <Text
                    fontWeight="bold"
                    fontSize={{ base: "md", md: "xl" }}
                    color="#525252"
                  >
                    Sunrise
                  </Text>
                  <Text fontWeight={{ base: "semibold" }}>
                    {forecastData?.forecast.forecastday[0].astro.sunrise}
                  </Text>
                </Flex>
                <Flex gap="2" direction="column">
                  <Image
                    src="lib/images/sunset.png"
                    alt="sunseet"
                    w={{ base: "3rem", md: "4rem" }}
                    h={{ base: "3rem", md: "4rem" }}
                  />
                  <Text
                    fontWeight="bold"
                    fontSize={{ base: "md", md: "xl" }}
                    color="#525252"
                  >
                    Sunset
                  </Text>
                  <Text fontWeight={{ base: "semibold" }}>
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
      <Flex mt="1" mb={{ base: "4", md: "none" }}>
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
