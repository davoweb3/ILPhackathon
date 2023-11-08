const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http'); // Import the HTTP library
const WebSocket = require('ws'); // Import the WebSocket library

const app = express();
const port = 3500;
const httpServer = http.createServer(app); // Create an HTTP server

app.use(bodyParser.json());
app.use(cors());

const scannedData = [];
const otherScannedData = [];

function arraysAreEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (JSON.stringify(arr1[i]) !== JSON.stringify(arr2[i])) {
      return false;
    }
  }

  return true;
}

// WebSocket server
const wss = new WebSocket.Server({ server: httpServer });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
  });
});

app.post('/scan', (req, res) => {
  const { result } = req.body;
  if (result) {
    scannedData.push(result);
    console.log(`Received and stored scanned data: ${result}`);

    if (arraysAreEqual(scannedData, otherScannedData)) {
      console.log('Both scannedData and otherScannedData match.');
      // Broadcast the message to all WebSocket clients
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send('Both scannedData and otherScannedData match.');
        }
      });
    }

    res.status(200).json({ message: 'Data received and stored in scannedData.' });
  } else {
    res.status(400).json({ message: 'Invalid data received.' });
  }
});

// Define a route to retrieve the count of scanned data excluding the last element and multiply it by 5
app.get('/scanned-data-count-multiplied', (req, res) => {
  const dataCount = scannedData.length - 1;
  const multipliedCount = dataCount * 5;
  res.status(200).json({ multipliedCount });
});

app.post('/scan2', (req, res) => {
  const { result } = req.body;
  if (result) {
    otherScannedData.push(result);
    console.log(`Received and stored scanned data in otherScannedData: ${result}`);

    if (arraysAreEqual(scannedData, otherScannedData)) {
      console.log('Both scannedData and otherScannedData match.');
      // Broadcast the message to all WebSocket clients
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send('Both scannedData and otherScannedData match.');
        }
      });
    }

    res.status(200).json({ message: 'Data received and stored in otherScannedData.' });
  } else {
    res.status(400).json({ message: 'Invalid data received.' });
  }
});

app.get('/scanned-data', (req, res) => {
  res.status(200).json(scannedData);
});

app.get('/scanned-data2', (req, res) => {
  res.status(200).json(otherScannedData);
});

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
