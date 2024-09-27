import { Box, Typography, LinearProgress, Button, Alert, Grid } from "@mui/material";
import { Line } from "react-chartjs-2";
import ReplayIcon from "@mui/icons-material/Replay";
import React, { useEffect, useRef, useState } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import Footer from "components/footer";
import moment from "moment";
import Countdown from "react-countdown";

// Register Chart.js components
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const trafficData = {
  labels: ["Before Attack", "During Attack", "After Recovery"],
  datasets: [
    {
      label: "Traffic Volume (Mbps)",
      data: [500, 2500, 450],
      borderColor: "rgba(75,192,192,1)",
      backgroundColor: "rgba(75,192,192,0.2)",
      fill: true,
      tension: 0.4,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      ticks: {
        color: '#FFFFFF',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
      grid: {
        display: false,
      },
    },
    y: {
      ticks: {
        color: '#FFFFFF',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.1)',
      },
    },
  },
  plugins: {
    legend: {
      labels: {
        color: '#FFFFFF',
        font: {
          size: 16,
        },
      },
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      titleFont: {
        size: 14,
      },
      bodyFont: {
        size: 12,
      },
    },
  },
};

// Countdown Timer Component
const CountdownRenderer = ({ hours, minutes, seconds }) => (
  <span>{hours}h {minutes}m {seconds}s</span>
);

const RecoveryPage = () => {
  const chartRef = useRef(null);
  const [chartReady, setChartReady] = useState(false);
  const [recoveryStartTime] = useState(Date.now());
  const [etr] = useState(moment().add(10, "minutes")); // Simulated ETR

  useEffect(() => {
    setChartReady(true);
    return () => {
      if (chartRef.current && chartRef.current.chartInstance) {
        chartRef.current.chartInstance.destroy();
      }
    };
  }, []);

  return (
    <Box sx={{ backgroundColor: "#1E1E1E", height: "100vh", p: { xs: 2, md: 5 } }}>
      <Typography variant="h4" color="#00E5FF" mb={4} textAlign="center" sx={{ fontWeight: 'bold' }}>
        NOVA Shield Recovery Dashboard
      </Typography>

      <Alert severity="info" sx={{ mb: 4, borderRadius: 1 }}>
        Automatic recovery is in progress. Services are being restored to their previous stable state.
      </Alert>

      {/* Recovery Progress */}
      <Grid container spacing={4} justifyContent="center" mb={6}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" color="#00E5FF" sx={{ fontWeight: 'bold' }}>
            Overall Recovery Progress
          </Typography>
          <LinearProgress
            variant="determinate"
            value={80}
            sx={{
              height: 12,
              borderRadius: 1,
              boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
              animation: "progress 1s ease-out",
            }}
          />
          <Typography variant="body2" color="#FFFFFF" mt={1}>
            80% completed
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="h6" color="#00E5FF" sx={{ fontWeight: 'bold' }}>
            Snapshot Rollback Progress
          </Typography>
          <LinearProgress
            variant="determinate"
            value={70}
            sx={{
              height: 12,
              borderRadius: 1,
              boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
              animation: "progress 1s ease-out",
            }}
          />
          <Typography variant="body2" color="#FFFFFF" mt={1}>
            70% rollback completed
          </Typography>
        </Grid>
      </Grid>

      {/* Recovery Timeline */}
      <Typography variant="h6" color="#00E5FF" mb={2} sx={{ fontWeight: 'bold' }}>
        Recovery Timeline
      </Typography>
      <Typography variant="body2" color="#FFFFFF" gutterBottom>
        <AccessTimeIcon /> Snapshot initiated at {moment(recoveryStartTime).format("hh:mm A")}
      </Typography>
      <Typography variant="body2" color="#FFFFFF" gutterBottom>
        <CheckCircleIcon /> Service restoration at {moment(recoveryStartTime).add(5, "minutes").format("hh:mm A")}
      </Typography>
      <Typography variant="body2" color="#FFFFFF">
        <ErrorIcon /> Full recovery expected by <Countdown date={etr} renderer={CountdownRenderer} />
      </Typography>

      {/* Retry Button */}
      <Button
        variant="contained"
        color="primary"
        startIcon={<ReplayIcon />}
        sx={{
          mt: 4,
          boxShadow: "0px 2px 10px rgba(0,0,0,0.3)",
          '&:hover': {
            backgroundColor: "#00bfff",
          },
        }}
      >
        Retry Recovery
      </Button>

      {/* Traffic Overview */}
      {chartReady && (
        <Box sx={{ mt: 6 }}>
          <Typography variant="h6" color="#00E5FF" gutterBottom sx={{ fontWeight: 'bold' }}>
            Traffic Overview
          </Typography>
          <Box sx={{ height: 400 }}>
            <Line ref={chartRef} data={trafficData} options={chartOptions} />
          </Box>
        </Box>
      )}

      <Footer />
    </Box>
  );
};

export default RecoveryPage;
