import { ethers, upgrades } from "hardhat";
import hre from "hardhat";

async function main() {
  console.log("hre", hre.network);

  const [deployer] = await ethers.getSigners();

  const TheMineBox = await ethers.getContractFactory("TheMineBox", deployer);
  const theMineBox = await upgrades.deployProxy(
    TheMineBox,
    [deployer.address, deployer.address, deployer.address, deployer.address],
    {
      initializer: "initialize",
      kind: "uups",
    }
  );
  await theMineBox.waitForDeployment();
  console.log("TheMineBox deployed to:", await theMineBox.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
