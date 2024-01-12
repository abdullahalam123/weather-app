"use client";
import { Flex, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

import {
  AirQualitySlider,
  Clock,
  WeatherCard,
  WeatherDisplay,
  WeatherForm,
  WeatherInfo,
  WeatherInfoBox,
} from "../components";

import {
  capitalizeFirstLetter,
  convertUnixTimestampToDateTime,
  daysOfWeek,
  weatherImageMapping,
} from "../constants";

import {
  MoreWeatherData,
  WeatherForecast,
  AirPollutionData,
  WeatherData,
} from "../interfaces";
import WeatherAdditionalInfoBox from "@/components/weather-additional-info/weather-additonal-info";

export default function Home() {
  const today = new Date();
  const [weatherData, setWeatherData] = useState<WeatherData>();
  const [airPollutionData, setAirPollutionData] = useState<AirPollutionData>();
  const [moreWeatherData, setMoreWeatherData] = useState<MoreWeatherData>();
  const [forecastData, setForecastData] = useState<WeatherForecast>();

  console.log("weather data: ", weatherData);
  console.log("air pollution data: ", airPollutionData);

  useEffect(() => {
    const fetchAirPollution = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${weatherData?.coord.lat}&lon=${weatherData?.coord.lon}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_KEY}`
        );

        setAirPollutionData(response.data);
        // setIsLoading(false);
      } catch (error) {
        // setIsLoading(false);
        console.error("Error fetching weather data:", error);
      }
    };

    fetchAirPollution();
  }, [weatherData]);

  useEffect(() => {
    const fetchAirPollution = async () => {
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${weatherData?.name}&days=7
          `
        );

        setForecastData(response.data);
        // setIsLoading(false);
      } catch (error) {
        // setIsLoading(false);
        console.error("Error fetching weather data:", error);
      }
    };

    fetchAirPollution();
  }, [weatherData]);

  return (
    <Flex minH="100vh" w="100%" direction="column" flexWrap="wrap">
      <Flex mt="10" w="full" h="50px" justify="center">
        <Flex w="300px">
          <WeatherForm
            setWeatherData={setWeatherData}
            setMoreWeatherData={setMoreWeatherData}
          />
        </Flex>
      </Flex>

      <Flex w="full" justify="center" flexWrap="wrap">
        <Flex direction="column" gap="2">
          <WeatherCard
            moreWeatherData={moreWeatherData}
            today={today}
            weatherData={weatherData}
          />

          <Flex mb="10">
            <WeatherDisplay weatherData={forecastData as WeatherForecast} />
          </Flex>
        </Flex>

        <Flex h="430px" direction="column">
          <WeatherInfoBox
            moreWeatherData={moreWeatherData as MoreWeatherData}
          />
          <WeatherAdditionalInfoBox
            weatherData={weatherData as WeatherData}
            weatherDataMore={moreWeatherData as MoreWeatherData}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
