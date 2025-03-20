import React, { useState } from "react";
import axios from "axios";

const Vote = () => {
  const [internalID, setInternalID] = useState("");
  const [vote, setVote] = useState("");

  const submitVote = async () => {
    if (!internalID || !vote) {
      alert("Please enter your Internal ID and Vote.");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:5000/vote", {
        internal_id: internalID,
        vote,
      });
      alert(response.data.message);
    } catch (error) {
      alert("Voting failed.");
    }
  };

  return (
    <div>
      <h2>Cast Your Vote</h2>
      <input type="text" placeholder="Enter Internal ID" onChange={(e) => setInternalID(e.target.value)} />
      <input type="text" placeholder="Enter Candidate Name" onChange={(e) => setVote(e.target.value)} />
      <button onClick={submitVote}>Submit Vote</button>
    </div>
  );
};

export default Vote;
