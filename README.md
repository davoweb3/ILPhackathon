# rezyonrafiki
This is a repo for a new version of Rezy , that works with a Rafiki local instance and a set of services and two portals one for Recyclers and other for Recycling Companies.

Please clone this Rafiki Alpha 3 from https://github.com/davoweb3/rafikialpha3 and run it locally. This will deploy Rafiki with the modified accounts.

# How Rezy Works
Here's a glimpse into how Rezy operates:

Scan the Barcode: When someone wishes to recycle a bottle, they simply scan the bottle's barcode and create an array of items (bottles) that is stored in the backend.

Track and Pickup: The collected bottles are sealed in a tracked bag with a QR code that represents recycler1 payment pointer/ We asume this bag is ready for pickup and it is delivered to Acme Recycling Company, and this will verify the contents of the bag.

Verification : This action registers the bottle and rewards the individual based on the number of bottles they provide , once the bottles are veryfied at the Recycling Plant , if everything is Ok the Acme Recycling Company will pay 0.05 USD per each bottle to recycler 1 using it's payment pointer provided before.


Get Paid: People involved in this process only need a payment pointer to receive payment from the recycling company. It's somewhat akin to web monetization but without constant micropayments streaming in; instead, payments are cleared on specific events, such as scanning a bottle provided by the recycler 1. 

# Basic Flow
![image](https://github.com/davoweb3/rezyonrafiki/assets/105182325/965ac4ad-943e-4f2d-b119-40b1bd8abff2)



How to run ?
Spin Up Rafiki Alpha 3 as it is recommended on the original repo, Please choose TigerBeetle as the database.

Some changes were made to the seed.yml files in this case Cloud Nine mocks up Recycler Companies and Cloud Nine to the recyclers. Each user has as usual it's own payment pointer where the paymente will be received.


Environment overview
Docker compose environment

Cloud Nine Wallet
![image](https://github.com/davoweb3/rezyonrafiki/assets/105182325/f2692be6-a5cb-4fc1-b1fb-ee2724405526)

(a) User Interface - accessible at http://localhost:3030

(b) Admin API - accessible at http://localhost:3001/graphql

(c) Auth API - accessible at http://localhost:3003/graphql

(d) Open Payments API - accessible at http://localhost:3000

(e) Rafiki Admin - accessible at http://localhost:3010

(f) Open Payments Auth API - accessible at http://localhost:3006

(g) Postman Signature Service - accessible at http://localhost:3040

Happy Life Bank  

#Please note that all accounts have zero balance on this wallet provider

![image](https://github.com/davoweb3/rezyonrafiki/assets/105182325/3d7e05b8-64f1-4b75-bc61-24bc58971aed)

(h) User Interface - accessible at http://localhost:3031

(i) Admin API - accessible at http://localhost:4001/graphql

(j) Auth API - accessible at http://localhost:4003/graphql

(k) Open Payments API - accessible at http://localhost:4000

(l) Rafiki Admin - accessible at http://localhost:4010

(m) Open Payments Auth API - accessible at http://localhost:4006

(n) Postman Signature Service - accessible at http://localhost:3041

Database
(m) Postgres Server - accessible at http://localhost:5432

Exploring Accounts on Mock Account Servicing Entity
Navigate to localhost:3030 to view the accounts on one instance of the Mock Account Servicing Entity called Cloud Nine Wallet.

Mock Account Servicing Entity Accounts

The accounts of the second instance (Happy Life Bank) can be found on localhost:3031.

When clicking on the Account Name, a list of Transactions appears.

Mock Account Servicing Entity Transactions

Running the local environment
Dependencies
Rafiki local environment setup
docker
postman
Setup
The following should be run from the root of the project.

// If you have spun up the environment before, remember to first tear down and remove volumes!

// start the local environment
pnpm localenv:compose up

// tear down and remove volumes
pnpm localenv:compose down --volumes
If you want to use Postgres as the accounting database instead of TigerBeetle, you can use the psql variant of the localenv:compose commands:

pnpm localenv:compose:psql up
pnpm localenv:compose:psql down --volumes
The local environment consists of a primary Rafiki instance and a secondary Rafiki instance, each with its own docker compose files (Cloud Nine Wallet, Happy Life Bank). The primary Cloud Nine Wallet docker compose file (./cloud-nine-wallet/docker-compose.yml) includes the main Rafiki services backend and auth, as well as the required data stores tigerbeetle (if enabled), redis, and postgres, so it can be run on its own. Furthermore, both include the local-signature-utils signature generation app for Postman. The secondary Happy Life Bank docker compose file (./happy-life-bank/docker-compose.yml) includes only the Rafiki services, not the data stores. It uses the data stores created by the primary Rafiki instance so it can't be run by itself. The pnpm localenv:compose up command starts both the primary instance and the secondary.

Shutting down
// tear down
pnpm localenv:compose down

// tear down and delete database volumes
pnpm localenv:compose down --volumes

# How to Run the demo

At the backend folder, Please run all four services :balance, newman , payment and storage. Node version 16.x.x 
At the frontend folder , please run Rezy Acme Company at the root folder with npm run start , the same for Rezy Barcode (UI for recycler) at Rezy/Frontend/Rezy barcode/scanner/scanner and execute npm run start. Now both UI wil be running. 

# Acme Recycling Company UI
![image](https://github.com/davoweb3/rezyonrafiki/assets/105182325/7937bd19-476a-4455-8552-a7835427d091)

# Recycler UI
![image](https://github.com/davoweb3/rezyonrafiki/assets/105182325/37b3b92c-cc30-4b47-89ad-d7a63eab5358)




