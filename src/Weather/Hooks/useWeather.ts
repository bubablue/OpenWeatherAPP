import { useContext } from "react"
import { WeatherContext } from "../Context/WeatherContext"

export const useWeather = () => useContext(WeatherContext);