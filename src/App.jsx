import React, { useState } from "react";
import reactLogo from "./assets/react.svg?react=true";
import viteLogo from "./assets/vite.svg?react=true";
import "./App.css";
import Mynsweepr from "./mynsweepr/mynsweepr.jsx";
import { NavLink } from "react-router";

function App() {
  const [count, setCount] = useState(0);

        return (
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
                Edit <code>src/App.jsx</code> and save to test HMR.
              </p>
              <p>Test.</p>
            </div>
            <p className="read-the-docs">
              Click on the Vite and React logos to learn more
            </p>
            <p>
              <NavLink to="/mynsweepr">Mynsweepr</NavLink>
            </p>
          </>
        );
}

export default App;
