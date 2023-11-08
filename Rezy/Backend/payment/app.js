const axios = require('axios');
const http = require('http');

const query = `
  query WebhookEvents($after: String, $before: String, $first: Int, $last: Int, $filter: WebhookEventFilter) {
    webhookEvents(after: $after, before: $before, first: $first, last: $last, filter: $filter) {
      edges {
        cursor
        node {
          createdAt
          data
          id
          type
        }
      }
    }
  }
`;

const variables = {
  filter: { type: { in: [] } },
  after: null,
  before: null,
  first: null,
  last: null
};

const config = {
  method: 'post',
  url: 'http://127.0.0.1:3001/graphql', // Replace with your GraphQL endpoint URL
  headers: {
    'Content-Type': 'application/json'
  },
  data: {
    query,
    variables
  }
};

const server = http.createServer((req, res) => {
  // Make the Axios request to the GraphQL endpoint
  axios.request(config)
    .then((response) => {
      const webhookEvents = response.data.data.webhookEvents;
      if (webhookEvents.edges.length > 0) {
        const lastEvent = webhookEvents.edges[webhookEvents.edges.length - 1].node;
        
        // Extract the desired fields from the data object
        const { id, state, sentAmount, assetCode, createdAt, receiver } = lastEvent.data;
        const value = lastEvent.data.receiveAmount.value;

        // Prepare the response
        const responseData = `
          Transaction OK:
          Receiver: ${receiver}
          id: ${id}
          state: ${state}
          sentAmount: ${sentAmount.value}
          createdAt: ${createdAt}
          assetCode: ${assetCode}
        `;

        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(responseData);
      } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('No webhook events found.');
      }
    })
    .catch((error) => {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end(`Error: ${error}`);
    });
});

server.listen(3900, () => {
  console.log('Server is running on port 3900');
});
