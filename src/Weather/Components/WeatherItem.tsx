import React, { Fragment } from 'react';
import { useWeather } from '../Hooks/useWeather'
import { ForecastInfo, getDate, InfoItem, WeatherInfo, Weather_Forecast_Data } from '../Interfaces/interfaces'


interface props {
    removeItem: (name: string) => void,
    infoItem: InfoItem
}

export class WeatherItem extends React.Component<props> {

    weather: WeatherInfo;
    forecast: ForecastInfo;
    name: string;
    removeItem: (name: string) => void;

    private WeatherURL = 'https://api.openweathermap.org/data/2.5/weather?lat=' + this.props.infoItem.weather.coord.lat + '&lon=' + this.props.infoItem.weather.coord.lon + '&appid=a1f0abe3eb9fa2d18127cd0ce140c3b0&units=metric';
    private ForecastURL= 'https://api.openweathermap.org/data/2.5/forecast?lat=' + this.props.infoItem.weather.coord.lat + '&lon=' + this.props.infoItem.weather.coord.lon + '&appid=a1f0abe3eb9fa2d18127cd0ce140c3b0&units=metric';

    constructor(props: props) {
        super(props);
        this.weather = props.infoItem.weather;
        this.forecast = props.infoItem.forecast;
        this.name = props.infoItem.weather.name;
        this.removeItem = props.removeItem;
        this.update = this.update.bind(this);
    }

    update() {

        fetch(this.WeatherURL).then(response => response.json()).then(WeatherData => {
            fetch(this.ForecastURL)
            .then(response => response.json()).then(ForecastValue => {
                let Data = new Weather_Forecast_Data(WeatherData, ForecastValue);
                let updatedInfo = new InfoItem(Data);
                this.weather = updatedInfo.weather;
                this.forecast = updatedInfo.forecast;
            });
        });

    }

    render() {

        return (
            <Fragment key={this.name}>
                <div className="col-lg-5 mt-3">
                    <div id="weather" className="card p-3">

                        <h2>{this.weather.name + ', ' + this.weather.sys.country}</h2>
                        <h3 style={{ font: 'italic 20px Arial', color: 'orange' }} >
                            {this.weather.updated ? '\nUpdated' : 'Last update:' + this.forecast.list[0].dt_txt}
                        </h3>

                        <div className="flip-card">

                            <div className="card-body mt-0">
                                <img id="topImage" src={"http://openweathermap.org/img/wn/" + this.weather.weather[0].icon + ".png"} />
                                <div><p id="topTitle" style={{ font: "bold 2em Arial" }}>{this.weather.main.temp + (this.weather.main.temp > 100 ? ' °K' : ' °C')}</p></div>
                                <div className="flip-card-front mt-3 mb-2">
                                    <div><p className="label">Weather:</p><p> {this.weather.weather[0].description} </p></div>
                                    <div><p className="label">Feels like:</p><p> {this.weather.main.feels_like + (this.weather.main.temp_min > 100 ? ' °K' : ' °C')} </p></div>
                                    <div><p className="label">Min:</p><p>  {this.weather.main.temp_min + (this.weather.main.temp_min > 100 ? ' °K' : ' °C')} </p></div>
                                    <div><p className="label">Max:</p><p>  {this.weather.main.temp_max + (this.weather.main.temp_min > 100 ? ' °K' : ' °C')} </p></div>
                                    <div><p className="label">Pressure:</p><p>  {this.weather.main.pressure + ' mbar'} </p></div>
                                    <div><p className="label">Humidity:</p><p>  {this.weather.main.humidity + ' %'} </p></div>
                                    <div><p className="label">Visibility:</p><p>  {this.weather.visibility + ' Feet'} </p></div>
                                    <div><p className="label">Wind Speed:</p><p>  {this.weather.wind.speed + ' Km/h'} </p></div>
                                    <div><p className="label">Wind Direction:</p><p> {this.weather.wind.deg + '°'} </p></div>
                                </div>

                                <div className="row">
                                    <div className="col-sm">
                                        <div className="title">
                                            <img src={"http://openweathermap.org/img/wn/" + this.forecast.list[0].weather[0].icon + ".png"} />
                                            <div> <p className="Date"> {new getDate().getDay()} </p></div>
                                        </div>
                                        <div className="text">
                                            <div><p> {Math.floor(this.forecast.list[0].main.temp) + (this.forecast.list[0].main.temp > 100 ? ' °K' : ' °C')} </p></div>
                                        </div>
                                    </div>
                                    <div className="col-sm">
                                        <div className="title">
                                            <img src={"http://openweathermap.org/img/wn/" + this.forecast.list[8].weather[0].icon + ".png"} />
                                            <div><p className="Date"> {new getDate().nextweek(1)} </p></div>
                                        </div>
                                        <div className="text">
                                            <div><p> {Math.floor(this.forecast.list[8].main.temp) + (this.forecast.list[8].main.temp > 100 ? ' °K' : ' °C')} </p></div>
                                        </div>
                                    </div>
                                    <div className="col-sm">
                                        <div className="title">
                                            <img src={"http://openweathermap.org/img/wn/" + this.forecast.list[16].weather[0].icon + ".png"} />
                                            <div><p className="Date"> {new getDate().nextweek(2)} </p></div>
                                        </div>
                                        <div className="text">
                                            <div><p> {Math.floor(this.forecast.list[16].main.temp) + (this.forecast.list[16].main.temp > 100 ? ' °K' : ' °C')} </p></div>
                                        </div>
                                    </div>
                                    <div className="col-sm">
                                        <div className="title">
                                            <img src={"http://openweathermap.org/img/wn/" + this.forecast.list[24].weather[0].icon + ".png"} />
                                            <div><p className="Date"> {new getDate().nextweek(3)} </p></div>
                                        </div>
                                        <div className="text">
                                            <div><p> {Math.floor(this.forecast.list[24].main.temp) + (this.forecast.list[24].main.temp > 100 ? ' °K' : ' °C')} </p></div>
                                        </div>

                                    </div>
                                </div>

                            </div>

                        </div>

                        <div>
                            <button
                                className="btn btn-secondary"
                                style={{ margin: '5px' }}
                                onClick={() => this.props.removeItem(this.name)}
                            >
                                Remove
                            </button>
                            <button
                                className="btn btn-secondary"
                                onClick={(ev) => this.update()}
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            </Fragment>


        )
    }

}



