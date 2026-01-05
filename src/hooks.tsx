import {useEffect, useState} from "react";
import type {WeatherTypes} from "./weatherTypes.ts";


export function useAutoComplete(searchTerm:string){
    const [auto,setAuto] = useState<{ formatted:string }[]>([]);

    useEffect(() => {
        fetch("https://api.geoapify.com/v1/geocode/autocomplete?text="+searchTerm+"&type=city&limit=10&filter=countrycode%3Aus&format=json&apiKey=b8568cb9afc64fad861a69edbddb2658")
            .then((response) => response.json())
            .then((data) => {

                console.log(data);
                setAuto(data.results);
            })
            .catch((error) => console.log(error));
    }, [searchTerm]);

    return auto;
}

export function useLocation(CitySearchResult:string){
    const [loc,setLoc] = useState<{ lat:number, lon:number }>({lat: 0, lon:0});



    useEffect(()=>{

        fetch("https://api.geoapify.com/v1/geocode/search?text="+CitySearchResult+"&lang=en&limit=1&type=city&filter=countrycode:us&format=json&apiKey=b8568cb9afc64fad861a69edbddb2658")
            .then((response) => response.json())
            .then((data) => {
setLoc(data.results[0]);
                console.log(data);
            })
            .catch((error) => console.log(error));
    }, [CitySearchResult]);
    return [loc.lat, loc.lon];
}

export function useWeather(lat:number,lon:number){
const [weather,setWeather] = useState<WeatherTypes | null>(null);

    useEffect(() => {
        if (!lat || !lon) return;

        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_min,temperature_2m_max,sunrise,sunset,uv_index_max,precipitation_sum,precipitation_hours,precipitation_probability_max,apparent_temperature_max,apparent_temperature_min,wind_speed_10m_max,wind_gusts_10m_max&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,weather_code,visibility,wind_speed_10m,wind_direction_10m,wind_gusts_10m,precipitation,uv_index,is_day&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,wind_speed_10m,wind_direction_10m,wind_gusts_10m,precipitation,weather_code&timezone=auto&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch`)
            .then(res => res.json())
            .then((data) => {
                setWeather({
                    current: data.current,
                    daily: data.daily,
                    hourly: data.hourly
                });
            })
            .catch(console.error);

    }, [lat, lon]);

    return weather;
}


