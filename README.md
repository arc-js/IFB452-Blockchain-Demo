# ONECLICKID

## Set Up and Walkthrough

---

# Table of Contents

- [System Requirements](#system-requirements)
- [1. Setting Up the Blockchain](#1-setting-up-the-blockchain)
  - [1.1 Launch Ganache](#11-launch-ganache)
  - [1.2 Configure MetaMask](#12-configure-metamask)
  - [1.3 Import a Ganache Account](#13-import-a-ganache-account)
- [2. Deploying the Smart Contracts](#2-deploying-the-smart-contracts)
  - [2.1 Open Remix IDE](#21-open-remix-ide)
  - [2.2 Connect Remix to MetaMask](#22-connect-remix-to-metamask)
  - [2.3 Deploy the RegistryID Contract](#23-deploy-the-registryid-contract)
  - [2.4 Deploy the ServiceGateway Contract](#24-deploy-the-servicegateway-contract)
- [3. Configuring the Frontend](#3-configuring-the-frontend)
- [4. Hosting the Frontend](#4-hosting-the-frontend)
- [5. Connecting the Wallet](#5-connecting-the-wallet)
- [6. Verification Workflow Demonstration](#6-verification-workflow-demonstration)
- [7. Anchoring Attributes](#7-anchoring-attributes)
- [8. Revoking Attributes](#8-revoking-attributes)

---

# System Requirements

Before running the application, ensure the following software is installed:

| Software | Purpose |
|---|---|
| Node.js | Required for Local Hosting |
| Ganache | Local Ethereum Blockchain |
| MetaMask | Wallet connection and transaction signing |
| Remix IDE | To compile and deploy smart contracts |
| Python | Used to host the frontend locally |

---

# 1. Setting Up the Blockchain

## 1.1 Launch Ganache

Open Ganache and create a Quickstart Workspace.

Ensure the settings are as follows:

| Setting | Value |
|---|---|
| RPC Config | `http://127.0.0.1:7545/` |
| Network ID | `5777` |

Ganache will automatically generate several Ethereum test accounts containing test ETH for transactions.

---

## 1.2 Configure MetaMask

Open MetaMask in your browser.

### Add the Ganache Network

Create a custom network using the following settings:

| Setting | Value |
|---|---|
| RPC URL | `http://127.0.0.1:7545/` |
| Chain ID | `5777` |
| Currency Symbol | `ETH` |

---

## 1.3 Import a Ganache Account

### Inside Ganache

1. Select one of the generated test accounts
2. Copy the account’s private key

### Inside MetaMask

1. Click **Import Account**
2. Paste the private key
3. Confirm import

This imported wallet will simulate the Government / Issuer Authority during the demo.

---

# 2. Deploying the Smart Contracts

## 2.1 Open Remix IDE

Open Remix IDE in the browser and load the smart contract files.

---

## 2.2 Connect Remix to MetaMask

Inside Remix:

1. Navigate to **Deploy & Run Transactions**
2. Change the environment to:
   ```text
   Injected Provider - MetaMask
   ```
3. MetaMask will request connection approval
4. Approve the connection
### Example 
<img width="494" height="343" alt="enviroment" src="https://github.com/user-attachments/assets/d4befca8-454a-4e34-b297-cb4a2aa9bcdb" />

The connected wallet now becomes the authorised issuer wallet.

---

## 2.3 Deploy the RegistryID Contract

Deploy the `RegistryID.sol` contract first.

The deploying wallet automatically becomes the authorised issuer through the constructor function.

### When deploying

- MetaMask will prompt for transaction approval
- Confirm the transaction
- Wait for deployment confirmation

---

## 2.4 Deploy the ServiceGateway Contract

Deploy `ServiceGateway.sol`

When prompted, paste the deployed RegistryID contract address into the constructor field.

### Example

```solidity
constructor(address _registryAddress)
```

### After deployment

- Confirm the MetaMask transaction
- Wait for deployment completion

---

# 3. Configuring the Frontend

## Update Contract Address

Open `app.js`

Locate the following line:

```javascript
const CONTRACT_ADDR = "DEPLOYED_SERVICE_GATEWAY_ADDRESS";
```

Replace the placeholder:

```text
DEPLOYED_SERVICE_GATEWAY_ADDRESS
```

with the deployed ServiceGateway contract address.

### Example

```javascript
const CONTRACT_ADDR = "0x123456789...";
```

Save the file.

---

# 4. Hosting the Frontend

Open a terminal or command prompt inside the frontend project folder.

## Windows

```bash
python -m http.server 8000
```

## macOS

```bash
python3 -m http.server 8000
```

This will host the application locally.

Open the frontend in your browser:

```text
http://localhost:8000/index.html
```

---

# 5. Connecting the Wallet

When the frontend application is opened for the first time, MetaMask may request permission to connect to the local Ganache blockchain network.

1. Open the frontend application
2. Approve the MetaMask connection request
3. The wallet address will appear in the interface

The frontend is now connected to the local blockchain through MetaMask.

---

# 6. Verification Workflow Demonstration

## Initial Verification Attempt

Inside the SEEK verification interface:

1. Click **Submit Application**
2. The verification process will execute
3. All verification badges should appear red

This indicates that no attributes have yet been anchored on-chain.

### Example Interface

<img width="438" height="369" alt="Screenshot 2026-05-27 200947" src="https://github.com/user-attachments/assets/8f149a95-bf18-4f77-bdf9-681a7f41ffed" />

---

# 7. Anchoring Attributes

## 7.1 View Attribute Hashes

Inside the frontend:

1. Click **More Details**
2. The generated attribute hashes will become visible

### Example attributes may include

- Age Verification
- Citizenship Verification
- Identity Verification

Copy one of the displayed hashes.
### Example
<img width="300" height="300" alt="Screenshot 2026-05-27 201207" src="https://github.com/user-attachments/assets/8fe46833-c636-4fcf-b3cf-38ae08f291fe" />



---

## 7.2 Anchor the Attribute

Inside Remix:

1. Select the issuer wallet account
2. Open the deployed `RegistryID` contract
3. Locate the function:

```solidity
anchorAttribute(bytes32 _attributeHash)
```

4. Paste the copied hash into the function input
5. Execute the transaction
6. Confirm the MetaMask transaction

The selected attribute is now permanently anchored to the blockchain.
### Example 
<img width="423" height="442" alt="anchor" src="https://github.com/user-attachments/assets/6fff3b27-522c-461c-a36e-725309b76b6f" />

---

## 7.3 Re-run Verification

Return to the frontend.

Click:

```text
Submit Verification
```

The associated verification badge should now appear green, indicating successful verification.

### Example Verified Interface
<img width="433" height="327" alt="verified" src="https://github.com/user-attachments/assets/5eac36a4-8903-49d1-9b30-1aa795ac8e66" />


---

# 8. Revoking Attributes

## 8.1 Open the Revocation Function

Inside Remix:

1. Open the deployed `RegistryID` contract
2. Locate the revoke function

### Example

```solidity
revokeAttribute(bytes32 _attributeHash)
```
<img width="413" height="338" alt="revoke" src="https://github.com/user-attachments/assets/5edee8f2-2608-489f-a928-bfd05d46969a" />

---

## 8.2 Revoke the Attribute

1. Paste the previously anchored hash
2. Execute the transaction
3. Confirm the MetaMask transaction
### Example

---

## 8.3 Verify Revocation

Return to the frontend and submit verification again.

The associated badge should now return to red, indicating the attribute is no longer valid.

### Example Revoked Interface
<img width="427" height="330" alt="failed" src="https://github.com/user-attachments/assets/f2d69af3-dff2-4c7b-b63f-f53227a59c84" />
