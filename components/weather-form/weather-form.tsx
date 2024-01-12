import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  InputLeftElement,
  Input,
  Button,
  Flex,
  FormControl,
  InputGroup,
} from "@chakra-ui/react";
import { IoSearchOutline } from "react-icons/io5";

interface WeatherFormProps {
  setWeatherData: React.Dispatch<React.SetStateAction<any>>;
  setMoreWeatherData: React.Dispatch<React.SetStateAction<any>>;
}

const WeatherForm = ({
  setWeatherData,
  setMoreWeatherData,
}: WeatherFormProps) => {
  const [city, setCity] = useState("Assam");
  const [isCelsius, setIsCelsius] = useState(false);
  const [unit, setUnit] = useState("standard");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
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
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    handleSubmit({ preventDefault: () => {} });
    setIsLoading(false);
  }, [isCelsius, unit]);

  useEffect(() => {
    // Update the unit based on the latest value of isCelsius
    setIsLoading(true);

    setUnit(isCelsius ? "metric" : "standard");
    setIsLoading(false);
  }, [isCelsius]);

  return (
    <Flex>
      <form onSubmit={handleSubmit}>
        <InputGroup>
          <InputLeftElement mt="1" pointerEvents="none">
            <IoSearchOutline />
          </InputLeftElement>
          <Input
            size="lg"
            type="text"
            placeholder="Enter city"
            value={city}
            mb="2"
            onChange={(e) => setCity(e.target.value)}
          />
        </InputGroup>
        {/* <Button color="white" bg="black" type="submit">
        Get Weather
      </Button> */}
        {/* <Button
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
  );
};

export default WeatherForm;
