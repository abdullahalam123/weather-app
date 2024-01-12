import { Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

interface WeatherInfoProps {
  iconSrc: string;
  label: string;
  value: string | number | undefined;
  symbol: string;
}

export const WeatherInfo: React.FC<WeatherInfoProps> = ({
  iconSrc,
  label,
  value,
  symbol,
}) => {
  return (
    <Flex
      borderRadius="18px"
      border="1px solid #e5e5e5"
      mt="10"
      ml="10"
      w="200px"
      h="192px"
      direction="column"
      justifyContent="center"
      align="center"
    >
      <Flex justify="center" align="center">
        <Image src={iconSrc} w="16px" h="16px" alt={label} />
        <Text>{label}</Text>
      </Flex>
      <Text fontSize="32px" fontWeight="bold">
        {value}
        {symbol}
      </Text>
    </Flex>
  );
};
