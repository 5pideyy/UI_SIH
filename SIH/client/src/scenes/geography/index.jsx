import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Switch,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
  Slider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DownloadIcon from "@mui/icons-material/Download";
import SecurityIcon from "@mui/icons-material/Security";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Footer from "components/footer";

const mockData = {
  legit_req: 150,
  bad_nonce: 10,
  total_req: 160,
  prob_solved: 7,
  requestLog: [
    { ip: "192.168.1.1", time: "12:00 PM", nonceStatus: "Success" },
    { ip: "192.168.1.2", time: "12:05 PM", nonceStatus: "Failed" },
  ],
};

const Geography = () => {
  const [nonceEnabled, setNonceEnabled] = useState(true);
  const [alertActive, setAlertActive] = useState(false);
  const [nonceDifficulty, setNonceDifficulty] = useState(5);

  // Toggle nonce verification and security alerts
  const handleNonceToggle = () => setNonceEnabled(!nonceEnabled);
  const handleAlertToggle = () => setAlertActive(!alertActive);

  // Handle Nonce Difficulty Change
  const handleDifficultyChange = (event, value) => {
    setNonceDifficulty(value);
  };

  return (
    <Box sx={{ backgroundColor: "#1E1E1E", minHeight: "100vh", padding: "2rem" }}>
      <Typography variant="h4" color="#00E5FF" textAlign="center" mb={4}>
        Nonce Monitoring Dashboard
      </Typography>

      {/* Nonce Control */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" color="primary">
            Nonce Algorithm Control
          </Typography>
          <FormControlLabel
            control={<Switch checked={nonceEnabled} onChange={handleNonceToggle} />}
            label={nonceEnabled ? "Nonce Enabled" : "Nonce Disabled"}
          />
        </CardContent>
      </Card>

      {/* Nonce Difficulty */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" color="primary">
            Adjust Nonce Difficulty
          </Typography>
          <Slider
            value={nonceDifficulty}
            onChange={handleDifficultyChange}
            min={1}
            max={10}
            step={1}
            valueLabelDisplay="auto"
            sx={{
              color: "#00E5FF",
              '& .MuiSlider-thumb': {
                backgroundColor: '#00E5FF',
              },
              '& .MuiSlider-track': {
                backgroundColor: '#00E5FF',
              },
            }}
          />
          <Typography variant="body2" color="#FFFFFF" mt={1}>
            Current Difficulty: {nonceDifficulty}
          </Typography>
        </CardContent>
      </Card>

      {/* Security Alerts Toggle */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" color="primary">
            Security Alerts
          </Typography>
          <FormControlLabel
            control={<Switch checked={alertActive} onChange={handleAlertToggle} />}
            label={alertActive ? "Alerts Enabled" : "Alerts Disabled"}
          />
        </CardContent>
      </Card>

      {alertActive && (
        <Alert severity="warning" sx={{ mb: 4, fontWeight: 'bold', fontSize: '16px', borderRadius: '5px' }}>
          High volume of failed nonce attempts detected!
        </Alert>
      )}

      {/* Nonce Stats */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Legitimate Requests
              </Typography>
              <Typography variant="h5" color="success.main">
                {mockData.legit_req}
              </Typography>
              <CheckCircleIcon color="success" />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Bad Nonces Blocked
              </Typography>
              <Typography variant="h5" color="error.main">
                {mockData.bad_nonce}
              </Typography>
              <SecurityIcon color="error" />
            </CardContent>
          </Card>
        </Grid>

        {/* Nonce Request Log */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="primary">
                Real-Time Request Log
              </Typography>
              <Box>
                {mockData.requestLog.map((log, idx) => (
                  <Typography key={idx} sx={{ color: log.nonceStatus === "Success" ? "green" : "red" }}>
                    {log.ip} - {log.time} - {log.nonceStatus}
                  </Typography>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Nonce Difficulty History */}
      <Accordion sx={{ mt: 4, mb: 4 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography color="primary">Nonce Difficulty History</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography color="white">
            • Previous difficulty: 5 — Success rate: 90% <br />
            • Previous difficulty: 7 — Success rate: 85%
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Download Report */}
      <Box display="flex" justifyContent="center" mt={3} mb={4}>
      <Button
  variant="outlined"
  color="secondary"
  startIcon={<DownloadIcon />}
  sx={{
    width: "240px",
    height: "50px",
    fontSize: "16px",
    fontWeight: "500",
    textTransform: "none",
    whiteSpace: "nowrap", // Ensures text doesn't wrap
    backgroundColor: "transparent",
    border: "2px solid #00E5FF",
    color: "#00E5FF",
    borderRadius: "10px",
    transition: "background-color 0.3s, color 0.3s",
    "&:hover": {
      backgroundColor: "#00E5FF",
      color: "#FFFFFF",
    },
    mt: 3,
    mb: 4,
  }}
>
  Generate Nonce Report
</Button>



      </Box>

      <Footer />
    </Box>
  );
};

export default Geography;
