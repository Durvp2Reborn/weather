
import { useState} from "react";

import './App.css'
import {useAutoComplete} from "./hooks.tsx";


function App() {

    const [searchTerm, setSearchTerm] = useState<string>('');
    const results = useAutoComplete(searchTerm);

    return (
        <>
            <div id="container">
                <input id="bar" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search by city..." />
                {results.length > 0 && (
                    <ul>
                        {results.map((result, i) =>
                            (<li key={i} id="bullets">
                                <button id="results" onClick={() => setSearchTerm(result.formatted)} >{result.formatted}</button>
                            </li>))}
                    </ul>
                )}
            </div>


        </>
    )
}

export default App