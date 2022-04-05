import { useState, useRef, useEffect, LegacyRef, RefObject } from "react";
import { WeatherItem } from "../Components/WeatherItem";
import { InfoItem, Weather_Forecast_Data } from "../Interfaces/interfaces";

import { WeatherContext } from "./WeatherContext";


type FormElement = React.FormEvent<HTMLFormElement>;
interface props {
  children: JSX.Element | JSX.Element[]
}

export const array: WeatherItem[] = [];

export const WeatherProvider = ({ children }: props) => {

  const [newLocation, setNewLocation] = useState<string>("E1");
  const LocationInput = useRef() as React.LegacyRef<HTMLSelectElement>;

  useEffect(() => {
    let Timeout = setTimeout(()=>{
      setNewLocation(newLocation);
      console.log(newLocation);
      }, 1);
      return () => clearTimeout(Timeout);
  }, [newLocation]);
  
  const handleSubmit = (ev: FormElement): void => {
    ev.preventDefault();
    AddItem(newLocation);
  };

  const AddItem = (postalcode: string) => {

    let PostalCodesURL = (postalCode: string) => 'http://api.openweathermap.org/geo/1.0/zip?zip=' + postalCode + ',GB&appid=a1f0abe3eb9fa2d18127cd0ce140c3b0';
    let WeatherURL = (lat: number, lon: number) => 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=a1f0abe3eb9fa2d18127cd0ce140c3b0';
    let HistoricURL = (lat: number, lon: number) => 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=a1f0abe3eb9fa2d18127cd0ce140c3b0';

    fetch(PostalCodesURL(postalcode)).then(response => response.json()).then(PCodeData => {
      fetch(WeatherURL(PCodeData.lat, PCodeData.lon)).then(response => response.json()).then(WeatherData => {
        fetch(HistoricURL(WeatherData.coord.lat, WeatherData.coord.lon))
        .then(response => response.json()).then(ForecastValue => {

          let Data = new Weather_Forecast_Data(WeatherData, ForecastValue);
          let Item = new InfoItem(Data);
          let Weather = new WeatherItem({ removeItem: RemoveItem, infoItem: Item });
          let name = Item.name;
    
          if (array.map(mappedWeather => mappedWeather.name).includes(name)) {
    
            return
    
          }
          else {
    
            return array.push(Weather);
    
          }
    
        });
      });
    });

  }

  const RemoveItem = (removeName: string): void => {

    array.map(item => {

      if (item.name === removeName) {

        return array.splice(array.indexOf(item), 1);

      }

    });

  }

  const UpdateInfo = () => {

    array.map(item => {

      if (item.weather.updated === true) {
        item.weather.updated = false;
        item.update();
      }
      else {
        item.update();
      }

    });

  }

  return (
    <WeatherContext.Provider value={{
      array,
      AddItem,
      RemoveItem,
      UpdateInfo,
      handleSubmit,
      newLocation,
      setNewLocation,
      LocationInput
    }}>
      {children}
    </WeatherContext.Provider>
  )

}
