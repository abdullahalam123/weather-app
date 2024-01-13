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
      boxShadow="lg"
      borderRadius="1.125rem"
      border="1px solid #e5e5e5"
      mt="10"
      ml="10"
      w="12.5rem"
      h="12rem"
      direction="column"
      justifyContent="center"
      align="center"
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
          <Flex gap="1" justify="center" align="center">
            <Image src={iconSrc} w="1rem" h="1rem" alt={label} />
            <Text fontSize="1.125rem">{label}</Text>
          </Flex>
          <Text fontSize="2rem" fontWeight="bold">
            {value}
            {symbol}
          </Text>
        </>
      )}
    </Flex>
  );
};
