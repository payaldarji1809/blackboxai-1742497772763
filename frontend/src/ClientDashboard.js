import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RegisterVoter from "./RegisterVoter";
import {
  Container,
  Typography,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import BarChartIcon from "@mui/icons-material/BarChart";

const ClientDashboard = () => {
  const navigate = useNavigate();
  const [voters, setVoters] = useState();
  const [voteStats, setVoteStats] = useState();
  const [govIDs, setGovIDs] = useState("");
  const token = localStorage.getItem("client_token"); // 🔥 Retrieve JWT Token


  // Fetch Voters List
  useEffect(() => {
    if (token) {
      axios
        .get("http://127.0.0.1:5000/get_voters", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log("Voters response:", response.data); // Debugging
          if (Array.isArray(response.data)) {
            setVoters(response.data);
          } else {
            setVoters([]); // Ensure no crash if API returns unexpected format
          }
        })
        .catch((error) => {
          console.error("Error fetching voters:", error.response?.data || error);
        });
    }
  }, [token]);

  // Fetch Voting Statistics
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/results")
      .then((response) => {
        setVoteStats(response.data);
      })
      .catch((error) => console.error("Error fetching vote results", error));
  }, []);

  // Handle Voter Registration
  const registerVoter = async () => {
    if (!govIDs) {
      alert("Please enter government IDs.");
      return;
    }  
  };

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem("client_token"); // 🔥 Remove Token on Logout
    navigate("/client");
  };

  return (
    <>
      <Container maxWidth="lg">
        {/* Dashboard Header */}
        <Paper elevation={3} sx={{ padding: 3, marginBottom: 3, textAlign: "center" }}>
          <Typography variant="h4">
            Welcome,
            {/* {client.name} */}
          </Typography>
          <Typography variant="h6">
            {/* {client.organization} */}
          </Typography>
          <Button
            variant="contained"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{ marginTop: 2 }}
          >
            Logout
          </Button>
        </Paper>

        {/* Dashboard Sections */}
        {/* <Grid container spacing={3}>
      {/* Voting Statistics */}
        <Grid item xs={12} md={6}>
          <Card sx={{ background: "#f1f8e9" }}>
            <CardContent>
              <Typography variant="h5" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <BarChartIcon /> Voting Statistics
              </Typography>
              <List>
                {Object.keys ? (
                  <Typography>No votes yet.</Typography>
                ) :
                  (
                    Object.entries(voteStats).map(([candidate, count]) => (
                      <ListItem key={candidate}>
                        <ListItemText primary={`${candidate}: ${count} votes`} />
                      </ListItem>
                    ))
                  )}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <RegisterVoter />
      </Container></>
  );
};

export default ClientDashboard;
