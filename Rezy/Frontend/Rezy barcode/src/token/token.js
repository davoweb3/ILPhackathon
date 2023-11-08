import React, { useState, useEffect } from 'react';
import QrReader from 'react-qr-reader';
import { Grid, Checkbox } from '@material-ui/core'; // Import Checkbox
import { useNavigate } from 'react-router-dom';
import ButtonStyle from '../components/button';
import ModalInfo from '../components/InfoModal';

function Token() {
  const [data, setData] = useState('No result');
  const [token, setToken] = useState('');
  const [open, setOpen] = useState(false);
  const [scannedResult, setScannedResult] = useState(''); // State variable to store scanned result
  const [isConfirmed, setIsConfirmed] = useState(false); // State variable for checkbox
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
    navigate('/');
  };

  const postToToken = (result) => {
    // Convert the scanned result to a JSON string
    const requestData = JSON.stringify({
      result
    });
    console.log(requestData);
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: requestData, // Send the JSON string as the request body
    };

    let url = 'http://127.0.0.1:3500/scan'; // Replace with your actual API URL
    fetch(url, config)
      .then((response) => response.json())
      .then((val) => {
        if ('receipt' in val) {
          console.log(val);
          setOpen(true);
        } else {
          setData(val.code);
        }
      })
      .catch((err) => {
        setData(err);
        setOpen(false);
      });
  };

  const handleErrorWebCam = (error) => {
    console.log(error);
  };

  const handleScanWebCam = (result) => {
    if (result) {
      setData(`Your pack contains: ${result}`);
      setToken(result);
      setScannedResult(result); // Store the scanned result in the state variable
      console.log(scannedResult);
    }
  };

  const handleClaim = () => {
    if (scannedResult && isConfirmed) {
      // Check the state variable for the scanned result and the checkbox state
      if (!open) {
        setOpen(true);
        postToToken(scannedResult); // Send the scanned result to the API
      }
    }
  };

  // Set up a timer to navigate to the home page after 20 seconds of inactivity
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 50000); // 20 seconds in milliseconds

    return () => {
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div className="App">
      <div className="container">
        <label className="title">Step 3</label>
        <p>Scan the QR code in the front of the bag and deliver your bag to the closest agent in your neighborhood</p>
        <Grid container style={{ width: window.innerWidth < 1000 ? '100%' : '25%' }}>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <QrReader
              delay={300}
              style={{ width: '100%' }}
              onError={handleErrorWebCam}
              onScan={handleScanWebCam}
              facingMode="environment"
            />
          </Grid>
        </Grid>
        <p>{data}</p>
        <p>
          <Checkbox
            checked={isConfirmed}
            onChange={(event) => setIsConfirmed(event.target.checked)}
          />
          I confirm that I have already counted the bottles and sealed the containing bag properly
        </p>
        <ButtonStyle Text="Claim this delivery!" onClick={handleClaim} disabled={!isConfirmed} />
      </div>
      <ModalInfo flag={open} close={handleClose} />
    </div>
  );
}

export default Token;
