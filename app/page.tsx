"use client";
import WeatherForm from "@/components/weather-form/weather-form";
import { weatherImageMapping } from "@/constants/image-map";
import WeatherData from "@/interfaces/weather-data";
import { Box, Divider, Flex, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

import AirQualitySlider from "@/components/air-quality-slider/air-quality-slider";
import Clock from "@/components/clock/clock";
import WeatherInfo from "@/components/weather-info/weather-info";
import { capitalizeFirstLetter } from "@/constants/capitalize-letters";
import { daysOfWeek } from "@/constants/days";
import AirPollutionData from "@/interfaces/air-pollution";
import { MoreWeatherData } from "@/interfaces/weather-data-more";
import { WeatherForecast } from "@/interfaces/weather-forecast";
import WeatherDisplay from "@/components/forecast/forecast";

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

  function convertUnixTimestampToDateTime(unixTimestamp: number): string {
    const date = new Date(unixTimestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds
    const options: Intl.DateTimeFormatOptions = {
      // weekday: "long",
      // year: "numeric",
      // month: "long",
      // day: "numeric",
      hour: "numeric",
      minute: "numeric",
      // second: "numeric",
      // timeZoneName: "short",
    };

    return date.toLocaleString("en-US", options);
  }
  return (
    <Flex minH="100vh" w="100%" direction="column" flexWrap="wrap">
      <Flex mt="10" w="full" h="50px" justify="center">
        {/* Search Box */}
        <Flex w="300px">
          <WeatherForm
            setWeatherData={setWeatherData}
            setMoreWeatherData={setMoreWeatherData}
          />
        </Flex>
      </Flex>
      {/* Main content */}
      <Flex w="full" justify="center" flexWrap="wrap">
        <Flex direction="column" gap="2">
          {/* first box */}
          <Flex
            mt="10"
            borderRadius="0.75rem"
            border="1px solid #e5e5e5"
            direction="column"
            w="370px"
            h="430px"
            boxShadow="sm"
          >
            {/* day and time */}
            <Flex mt="4" justifyContent="space-between" px="6">
              <Text fontSize="18px" fontWeight="semibold">
                {daysOfWeek[today.getDay()]}
              </Text>
              <Clock />
            </Flex>

            {/* City name */}
            <Text px="6" mt="4" fontSize="18px" fontWeight="bold">
              {weatherData?.name}
            </Text>

            {/* temperature  */}
            <Flex justify="center" align="center" direction="column">
              <Flex mt="10" w="full" justify="center" align="center">
                <Text
                  p="2"
                  border="1px"
                  borderRadius="full"
                  fontSize="64px"
                  fontWeight="bold"
                >
                  {moreWeatherData?.current.temp_c.toFixed(0)}°
                </Text>
              </Flex>

              <Flex px="6" w="full" justifyContent="space-between">
                {/* weather description and image */}
                <Flex direction="column" alignSelf="flex-start" mt="14">
                  {weatherData &&
                    weatherData.weather &&
                    weatherData.weather[0] && (
                      <Image
                        src={`lib/images/${
                          (weatherImageMapping as Record<string, string>)[
                            weatherData.weather[0].description
                          ]
                        }.png`}
                        alt="Weather Image"
                        w="2.25rem"
                        h="2.25rem"
                      />
                    )}

                  <Text fontWeight="semibold" mt="2">
                    {capitalizeFirstLetter(
                      weatherData?.weather[0].description as string
                    )}
                  </Text>
                  <Text>
                    H: {weatherData?.main.temp_max.toFixed(0)}° L:{" "}
                    {weatherData?.main.temp_min.toFixed(0)}°{" "}
                  </Text>
                </Flex>
                {/* feels like */}
                <Flex alignSelf="flex-end" direction="column">
                  <Flex gap="1" justifyContent="center" align="center">
                    <Image
                      src="lib/images/thermometer.png"
                      alt="Thermometer"
                      w="16px"
                      h="16px"
                    />
                    <Text fontWeight="semibold">Feels like</Text>
                  </Flex>
                  <Text textAlign="right">
                    {moreWeatherData?.current.feelslike_c.toFixed(0)}°
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          <Flex>
            {/* 5 day forecast*/}
            <WeatherDisplay weatherData={forecastData as WeatherForecast} />
          </Flex>
        </Flex>
        {/* small boxes */}
        <Flex h="430px" direction="column">
          <Flex>
            <WeatherInfo
              iconSrc="lib/images/humidity.png"
              label="Precipitation"
              value={moreWeatherData?.current.precip_mm}
              symbol="mm"
            />
            <WeatherInfo
              iconSrc="lib/images/humidity.png"
              label="Humidity"
              value={moreWeatherData?.current.humidity}
              symbol="°"
            />
          </Flex>
          <Flex>
            <WeatherInfo
              iconSrc="lib/images/visibility.png"
              label="Visibility"
              value={moreWeatherData?.current.vis_km}
              symbol="km"
            />
            <WeatherInfo
              iconSrc="lib/images/wind.png"
              label="Wind"
              value={moreWeatherData?.current.wind_kph}
              symbol="kp/h"
            />
          </Flex>
          {/* second box */}
          <Flex ml="10" mt="10" w="450px" gap="6" direction="column">
            <Flex gap="10">
              {/* SUNRISE AND SUNSET */}
              <Flex
                w="full"
                h="200px"
                borderRadius="0.75rem"
                border="1px solid #e5e5e5"
                direction="column"
                px="4"
                gap="5"
              >
                <Flex mt="3" justifyContent="space-between">
                  <Flex direction="column">
                    <Image
                      src="lib/images/sunrise.png"
                      alt="sunrise"
                      w="64px"
                      h="64px"
                    />
                    <Text fontWeight="bold" fontSize="xl" color="#525252">
                      Sunrise
                    </Text>
                    <Text>
                      {convertUnixTimestampToDateTime(
                        weatherData?.sys.sunrise as number
                      )}
                    </Text>
                  </Flex>
                  <Flex direction="column">
                    <Image
                      src="lib/images/sunset.png"
                      alt="sunseet"
                      w="64px"
                      h="64px"
                    />
                    <Text fontWeight="bold" fontSize="xl" color="#525252">
                      Sunset
                    </Text>
                    <Text>
                      {convertUnixTimestampToDateTime(
                        weatherData?.sys.sunset as number
                      )}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>

              {/* UV INDEX */}
              <AirQualitySlider
                title="UV Index"
                minValue={1}
                maxValue={10}
                value={moreWeatherData?.current.uv as number}
              />
            </Flex>

            {/* AIR POLLUTION */}
            <Flex>
              <AirQualitySlider
                title="Air Pollution"
                minValue={1}
                maxValue={10}
                value={
                  moreWeatherData?.current.air_quality[
                    "gb-defra-index"
                  ] as number
                }
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
