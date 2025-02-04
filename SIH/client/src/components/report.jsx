import React, { useState } from 'react';
import { Box, Button, Checkbox, FormControlLabel, Typography, useTheme, TextField, MenuItem, Select } from '@mui/material';
import { DownloadOutlined } from '@mui/icons-material';
import ApexChart from 'react-apexcharts';


const ReportPage = () => {
  const theme = useTheme();
  const [selectedData, setSelectedData] = useState({
    ipList: false,
    ipLog: false,
    graphData: false,
  });
  const [fileType, setFileType] = useState('csv');
  const [predefinedSet, setPredefinedSet] = useState('');

  const handleCheckboxChange = (event) => {
    setSelectedData({
      ...selectedData,
      [event.target.name]: event.target.checked,
    });
  };

  const handleFileTypeChange = (event) => {
    setFileType(event.target.value);
  };

  const handlePredefinedSetChange = (event) => {
    setPredefinedSet(event.target.value);
  };

  const handleDownloadReport = () => {
    // Logic for downloading the selected data
    const fileUrl = '../../src/assets/defautl-file.csv'; // Adjust to your file path
    const link = document.createElement('a');
    link.href = fileUrl;
    link.setAttribute('download', 'report.csv'); // Default file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box sx={{ display: 'flex', padding: '20px' }}>
      {/* Left Side - Data Selection */}
      <Box sx={{ flex: 1, backgroundColor: '#292929', padding: '20px', borderRadius: '8px' }}>
        <Typography variant="h4" sx={{ color: 'white', marginBottom: '20px' }}>
          Report
        </Typography>

        {/* Date Range Selection */}
        <Box sx={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <TextField
            label="From Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            label="To Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Box>

        {/* Data Selection */}
        <Box sx={{ marginBottom: '20px' }}>
          <Typography variant="h6" sx={{ color: 'white' }}>Select Data to Download</Typography>
          <FormControlLabel
            control={<Checkbox name="ipList" checked={selectedData.ipList} onChange={handleCheckboxChange} />}
            label="Requested IPs Data"
            sx={{ color: 'white' }}
          />
          <FormControlLabel
            control={<Checkbox name="ipLog" checked={selectedData.ipLog} onChange={handleCheckboxChange} />}
            label="IP Log Data"
            sx={{ color: 'white' }}
          />
          <FormControlLabel
            control={<Checkbox name="graphData" checked={selectedData.graphData} onChange={handleCheckboxChange} />}
            label="Graph Data"
            sx={{ color: 'white' }}
          />
        </Box>

        {/* File Type Selection */}
        <Box sx={{ marginBottom: '20px' }}>
          <Typography sx={{ color: 'white', marginBottom: '10px' }}>Select File Type</Typography>
          <Select
            value={fileType}
            onChange={handleFileTypeChange}
            sx={{ color: 'white', backgroundColor: '#333333', borderRadius: '4px' }}
            fullWidth
          >
            <MenuItem value="csv">CSV</MenuItem>
            <MenuItem value="xls">XLS</MenuItem>
            <MenuItem value="pdf">PDF</MenuItem>
          </Select>
        </Box>

        {/* Predefined Custom Set of Data */}
        <Box sx={{ marginBottom: '20px' }}>
          <Typography sx={{ color: 'white', marginBottom: '10px' }}>Predefined Custom Set</Typography>

          <Box sx={{ marginBottom: '10px' }}>
            <FormControlLabel
              control={<Checkbox checked={predefinedSet === 'allChartData'} onChange={() => setPredefinedSet('allChartData')} />}
              label="All Chart Data"
              sx={{ color: 'white' }}
            />
            {predefinedSet === 'allChartData' && (
              <Button
                onClick={handleDownloadReport}
                sx={{
                  backgroundColor: theme.palette.secondary.light  ,
                  color: theme.palette.background.alt,
                  fontSize: '14px',
                  fontWeight: 'bold',
                  padding: '6px 12px',
                  marginLeft: '10px',
                  '&:hover': {
                    backgroundColor: 'white', // Change to white on hover
                    color: 'black', // Change text color to black
                  },
                }}
              >
                Download All Chart Data
              </Button>
            )}
          </Box>

          <Box sx={{ marginBottom: '10px' }}>
            <FormControlLabel
              control={<Checkbox checked={predefinedSet === 'onlyLogData'} onChange={() => setPredefinedSet('onlyLogData')} />}
              label="Only Log Data"
              sx={{ color: 'white' }}
            />
            {predefinedSet === 'onlyLogData' && (
              <Button
                onClick={handleDownloadReport}
                sx={{
                  backgroundColor: theme.palette.secondary.light,
                  color: theme.palette.background.alt,
                  fontSize: '14px',
                  fontWeight: 'bold',
                  padding: '6px 12px',
                  marginLeft: '10px',
                  '&:hover': {
                    backgroundColor: 'white', // Change to white on hover
                    color: 'black', // Change text color to black
                  },
                }}
              >
                Download Only Log Data
              </Button>
            )}
          </Box>

          <Box>
            <FormControlLabel
              control={<Checkbox checked={predefinedSet === 'trafficSpikes'} onChange={() => setPredefinedSet('trafficSpikes')} />}
              label="Traffic Spikes"
              sx={{ color: 'white' }}
            />
            {predefinedSet === 'trafficSpikes' && (
              <Button
                onClick={handleDownloadReport}
                sx={{
                  backgroundColor: theme.palette.secondary.light,
                  color: theme.palette.background.alt,
                  fontSize: '14px',
                  fontWeight: 'bold',
                  padding: '6px 12px',
                  marginLeft: '10px',
                  '&:hover': {
                    backgroundColor: 'white', // Change to white on hover
                    color: 'black', // Change text color to black
                  },
                }}
              >
                Download Traffic Spikes Data
              </Button>
            )}
          </Box>
        </Box>
      </Box>

      {/* Right Side - Performance Chart */}
      <Box sx={{ flex: 1, padding: '20px' }}>
        <Button
          onClick={handleDownloadReport}
          sx={{
            backgroundColor: theme.palette.secondary.light,
            color: theme.palette.background.alt,
            fontSize: '16px',
            fontWeight: 'bold',
            padding: '12px 24px',
            marginBottom: '30px',
            '&:hover': {
              backgroundColor: 'white', // Change to white on hover
              color: 'black', // Change text color to black
            },
          }}
        >
          <DownloadOutlined sx={{ mr: '10px' }} />
          Download Reports
        </Button>

        {/* Performance Chart */}
        <ApexChart
  options={{
    chart: {
      type: 'pie',
      toolbar: {
        show: true,
      },
    },
    labels: ['Memory Usage', 'CPU Usage'],
    legend: {
      labels: {
        colors: '#FFFFFF', // Set legend text color to white
      },
    },
    // Optionally set colors for the pie segments
    colors: ['#008FFB', '#FF4560'], // Default colors for pie chart segments
  }}
  series={[60, 40]}
  type="pie"
  width="500" // Increased width
  height="400" // Increased height for better visibility
/>

      </Box>
    </Box>
  );
};

export default ReportPage;
