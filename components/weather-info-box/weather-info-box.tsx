// WeatherInfoBox.tsx
import React from "react";
import { Flex } from "@chakra-ui/react";
import { WeatherInfo } from "..";
import { MoreWeatherData } from "@/interfaces";

interface WeatherInfoBoxProps {
  moreWeatherData: MoreWeatherData;
}

export const WeatherInfoBox: React.FC<WeatherInfoBoxProps> = ({
  moreWeatherData,
}) => {
  return (
    <>
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
          symbol="%"
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
    </>
  );
};
