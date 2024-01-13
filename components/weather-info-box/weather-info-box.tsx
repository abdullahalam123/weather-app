// WeatherInfoBox.tsx
import React from "react";
import { Flex, Spinner } from "@chakra-ui/react";
import { WeatherInfo } from "..";
import { MoreWeatherData } from "@/interfaces";

interface WeatherInfoBoxProps {
  moreWeatherData: MoreWeatherData;
  isLoading: boolean;
}

export const WeatherInfoBox: React.FC<WeatherInfoBoxProps> = ({
  moreWeatherData,
  isLoading,
}) => {
  return (
    <>
      <Flex>
        <WeatherInfo
          isLoading={isLoading}
          iconSrc="lib/images/precipitation.png"
          label="Precipitation"
          value={moreWeatherData?.current.precip_mm}
          symbol="mm"
        />
        <WeatherInfo
          isLoading={isLoading}
          iconSrc="lib/images/humidity.png"
          label="Humidity"
          value={moreWeatherData?.current.humidity}
          symbol="%"
        />
      </Flex>
      <Flex>
        <WeatherInfo
          isLoading={isLoading}
          iconSrc="lib/images/visibility.png"
          label="Visibility"
          value={moreWeatherData?.current.vis_km}
          symbol="km"
        />
        <WeatherInfo
          isLoading={isLoading}
          iconSrc="lib/images/wind.png"
          label="Wind"
          value={moreWeatherData?.current.wind_kph}
          symbol="kp/h"
        />
      </Flex>
    </>
  );
};
