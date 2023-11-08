const http = require('http');
const querystring = require('querystring');

// Replace these with your actual captured data
const receiverId = "captured_receiver_id";
const quoteId = "captured_quote_id";
const outgoingPaymentId = "captured_outgoing_payment_id";


const express = require('express');
const newman = require('newman');
const cors = require('cors');

const app = express();
const port = 3600;

// Define the path to your Postman collection
const collectionPath = './New Collection.postman_collection.json';

// Options for running the collection
const newmanOptions = {
    collection: require(collectionPath),
    reporters: 'cli',
};

// Define a route to trigger the Postman collection run
app.get('/run-collection', (req, res) => {
    newman.run(newmanOptions, (err) => {
        if (err) {
            console.error('Error running the collection:', err);
            res.status(500).json({ error: 'Error running the collection' });
        } else {
            console.log('Collection run complete!');
            res.json({ message: 'Collection run complete' });
        }
    });
});

// Start the Express.js server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
// Log the captured data
console.log("Receiver ID:", receiverId);
console.log("Quote ID:", quoteId);
console.log("Outgoing Payment ID:", outgoingPaymentId);

// Create the data to send
const data = querystring.stringify({
  outgoingPaymentId: outgoingPaymentId
});

const options = {
  hostname: 'localhost', // Replace with your remote backend's URL
  port:'3500',
  path: '/scan2', // Replace with the actual endpoint on your backend
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(data)
  }
};

const req = http.request(options, (res) => {
  let responseData = '';

  res.on('data', (chunk) => {
    responseData += chunk;
  });

  res.on('end', () => {
    console.log('Response from the remote backend:', responseData);
  });
});

req.on('error', (error) => {
  console.error('Error sending the request:', error);
});

// Send the data
req.write(data);
req.end();

