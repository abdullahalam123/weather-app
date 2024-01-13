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
import { MoreWeatherData, WeatherData, WeatherForecast } from "../interfaces";

export default function Home() {
  const today = new Date();
  const [weatherData, setWeatherData] = useState<WeatherData>();
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
    <Flex minH="100vh" w="100%" direction="column" flexWrap="wrap">
      <Flex mt="10" w="full" h="50px" justify="space-between" px="20">
        <Image src="lib/images/sun.png" w="42px" h="42px" alt="logo" />

        <Flex w="300px">
          <WeatherForm
            setParentLoading={setIsLoading}
            setWeatherData={setWeatherData}
            setMoreWeatherData={setMoreWeatherData}
          />
        </Flex>
      </Flex>

      <Flex w="full" justify="center" flexWrap="wrap">
        <Flex direction="column" gap="2">
          {/* DONE */}
          <WeatherCard
            isLoading={isLoading}
            moreWeatherData={moreWeatherData}
            today={today}
            forecastData={forecastData as WeatherForecast}
          />

          <Flex mb="10">
            {/* DONE */}
            <WeatherDisplay
              isLoading={isLoading}
              weatherData={forecastData as WeatherForecast}
            />
          </Flex>
        </Flex>

        <Flex h="430px" direction="column">
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
