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
  Toast,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

interface WeatherFormProps {
  setMoreWeatherData: React.Dispatch<React.SetStateAction<any>>;
  setParentLoading: React.Dispatch<React.SetStateAction<any>>;
}

interface AddressSuggestion {
  name: string;
  region: string;
  country: string;
}

interface ErrorResponse {
  error: {
    code: number;
    message: string;
  };
}

export const WeatherForm = ({
  setMoreWeatherData,
  setParentLoading,
}: WeatherFormProps) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [city, setCity] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("lastSearchedCity") || "Assam";
    } else {
      return "Assam";
    }
  });
  const [isCelsius, setIsCelsius] = useState(false);
  const [unit, setUnit] = useState("metric"); // Use metric for Celsius and imperial for Fahrenheit
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedAddresses, setSuggestedAddresses] = useState<
    AddressSuggestion[]
  >([]);

  const fetchAddressSuggestions = async (input: string) => {
    const cityName = input || "Assam";

    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/search.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${cityName}`
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
    setParentLoading(true);
    try {
      const result = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${city}&aqi=yes`
      );

      setMoreWeatherData(result.data);

      // Save the searched city to local storage
      localStorage.setItem("lastSearchedCity", city);

      setIsLoading(false);
      setParentLoading(false);
      onClose();
    } catch (error) {
      setIsLoading(false);
      setParentLoading(false);
      onClose();
      console.error("Error fetching normal weather data:", error);

      toast({
        title: "Error!",
        description: (error as AxiosError<ErrorResponse>)?.response?.data?.error
          ?.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
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
    setIsLoading(true);

    setUnit(isCelsius ? "metric" : "imperial");
    setIsLoading(false);
  }, [isCelsius]);

  useEffect(() => {
    const lastSearchedCity = localStorage.getItem("lastSearchedCity");

    if (lastSearchedCity) {
      setCity(lastSearchedCity);
    }
  }, []);

  const handleSuggestionClick = (selectedCity: string) => {
    localStorage.setItem("lastSearchedCity", selectedCity);
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
                    w={{ base: "20rem", md: "25rem" }}
                    size="xl"
                    type="text"
                    placeholder="Enter city"
                    value={city}
                    mb="2"
                    onChange={(e) => handleInputChange(e.target.value)}
                  />
                </InputGroup>

                <Box overflowY="scroll" h="9.375rem" w="full">
                  <Text color="grey">Suggestions</Text>
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
              </form>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
