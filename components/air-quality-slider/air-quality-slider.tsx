import React from "react";
import {
  Flex,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
} from "@chakra-ui/react";

interface AirQualitySliderProps {
  title: string;
  minValue: number;
  maxValue: number;
  value: number;
}

const AirQualitySlider: React.FC<AirQualitySliderProps> = ({
  title,
  minValue,
  maxValue,
  value,
}) => {
  return (
    <Flex
      w="full"
      h="200px"
      borderRadius="0.75rem"
      border="1px solid #e5e5e5"
      direction="column"
      px="4"
      gap="5"
    >
      <Flex mt="3">
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
          h="10px"
          bgGradient="linear(to-r, rgb(58, 110, 180) 0%, rgb(126, 212, 87) 20%, rgb(248, 212, 73) 40%, rgb(235, 77, 96) 60%, rgb(180, 96, 231) 80%, rgb(178, 34, 34) 100%)"
        >
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb bgColor="black" borderColor="white" />
      </Slider>
      <Text fontSize="18px" fontWeight="bold">
        {value}
      </Text>
    </Flex>
  );
};

export default AirQualitySlider;
