"use client";
import { Flex, Image } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

import {
  WeatherCard,
  WeatherDisplay,
  WeatherForm,
  WeatherInfoBox,
} from "../components";

import WeatherAdditionalInfoBox from "@/components/weather-additional-info/weather-additonal-info";
import { MoreWeatherData, WeatherForecast } from "../interfaces";

export default function Home() {
  const today = new Date();
  const [moreWeatherData, setMoreWeatherData] = useState<MoreWeatherData>();
  const [forecastData, setForecastData] = useState<WeatherForecast>();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchForeCastData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${moreWeatherData?.location.name}&days=7
          `
        );

        setForecastData(response.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching forecast data for 7 days:", error);
      }
    };

    fetchForeCastData();
  }, [moreWeatherData]);

  return (
    <Flex
      minH="100vh"
      w="100%"
      direction="column"
      flexWrap="wrap"
      overflowX={"hidden"}
    >
      <Flex
        gap={{ base: "3", md: "none" }}
        mt="10"
        w="full"
        h="3.125rem"
        justify="space-between"
      >
        <Image
          ml={{ base: "5", md: "10" }}
          src="lib/images/sun.png"
          w="2.625rem"
          h="2.625rem"
          alt="logo"
        />

        <Flex w="18.75rem" mr="35">
          <WeatherForm
            setParentLoading={setIsLoading}
            setMoreWeatherData={setMoreWeatherData}
          />
        </Flex>
      </Flex>

      <Flex w="full" justify="center" flexWrap="wrap">
        <Flex direction="column" gap="2">
          <WeatherCard
            isLoading={isLoading}
            moreWeatherData={moreWeatherData}
            today={today}
            forecastData={forecastData as WeatherForecast}
          />

          <Flex mb="10">
            <WeatherDisplay
              isLoading={isLoading}
              weatherData={forecastData as WeatherForecast}
            />
          </Flex>
        </Flex>

        <Flex
          align={{ base: "center", md: "none" }}
          h="26.875rem"
          direction="column"
        >
          <WeatherInfoBox
            isLoading={isLoading}
            moreWeatherData={moreWeatherData as MoreWeatherData}
          />
          <WeatherAdditionalInfoBox
            isLoading={isLoading}
            forecastData={forecastData as WeatherForecast}
            weatherDataMore={moreWeatherData as MoreWeatherData}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
