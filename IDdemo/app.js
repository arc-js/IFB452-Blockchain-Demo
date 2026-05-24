const CONTRACT_ADDR = "0x5115Bb121A1d05f13F186602A0442381E6b9129F";
const CONTRACT_ABI = ["function verifyUserAttribute(bytes32 _userHash) external view returns (bool)"];

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("verifyBtn").addEventListener("click", handleSubmit);
    
    // show/hide proof hashes button
    const toggleBtn = document.getElementById("toggleVectorsBtn");
    toggleBtn.addEventListener("click", () => {
        const box = document.getElementById("telemetryBox");
        if (box.style.display === "none") {
            box.style.display = "block";
            toggleBtn.innerText = "Less Details";
        } else {
            box.style.display = "none";
            toggleBtn.innerText = "More Details";
        }
    });

    // grab initial wallet address to show which one is active
    if (window.ethereum) {
        window.ethereum.request({ method: 'eth_accounts' }).then(accs => {
            if (accs.length > 0) {
                document.getElementById("sidebarWallet").innerText = 
                    `${accs[0].substring(0, 6)}...${accs[0].substring(accs[0].length - 4)}`;
            }
        });
    }
});

async function handleSubmit() {
    try {
        // request access to metamask
        const accs = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const userWallet = accs[0];
        document.getElementById("sidebarWallet").innerText = 
            `${userWallet.substring(0, 6)}...${userWallet.substring(userWallet.length - 4)}`;

        // get inputs from boxes
        const ageSalt = document.getElementById("ageSalt").value;
        const citizenSalt = document.getElementById("citizenSalt").value;

        // crypto hashing math matching the solidity format
        const hash1 = ethers.solidityPackedKeccak256(
            ["string", "address", "string"], ["Over 18", userWallet, ageSalt]
        );
        const hash2 = ethers.solidityPackedKeccak256(
            ["string", "address", "string"], ["Australian Citizen", userWallet, citizenSalt]
        );

        // update hidden boxes
        document.getElementById("ageHashOutput").innerText = hash1;
        document.getElementById("citizenHashOutput").innerText = hash2;
        document.getElementById("toggleVectorsBtn").style.display = "inline-block";

        // ganache local-hosted blockchain rpc endpoint
        const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");
        const contract = new ethers.Contract(CONTRACT_ADDR, CONTRACT_ABI, provider);
        
        const res1 = await contract.verifyUserAttribute(hash1);
        const res2 = await contract.verifyUserAttribute(hash2);
        
        // update age badge color and text
        const badge1 = document.getElementById("badgeAge");
        badge1.className = res1 ? "badge-state state-verified" : "badge-state state-failed";
        badge1.innerText = res1 ? "Verified" : "Failed";

        // update citizenship badge color and text
        const badge2 = document.getElementById("badgeCitizen");
        badge2.className = res2 ? "badge-state state-verified" : "badge-state state-failed";
        badge2.innerText = res2 ? "Verified" : "Failed";

    } catch (e) {
        console.error(e);
        alert("Blockchain connection error.");
    }
}