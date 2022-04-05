import { useEffect, useState } from 'react';
import { useWeather } from '../Hooks/useWeather';

export const WeatherList = () => {
  
  const { array } = useWeather();

  const [List, setList] = useState({array});

  useEffect(() => {
    let Timeout = setTimeout(()=>{
    setList(({array}) => ({...List, array: array}));
    }, 1);
    return () => clearTimeout(Timeout);
  }, [List]);
  
  return (

    <div className="row justify-content-md-center">
      {
        List.array.map(item => item.render())
      }
    </div>

  )

}
