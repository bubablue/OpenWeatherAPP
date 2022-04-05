export interface Location {
  zip: string;
  name: string;
  lat: number;
  lon: number;
  country: string;
}

// ------------------- For Bulk List ------------------- //

export type Root = Root2[];
export interface Root2 {
  coord: {
    lat: number;
    lon: number;
  };
  country: string;
  id: number;
  name: string;
  state: string;
}
export interface Coord {
  lat: number;
  lon: number;
}

export class Weather {
  id: number;
  name: string;
  state: string;
  country: string;
  coord: Coord;

  constructor(element: Root2) {
    this.id = element.id;
    this.name = element.name;
    this.state = element.state;
    this.country = element.country;
    this.coord = element.coord;
  }
}

export class Convert {
  public static toRoot(json: string): Root {
    return JSON.parse(json);
  }
}

// --------------------------------------- //

export interface WeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: string;
    main: string;
    description: string;
    icon: HTMLSourceElement;
  }>;
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    message: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}
export interface WeatherDataExtended extends WeatherData {
  updated: boolean;
}
export class WeatherInfo implements WeatherDataExtended {
  coord: { lon: number; lat: number };
  weather: {
    id: string;
    main: string;
    description: string;
    icon: HTMLSourceElement;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: { speed: number; deg: number };
  clouds: { all: number };
  dt: number;
  sys: {
    type: number;
    id: number;
    message: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
  updated: boolean;

  constructor(weather: WeatherData) {
    this.base = weather.base;
    this.clouds = weather.clouds;
    this.cod = weather.cod;
    this.coord = weather.coord;
    this.dt = weather.dt;
    this.id = weather.id;
    this.main = weather.main;
    this.name = weather.name;
    this.sys = weather.sys;
    this.timezone = weather.timezone;
    this.updated = true;
    this.visibility = weather.visibility;
    this.weather = weather.weather;
    this.wind = weather.wind;
  }
}

export interface ForecastData {
  cod: number;
  message: number;
  cnt: number;
  list: Array<{
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    clouds: {
      all: number;
    };
    wind: {
      speed: number;
      deg: number;
      gust: number;
    };
    visibility: number;
    pop: number;
    sys: {
      pod: string;
    };
    dt_txt: string;
  }>;
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}
export class ForecastInfo implements ForecastData {

  cod: number;
  message: number;
  cnt: number;
  list: {
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
    };
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
    clouds: {
      all: number;
    };
    wind: {
      speed: number;
      deg: number;
      gust: number;
    };
    visibility: number;
    pop: number;
    sys: {
      pod: string;
    };
    dt_txt: string;
  }[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };

  constructor(item: ForecastData) {
    this.cod = item.cod;
    this.message = item.message;
    this.cnt = item.cnt;
    this.list = item.list;
    this.city = item.city;
  }

}

export class Weather_Forecast_Data {
  weather: WeatherData;
  forecast: ForecastData;
  constructor(weatherIt: WeatherData, forecastIt: ForecastData) {
    this.weather = weatherIt;
    this.forecast = forecastIt;
  }
}
export class InfoItem {
  forecast: ForecastInfo;
  weather: WeatherInfo;
  name: string;

  constructor(Data: Weather_Forecast_Data) {
    const forecastValue = new ForecastInfo(Data.forecast)
    const weatherValue = new WeatherInfo(Data.weather)
    this.weather = weatherValue;
    this.forecast = forecastValue;
    this.name = Data.weather.name;
  }
 
}



export class getDate {

  nextweek(x: number){
    var today = new Date();
    var nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate()+x);
    var WDays: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];  
    var nextDay = WDays[nextweek.getDay()]; 
    return nextDay;
  }
  getDate()  
  {  
  var date = new Date();  
  return date.getDate();
  }  
  getDay()  
  {  
  var WDays: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];  
  var Day = new Date();  
  var Today = WDays[Day.getDay()];  
  return Today;
  }

}