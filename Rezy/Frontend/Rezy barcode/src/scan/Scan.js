import "./Scan.css";
import ButtonStyle from "../components/button";
import ModalStyle from "../components/Modal";
import React, { useState } from "react";
import QrReader from "react-qr-reader";
import { Grid } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import Barcode from "react-barcode";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import products from '../products.json'

// const URL = "https://backend-products-scan.onrender.com:3500";
const URL = 'http://localhost:3500';

function Scan() {
  const initialData = products
  const [data, setData] = useState("No result");
  const [producto, setProducto] = useState({});
  const [stopStream, setStopStream] = useState(false);
  const [filteredData, setFilteredData] = useState(initialData);

  let navigate = useNavigate();

  const [open, setOpen] = useState(false);
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
          console.log(setData)
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
    // Create an object to hold the data to be sent
    const dataToSend = { result: result };

    // Define the headers for the POST request
    const headers = {
      'Content-Type': 'application/json',
    };


    
    // Make the POST request to the endpoint
    fetch('http://127.0.0.1:3500/scan', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(dataToSend),
    })
      .then((response) => {
        if (response.status === 200) {
          // Request was successful
          return response.json();
        } else {
          // Handle errors here
          console.error('Error sending data to the endpoint');
        }
      })
      .then((responseData) => {
        // Handle the response from the endpoint if needed
        console.log('Response from endpoint:', responseData);
      })
      .catch((error) => {
        // Handle any network errors here
        console.error('Network error:', error);
      });
  };

  const handleScanWebCam = (result) => {
  if (result) {
    const resultText = result.toString(); // Convert result to a string
    setData(resultText);
    if (!open) {
      getProduct(resultText); // Use resultText to fetch the product
    }
    // Call the function to parse and send the data
    parseAndSendToEndpoint(resultText);
  }
};

  const getProduct = (id) => {
    const foundElement = filteredData.find(item => item.Id === id);

    if (foundElement) {
      // Do something with the found element
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
        <label className="title">Step 1</label>
        <p>
          Scan the barcode on your plastic bottle, if it is an elegible PET bottle it will be accepted</p>
          <p> Wait for the confirmation popup, once the bottle is recognized , Accept and submit it</p>
        

        <Grid
          container
          style={{ width: window.innerWidth < 1000 ? "100%" : "25%" }}
        >
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <BarcodeScannerComponent
              width={400}
              height={400}
              facingMode="environment"
              // stopStream={stopStream}
              onUpdate={(err, result) => {
                if (result) {
                  handleScanWebCam(result.text)
                  console.log(result);
                 
                  // setData(result.text);
                  // setStopStream(true);
                } else {
                  setData(".....Waiting for your bottle");
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
