// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract RegistryID {
    
    address public governmentIssuer;
    mapping(bytes32 => bool) private attributeHashes;

    // set governmentIssuer as when deployed this wallet becomes a central authority aka Australian Government departments
    constructor() {
        governmentIssuer = msg.sender;
    }

    // RBAC, ensures that only the governmentIssuer wallet address can execute this function.
    modifier onlyIssuer() {
        require(msg.sender == governmentIssuer, "Error: Only the Government Issuer can perform this action.");
        _;
    }
    // accepts a 32-byte hash (in our case will be a citizen's salted attribute hash) - with hash duplication protection
    function anchorAttribute(bytes32 _attributeHash) external onlyIssuer {
        require(!attributeHashes[_attributeHash], "Hash already exists in the registry.");
        attributeHashes[_attributeHash] = true;
    }

    // handles revocation of attributes (e.g. phone stolen, hash stolen, etc.) Flips attribute to false, invalidating it.
    function revokeAttribute(bytes32 _attributeHash) external onlyIssuer {
        require(attributeHashes[_attributeHash], "Hash does not exist or is already false.");
        attributeHashes[_attributeHash] = false;
    }

    // handles simple status verification.
    function verifyStatus(bytes32 _attributeHash) external view returns (bool) {
        return attributeHashes[_attributeHash];
    }
}
