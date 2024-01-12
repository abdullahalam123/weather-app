import React from "react";
import { Flex, Image, Text } from "@chakra-ui/react";
import { convertUnixTimestampToDateTime } from "@/constants";
import { AirQualitySlider } from "..";
import { MoreWeatherData, WeatherData } from "@/interfaces";

interface WeatherAdditionalInfoBoxProps {
  weatherDataMore: MoreWeatherData;
  weatherData: WeatherData;
}

const WeatherAdditionalInfoBox: React.FC<WeatherAdditionalInfoBoxProps> = ({
  weatherData,
  weatherDataMore,
}) => {
  return (
    <Flex ml="10" mt="10" w="450px" gap="6" direction="column">
      <Flex gap="10">
        {/* SUNRISE AND SUNSET */}
        <Flex
          w="full"
          h="200px"
          borderRadius="0.75rem"
          border="1px solid #e5e5e5"
          direction="column"
          px="4"
          gap="5"
        >
          <Flex mt="3" justifyContent="space-between">
            <Flex direction="column">
              <Image
                src="lib/images/sunrise.png"
                alt="sunrise"
                w="64px"
                h="64px"
              />
              <Text fontWeight="bold" fontSize="xl" color="#525252">
                Sunrise
              </Text>
              <Text>
                {convertUnixTimestampToDateTime(
                  weatherData?.sys?.sunrise as number
                )}
              </Text>
            </Flex>
            <Flex direction="column">
              <Image
                src="lib/images/sunset.png"
                alt="sunseet"
                w="64px"
                h="64px"
              />
              <Text fontWeight="bold" fontSize="xl" color="#525252">
                Sunset
              </Text>
              <Text>
                {convertUnixTimestampToDateTime(
                  weatherData?.sys?.sunset as number
                )}
              </Text>
            </Flex>
          </Flex>
        </Flex>

        {/* UV INDEX */}
        <AirQualitySlider
          title="UV Index"
          minValue={1}
          maxValue={10}
          value={weatherDataMore?.current?.uv as number}
        />
      </Flex>

      {/* AIR POLLUTION */}
      <Flex>
        <AirQualitySlider
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
