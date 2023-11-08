import React, { useState, useEffect } from 'react';
import QrReader from 'react-qr-reader';
import { Grid } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import ButtonStyle from '../components/button';
import ModalInfo from '../components/InfoModal';

function Token() {
  const [data, setData] = useState('No result');
  const [token, setToken] = useState('');
  const [open, setOpen] = useState(false);
  const [scannedResult, setScannedResult] = useState('');

  const navigate = useNavigate();
  const webSocket = new WebSocket('ws://127.0.0.1:3001'); // WebSocket connection to your server

  webSocket.onmessage = (event) => {
    // Handle incoming WebSocket messages from the server
    if (event.data === 'Both scannedData and otherScannedData match.') {
      // Show an HTML alert when a match is found
      alert('Match found: Both scannedData and otherScannedData match!');
    }
  };

  const handleClose = () => {
    setOpen(false);
    navigate('/');
  };

  const postToToken = (result) => {
    const requestData = JSON.stringify({ result });
    console.log(requestData);
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: requestData,
    };

    let url = 'http://127.0.0.1:3500/scan2'; // Replace with your actual API URL
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
      setScannedResult(result);
      console.log(scannedResult);
    }
  };

  const handleClaim = () => {
    if (scannedResult) {
      if (!open) {
        setOpen(true);
        postToToken(scannedResult);
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 50000);

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
        <p>Once the bag's content is checked in the factory, you will receive the money to your payment pointer</p>
        <ButtonStyle Text="Confirm this delivery!" onClick={handleClaim} />
      </div>
      <ModalInfo flag={open} close={handleClose} />
    </div>
  );
}

export default Token;
