import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
} from "@mui/material";

const RegisterVoter = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [govID1, setGovID1] = useState("");
  const [govID2, setGovID2] = useState("");
  const [govID3, setGovID3] = useState("");
  const [govID4, setGovID4] = useState("");
  const [token, setToken] = useState("");
  const [qrCode, setQRCode] = useState("");

  const handleRegister = async () => {
    if (!firstName || !lastName || !email || !dob || !address || !govID1) {
      alert("Please fill in all required fields.");
      return;
    }
  
    const token = localStorage.getItem("client_token"); // 🔥 Retrieve stored JWT token
  
    if (!token) {
      alert("User is not authenticated. Please log in first.");
      return;
    }
  
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/register_voter",
        {
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          email: email.trim(),
          dob: dob.trim(),
          address: address.trim(),
          gov_ids: [govID1, govID2, govID3, govID4].filter(Boolean), // Remove empty values
        },
        {
          headers: {
            "Content-Type": "application/json", // Ensure JSON format
            Authorization: `Bearer ${token}`, // ✅ Include JWT token
          },
        }
      );
  
      setToken(response.data.token);
      setQRCode(response.data.qr_code);
      alert("Voter Registered Successfully!");
    } catch (error) {
      console.error("❌ Registration failed:", error.response?.data || error);
      alert("Registration failed: " + (error.response?.data?.message || "Unknown error"));
    }
  };
  
  

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, textAlign: "center", marginTop: 5 }}>
        <Typography variant="h4">Voter Registration</Typography>
        <Grid container spacing={2} marginTop={2}>
          <Grid item xs={6}>
            <TextField fullWidth label="First Name" variant="outlined" onChange={(e) => setFirstName(e.target.value)} />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Last Name" variant="outlined" onChange={(e) => setLastName(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Email Address" variant="outlined" onChange={(e) => setEmail(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth type="date" variant="outlined" onChange={(e) => setDob(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Address" variant="outlined" onChange={(e) => setAddress(e.target.value)} />
          </Grid>

          {/* Government IDs */}
          <Grid item xs={12}>
            <Typography variant="h6">Government IDs (at least one required)</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Gov ID 1" variant="outlined" onChange={(e) => setGovID1(e.target.value)} />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Gov ID 2" variant="outlined" onChange={(e) => setGovID2(e.target.value)} />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Gov ID 3" variant="outlined" onChange={(e) => setGovID3(e.target.value)} />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Gov ID 4" variant="outlined" onChange={(e) => setGovID4(e.target.value)} />
          </Grid>

          {/* Register Button */}
          <Grid item xs={12} marginTop={2}>
            <Button fullWidth variant="contained" color="primary" onClick={handleRegister}>
              Register Voter
            </Button>
          </Grid>
        </Grid>

        {/* Display Token & QR Code */}
        {token && (
          <Paper elevation={3} sx={{ padding: 2, marginTop: 3, textAlign: "center" }}>
            <Typography variant="h6">Your Unique Token:</Typography>
            <Typography variant="body1" sx={{ wordBreak: "break-word" }}>{token}</Typography>
            <Typography variant="h6" marginTop={2}>QR Code:</Typography>
            <img src={`http://127.0.0.1:5000/${qrCode}`} alt="QR Code" />
          </Paper>
        )}
      </Paper>
    </Container>
  );
};

export default RegisterVoter;
