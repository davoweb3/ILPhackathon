import React, { useState, useEffect } from 'react';
import './Home.css';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Box from '@mui/material/Box';
import ButtonStyle from '../components/button';
import { useNavigate } from 'react-router-dom';
import BalanceDisplay from './BalanceDisplay.jsx';
import qrcode from '../assets/qrcode.jpeg';

function Home() {
  const steps = ['VERIFY', 'SCAN', 'PAY'];
  const navigate = useNavigate();

  const routeChange = () => {
    navigate('/step1');
  }

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    fetch('http://localhost:3500/scanned-data')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
        if (data && data.balance !== undefined) {
          setBalance(data.balance);
        }
      })
      .catch((error) => console.error('Error fetching data:', error));

    // Fetch the additional endpoint
   // Fetch the additional endpoint
fetch('http://localhost:9000/api/data2')
.then((response) => response.json())
.then((data) => {
  // Assuming the API response has a 'balance' property, set it here
  if (data && data.balance !== undefined) {
    setBalance(data.balance); // Update the 'balance' state with the correct data
  }
})
.catch((error) => console.error('Error fetching additional data:', error));

  }, []);

  const formattedData = data.join(', ');

  return (
    <div className="App">
      <div className="container">
 
        <label className="title">Acme Recycling Company!</label>
        <BalanceDisplay balance={balance} />{/* Display the balance using BalanceDisplay component */}
        <p>My payment pointer is "https://cloud-nine-wallet-backend/accounts/gfranklin"</p>
        
       
        <img src={qrcode} className="App-qr" alt="logo" />

        <Box sx={{ width: '80%' }}>
          <Stepper activeStep={0} alternativeLabel>
            {steps.map((label, index) => (
              <Step
                key={index}
                sx={{
                  '& .MuiStepLabel-root .Mui-completed': {
                    color: 'secondary.dark',
                  },
                  '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel': {
                    color: 'grey.500',
                  },
                  '& .MuiStepLabel-root .Mui-active': {
                    color: '#8bc34a',
                  },
                  '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel': {
                    color: 'common.black',
                  },
                  '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
                    fill: 'black',
                  },
                }}
              >
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <ButtonStyle Text="Approve the order!" onClick={routeChange} />

        {isLoading ? (
          <p>Loading data...</p>
        ) : (
          <div>
            <p>Incoming Order: {formattedData}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
