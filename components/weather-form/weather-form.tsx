import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

interface WeatherFormProps {
  setWeatherData: React.Dispatch<React.SetStateAction<any>>;
  setMoreWeatherData: React.Dispatch<React.SetStateAction<any>>;
}

interface AddressSuggestion {
  name: string;
  region: string;
  country: string;
}

export const WeatherForm = ({
  setWeatherData,
  setMoreWeatherData,
}: WeatherFormProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [city, setCity] = useState("Assam");
  const [isCelsius, setIsCelsius] = useState(false);
  const [unit, setUnit] = useState("metric"); // Use metric for Celsius and imperial for Fahrenheit
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedAddresses, setSuggestedAddresses] = useState<
    AddressSuggestion[]
  >([]);

  const fetchAddressSuggestions = async (input: string) => {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/search.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${input}`
      );

      // Extract full address information from the response
      const addresses: AddressSuggestion[] = response.data.map(
        (result: any) => ({
          name: result.name,
          region: result.region,
          country: result.country,
        })
      );

      setSuggestedAddresses(addresses);
    } catch (error) {
      console.error("Error fetching address suggestions:", error);
    }
  };

  const handleInputChange = (value: string) => {
    setCity(value);
    // Fetch suggestions based on the input value
    fetchAddressSuggestions(value);
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const result = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${city}&aqi=yes`
      );
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_KEY}&units=${unit}`
      );

      setWeatherData(response.data);
      setMoreWeatherData(result.data);
      setIsLoading(false);
      onClose();
    } catch (error) {
      setIsLoading(false);
      onClose();
      console.error("Error fetching weather data:", error);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    fetchData();
  };

  useEffect(() => {
    setIsLoading(true);
    handleSubmit({ preventDefault: () => {} });
    setIsLoading(false);
  }, [isCelsius, unit]);

  useEffect(() => {
    // Update the unit based on the latest value of isCelsius
    setIsLoading(true);

    setUnit(isCelsius ? "metric" : "imperial");
    setIsLoading(false);
  }, [isCelsius]);

  const handleSuggestionClick = (selectedCity: string) => {
    setCity(selectedCity);
    fetchData();
    onClose();
  };

  return (
    <Flex>
      <InputGroup onClick={onOpen}>
        <InputLeftElement mt="1" pointerEvents="none">
          <IoSearchOutline />
        </InputLeftElement>
        {/* Use Input element for search */}
        <Input
          isReadOnly
          size="lg"
          type="text"
          placeholder="Enter city"
          mb="2"
        />
      </InputGroup>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(2px) hue-rotate(90deg)"
        />

        <ModalContent>
          <ModalBody p="4">
            <Flex w="full">
              <form onSubmit={handleSubmit}>
                <InputGroup onClick={onOpen}>
                  <InputLeftElement pointerEvents="none">
                    <IoSearchOutline />
                  </InputLeftElement>
                  <Input
                    w="25rem"
                    size="xl"
                    type="text"
                    placeholder="Enter city"
                    value={city}
                    mb="2"
                    onChange={(e) => handleInputChange(e.target.value)}
                  />
                </InputGroup>

                <Box overflowY="scroll" h="150px" w="full">
                  <Text>Suggestions</Text>
                  {suggestedAddresses.map((address) => (
                    <Box
                      overflow="auto"
                      cursor="pointer"
                      key={`${address.name}, ${address.region}, ${address.country}`}
                      p="2"
                      _hover={{
                        bg: "#f5f5f5",
                      }}
                      onClick={() =>
                        handleSuggestionClick(
                          `${address.name}, ${address.region}`
                        )
                      }
                    >
                      <Text>
                        {`${address.name}, ${address.region}, ${address.country}`}
                      </Text>
                    </Box>
                  ))}
                </Box>
                {/* <Button
          color="white"
          bg="black"
          isLoading={isLoading}
          type="submit"
          ml="2"
        >
          Get Weather
        </Button>
        <Button
          color="white"
          bg="black"
          isLoading={isLoading}
          ml="2"
          onClick={() => setIsCelsius((prev) => !prev)}
        >
          Change degrees
        </Button> */}
              </form>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
