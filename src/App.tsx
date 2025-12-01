import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
    useEffect(() => {
        fetch("https://api.geoapify.com/v1/geocode/search?text=${searchedValue}&lang=en&limit=1&type=city&filter=countrycode:us&format=json&apiKey=b8568cb9afc64fad861a69edbddb2658"+searchTerm+"+in:login")
            .then((response) => response.json())
            .then((data) => {
                if(data.items != null)  setUssr(data.items);
                console.log(data);
            })
            .catch((error) => console.log(error));
    }, [searchTerm]);
    etch("https://api.geoapify.com/v1/geocode/search?text=${searchedValue}&lang=en&limit=1&type=city&filter=countrycode:us&format=json&apiKey=b8568cb9afc64fad861a69edbddb2658"+searchTerm+"+in:login")
        .then((response) => response.json())
        .then((data) => {
            if(data.items != null)  setUssr(data.items);
            console.log(data);
        })
        .catch((error) => console.log(error));
}, [searchTerm]);
etch("https://api.geoapify.com/v1/geocode/search?text=${searchedValue}&lang=en&limit=1&type=city&filter=countrycode:us&format=json&apiKey=b8568cb9afc64fad861a69edbddb2658"+searchTerm+"+in:login")
    .then((response) => response.json())
    .then((data) => {
        if(data.items != null)  setUssr(data.items);
        console.log(data);
    })
    .catch((error) => console.log(error));
}, [searchTerm]);


    return(
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
