const express = require('express');
const axios = require('axios');
const app = express();
const port = 9000;

// Enable CORS for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  res.header('Access-Control-Allow-Methods', 'GET'); // Allow only GET requests
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.get('/api/data', async (req, res) => {
  try {
    // Make an API call using axios
    const apiResponse = await axios.get('http://127.0.0.1:3031/?_data=routes%2Findex');
    const result = apiResponse.data;

    // Filter the array to find the account with name 'Philip Fry'
    const philipFryAccount = result.accountsWithBalance.find((account) => account.name === 'recycler1');
    console.log(philipFryAccount);

    if (philipFryAccount) {
      res.json({
        name: philipFryAccount.name,
        balance: philipFryAccount.balance,
      });
    } else {
      res.status(404).json({ error: 'Account not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error making the API request.' });
  }
});

app.get('/api/data2', async (req, res) => {
  try {
    // Make a separate API call using axios for '/api/data2'
    const apiResponse = await axios.get('http://127.0.0.1:3030/?_data=routes%2Findex');
    const result = apiResponse.data;

    // Filter the array to find the account with name 'Acme Recycling Company'
    const acmeAccount = result.accountsWithBalance.find((account) => account.name === 'Acme Recycling Company');

    if (acmeAccount) {
      res.json({
        name: acmeAccount.name,
        balance: acmeAccount.balance,
      });
    } else {
      res.status(404).json({ error: 'Acme Recycling Company not found in the accounts.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error making the API request for /api/data2.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
