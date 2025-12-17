import {useState, useEffect} from "react";

export function useWeather(lat?: number, lon?: number) {
    const [weather, setWeather] = useState<any | null>(null);

    useEffect(() => {
        if (!lat || !lon) return;
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_min,temperature_2m_max,sunrise,sunset,uv_index_max,precipitation_sum,precipitation_hours,precipitation_probability_max,apparent_temperature_max,apparent_temperature_min,wind_speed_10m_max,wind_gusts_10m_max&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,weather_code,visibility,wind_speed_10m,wind_direction_10m,wind_gusts_10m,precipitation,uv_index,is_day&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,wind_speed_10m,wind_direction_10m,wind_gusts_10m,precipitation,weather_code&timezone=auto&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch`)
            .then((res) => res.json())
            .then((data) => setWeather(data))
            .catch(() => setWeather(null));
    },[lat,lon]);
    return weather;

}

export function useLocation(searchTerm: string) {
    const [coords, setCoords] =  useState<{ lat: number; lon: number } | null>( null );
    useEffect(()=> {
        if(!searchTerm) return;
        fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(searchTerm)}&lang=en&limit=1&type=city&filter=countrycode:us&format=json&apiKey=b8568cb9afc64fad861a69edbddb2658`)
            .then((res) => res.json())
            .then((data) => {
                if(data.results && data.results.length > 0){
                    const r = data.results[0];
                    setCoords({ lat: r.lat, lon: r.lon });
                }
            })
            .catch(() => setCoords(null));
    },[searchTerm])

    return coords;
}


export function useAutoComplete(searchTerm: string) {
    const [results, setResults]= useState<any[]>([]);
    useEffect(()=> {
        if (searchTerm.length < 2) {
            setResults([]);
            return;
        }
        fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(searchTerm)}&type=city&limit=10&filter=countrycode%3Aus&format=json&apiKey=b8568cb9afc64fad861a69edbddb2658`)
            .then((res) => res.json())
            .then((data) => setResults(data.results || []))
            .catch(() => setResults([]));
    },[searchTerm])
    return results;
}