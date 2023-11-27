const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  const Contract = await ethers.getContractFactory("Verification");
  const contract = await Contract.deploy();

  await contract.waitForDeployment();

  const address = JSON.stringify({ address: contract.address}, null, 4);
  fs.writeFile("./src/abis/contractAddress.json",address, "utf8", (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Deployed contract address", contract.getAddress());
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
