// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IRegistryID {
    function verifyStatus(bytes32 _attributeHash) external view returns (bool);
}

contract ServiceGateway {

    // store the blockchain address
    address public registryAddress;

    // link to the specific registry address
    constructor(address _registryAddress) {
        registryAddress = _registryAddress;
    }


    // executes to registryID blockchian
    // routes back a True/False status
    function verifyUserAttribute(bytes32 _userHash) external view returns (bool) {
        
        IRegistryID registry = IRegistryID(registryAddress);
        
        // execute the registry-contract call
        return registry.verifyStatus(_userHash);
    }
}