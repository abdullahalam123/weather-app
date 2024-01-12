import { Flex, Image, Spinner, Text } from "@chakra-ui/react";
import React from "react";

interface WeatherInfoProps {
  iconSrc: string;
  label: string;
  value: string | number | undefined;
  symbol: string;
  isLoading: boolean;
}

export const WeatherInfo: React.FC<WeatherInfoProps> = ({
  iconSrc,
  label,
  value,
  symbol,
  isLoading,
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
      {isLoading ? (
        <Flex w="full" h="full" justify="center" align="center">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="lg"
          />
        </Flex>
      ) : (
        <>
          <Flex justify="center" align="center">
            <Image src={iconSrc} w="16px" h="16px" alt={label} />
            <Text>{label}</Text>
          </Flex>
          <Text fontSize="32px" fontWeight="bold">
            {value}
            {symbol}
          </Text>
        </>
      )}
    </Flex>
  );
};
