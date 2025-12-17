import { useState } from "react";

import './App.css';
import { useAutoComplete } from "./hooks.tsx";

function App() {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const results = useAutoComplete(searchTerm); // Assuming results is an array of strings

    return (
        <div id="container">
            <input
                id="bar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by city..."
            />
            {results.length > 0 && (
                <ul>
                    {results.map((result, i) => (
                        <li key={i} id="bullets">
                            <button
                                id="results"
                                onClick={() => setSearchTerm(result)} // Use result directly if it's a string
                            >
                                {result} {/* Display the result string */}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default App;