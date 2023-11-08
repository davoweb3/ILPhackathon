import "./Scan.css";
import ButtonStyle from "../components/button";
import ModalStyle from "../components/Modal";
import React, { useState, useEffect } from "react";
import QrReader from "react-qr-reader";
import { Grid } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import Barcode from "react-barcode";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import products from '../products.json';

const URL = 'http://localhost:3500';

function Scan() {
  const initialData = products;
  const [data, setData] = useState("No result");
  const [producto, setProducto] = useState({});
  const [stopStream, setStopStream] = useState(false);
  const [filteredData, setFilteredData] = useState(initialData);
  const [scanningEnabled, setScanningEnabled] = useState(true); // Control scanning

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const scanTimeout = setTimeout(() => {
      setScanningEnabled(true); // Allow scanning again after 3 seconds
    }, 3000);

    return () => {
      clearTimeout(scanTimeout);
    };
  }, [scanningEnabled]);

  const handleClose = () => {
    postToArduino("1");
    setOpen(false);
  };

  const postToArduino = (option) => {
    const headers = {
      "Content-Type": "text/html",
    };
    let url = `http://rezy.lat/esp-outputs-action.php?action=output_update&id=3&state=1`;
    fetch(url, { headers })
      .then((response) => {
        if (response.status === 200) {
          setData("Green led is on");
          console.log(setData);
        } else {
          setData("Green led is off");
        }
      })
      .catch((err) => {
        console.log(err);
        setOpen(false);
      });
  };

  const handleAccept = () => {
    postToArduino("1");
    setTimeout(function () {
      postToArduino("0");
      setOpen(false);
      navigate("/step3");
    }, 2000);
  };

  const handleErrorWebCam = (error) => {
    console.log(error);
  };

  const parseAndSendToEndpoint = (result) => {
    const dataToSend = { result: result };
    const headers = {
      'Content-Type': 'application/json',
    };

    fetch('http://127.0.0.1:3500/scan2', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(dataToSend),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          console.error('Error sending data to the endpoint');
        }
      })
      .then((responseData) => {
        console.log('Response from endpoint:', responseData);
      })
      .catch((error) => {
        console.error('Network error:', error);
      });
  };

  const handleScanWebCam = (result) => {
    if (result && scanningEnabled) {
      const resultText = result.toString();
      setData(resultText);
      if (!open) {
        getProduct(resultText);
      }
      parseAndSendToEndpoint(resultText);
      setScanningEnabled(false); // Prevent scanning for 3 seconds

      // Execute the curl command when a product is scanned
      fetch('http://127.0.0.1:3600/run-collection', {
        method: 'GET',
      })
        .then((response) => {
          if (response.ok) {
            console.log('curl command executed successfully');
          } else {
            console.error('Error executing curl command');
          }
        })
        .catch((error) => {
          console.error('Error executing curl command:', error);
        });
    }
  };

  const getProduct = (id) => {
    const foundElement = filteredData.find(item => item.Id === id);

    if (foundElement) {
      setProducto(foundElement);
      setOpen(true);
    } else {
      // Element with the given id was not found
      // console.log('Element not found');
    }
  };

  return (
    <div className="App">
      <div className="container">
        <label className="title">Step 1, Scan the bag </label>
        <p>
          Scan the bag's QR code, then scan the contained items
        </p>
        <p></p>

        <Grid
          container
          style={{ width: window.innerWidth < 1000 ? "100%" : "25%" }}
        >
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <BarcodeScannerComponent
              width={400}
              height={400}
              facingMode="environment"
              onUpdate={(err, result) => {
                if (result) {
                  handleScanWebCam(result.text);
                  console.log(result);
                } else {
                  setData(".....Waiting for bottles");
                }
              }}
            />
          </Grid>
        </Grid>

        <p>{data}</p>
        <ButtonStyle Text={"Scan!"}></ButtonStyle>
      </div>
      <ModalStyle
        flag={open}
        close={handleClose}
        product={producto}
        accept={handleAccept}
      ></ModalStyle>
    </div>
  );
}

export default Scan;
