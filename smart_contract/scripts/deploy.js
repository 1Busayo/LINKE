const hre = require("hardhat");

async function main() {
  const profileImageMinterFactory = await hre.ethers.getContractFactory('ProfileImageNfts',)
  const profileImageContract = await profileImageMinterFactory.deploy()

  await profileImageContract.deployed()
 
  console.log("Profile Image minter Contract deployed to:", profileImageContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
(async () => {
try {
  await main()
} catch (error) {
  console.error(error)
  process.exit(1)
}

})()