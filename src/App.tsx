import { OptionList } from "./Weather/Components/LocationsList";
import "./App.css";
import { WeatherProvider } from "./Weather/Context/WeatherProvider";
import Canvas from "./Weather/Components/Canvas";
import { Footer } from "./Weather/Components/Footer";
import { WeatherList } from "./Weather/Components/WeatherList";



function App(): JSX.Element {

  return (
    <WeatherProvider>
      <Canvas />
      <OptionList />
      <WeatherList />
      <Footer />
    </WeatherProvider>
  );

}

export default App;
