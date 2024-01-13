import React from "react";
import {
  Flex,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
  Image,
  Spinner,
} from "@chakra-ui/react";
import { generateAirPollutionMessage, generateUVMessage } from "@/constants";

interface AirQualitySliderProps {
  title: string;
  minValue: number;
  maxValue: number;
  value: number;
  isLoading: boolean;
  imageSource: string;
  imageTag: string;
}

export const AirQualitySlider: React.FC<AirQualitySliderProps> = ({
  title,
  minValue,
  maxValue,
  value,
  isLoading,
  imageSource,
  imageTag,
}) => {
  return (
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
          <Flex mt="3" align="center" gap="1">
            <Image src={imageSource} alt={imageTag} w="1rem" h="1rem" />
            <Text fontWeight="bold" fontSize="xl" color="#525252">
              {title}
            </Text>
          </Flex>
          <Slider
            min={minValue}
            max={maxValue}
            value={value}
            aria-label={`slider-${title.replace(/\s/g, "-").toLowerCase()}`}
            colorScheme="none"
            defaultValue={maxValue}
            borderRadius="full"
            isReadOnly
          >
            <SliderTrack
              borderRadius="full"
              h="0.625rem"
              bgGradient="linear(to-r, rgb(58, 110, 180) 0%, rgb(126, 212, 87) 20%, rgb(248, 212, 73) 40%, rgb(235, 77, 96) 60%, rgb(180, 96, 231) 80%, rgb(178, 34, 34) 100%)"
            >
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb bgColor="black" borderColor="white" />
          </Slider>
          <Text fontSize="1.125rem" fontWeight="bold">
            {value}
          </Text>
          <Text color="gray" fontSize={{ base: "10px", md: "14px" }}>
            {title && title === "UV Index" && generateUVMessage(value)}
            {title &&
              title === "Air Pollution" &&
              generateAirPollutionMessage(value)}
          </Text>
        </>
      )}
    </Flex>
  );
};
