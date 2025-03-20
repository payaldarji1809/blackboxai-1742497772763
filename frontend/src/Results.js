import React, { useState, useEffect } from "react";
import axios from "axios";

const Results = () => {
  const [results, setResults] = useState({});

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/results").then((response) => {
      setResults(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Election Results</h2>
      {Object.keys(results).length === 0 ? (
        <p>No results available yet.</p>
      ) : (
        <ul>
          {Object.entries(results).map(([party, count]) => (
            <li key={party}>
              {party}: {count} votes
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Results;
