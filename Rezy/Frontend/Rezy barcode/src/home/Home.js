import React, { useState, useEffect } from 'react';
import './Home.css';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Box from '@mui/material/Box';
import ButtonStyle from '../components/button';
import { useNavigate } from 'react-router-dom';
import BalanceDisplay from './BalanceDisplay.jsx'; // Import the BalanceDisplay component
import qrcode from '../assets/qrcode.jpeg';

function Home() {
  const steps = ['SCAN', 'PACK', 'RECEIVE'];
  const navigate = useNavigate();

  const routeChange = () => {
    navigate('/step1');
  }

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [balance, setBalance] = useState(0); // State to store balance
  

  useEffect(() => {
    fetch('http://localhost:9000/api/data')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
        // Assuming the API response has a 'balance' property, set it here
        if (data && data.balance !== undefined) {
          setBalance(data.balance/100);
        }
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="App">
      <div className="container">
        <label className="subtitle">Welcome to Rezy, an Interledger and Open Payments-based micropayments for!</label>
        <p>Monetize your bottles made of "polyethylene terephthalate" (PET).</p>
        <BalanceDisplay balance={balance} />{/* Display the balance using BalanceDisplay component */}
        <p>My payment pointer is "https://happy-life-bank-backend/recycler1" .</p>
        <img src={qrcode} className="App-qr" alt="logo" />
        <p>3 easy steps</p>
        
        
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
        <ButtonStyle Text="Start!" onClick={routeChange} />
        
        {isLoading ? (
          <p>Loading data...</p>
        ) : (
          <div>
            
           {/*  <ul>
              {data.map((item) => (
                <li key={item.id}>{item.name}</li>
              ))}
            </ul> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
