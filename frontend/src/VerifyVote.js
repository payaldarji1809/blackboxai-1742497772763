import React, { useState } from "react";
import axios from "axios";

const VerifyVote = () => {
  const [internalID, setInternalID] = useState("");
  const [confirmationKey, setConfirmationKey] = useState("");

  const verifyVote = async () => {
    if (!internalID) {
      alert("Please enter your Internal ID.");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:5000/verify_vote", {
        internal_id: internalID,
      });
      setConfirmationKey(response.data.confirmation_key);
      alert("Vote Verified Successfully!");
    } catch (error) {
      alert("Verification failed. No vote found.");
    }
  };

  return (
    <div>
      <h2>Verify Your Vote</h2>
      <input type="text" placeholder="Enter Internal ID" onChange={(e) => setInternalID(e.target.value)} />
      <button onClick={verifyVote}>Verify</button>
      {confirmationKey && (
        <div>
          <h3>Your Vote Confirmation Key:</h3>
          <p>{confirmationKey}</p>
        </div>
      )}
    </div>
  );
};

export default VerifyVote;
