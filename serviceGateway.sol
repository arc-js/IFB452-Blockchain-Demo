// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// An interface tells this contract what functions exist inside the Registry vault
interface IRegistryID {
    function verifyStatus(bytes32 _attributeHash) external view returns (bool);
}

contract ServiceGateway {

    // A variable to store the deployed blockchain address of your Registry contract
    address public registryAddress;

    // The constructor links this gateway to the specific registry address
    constructor(address _registryAddress) {
        registryAddress = _registryAddress;
    }

    // Receives a user's local salted identity hash from a company platform
    // Executes a cross-contract query to the Registry vault
    // Routes back a clean True/False status.
    function verifyUserAttribute(bytes32 _userHash) external view returns (bool) {
        
        // Instantiate the interface pointing directly at our registry address
        IRegistryID registry = IRegistryID(registryAddress);
        
        // Execute the Cross-Contract Call and return the response
        return registry.verifyStatus(_userHash);
    }
}