import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers, upgrades } from "hardhat";

describe("TheMineBox", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployOneYearLockFixture() {
    const [deployer] = await ethers.getSigners();

    console.log("deployer.address", deployer.address);

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

    return { theMineBox, deployer };
  }

  describe("Deployment", function () {
    describe("Mint", function () {
      it("Mint", async function () {
        const { theMineBox, deployer } = await loadFixture(
          deployOneYearLockFixture
        );

        const result = await theMineBox.safeMint(
          deployer.address,
          1000,
          "ipfs://test"
        );
        const tokenUrl = await theMineBox.tokenURI(1000);

        console.log("result", result);
        console.log("tokenUrl", tokenUrl);
        expect(true).to.be.equal(true);
      });
    });
  });

  // it("works", async () => {
  //   const [deployer] = await ethers.getSigners();

  //   const TheMineBox = await ethers.getContractFactory("TheMineBox", deployer);

  //   const TheMineBoxV2 = await ethers.getContractFactory("TheMineBoxV2");

  //   const instance = await upgrades.deployProxy(
  //     TheMineBox,
  //     [
  //       deployer.address,
  //       deployer.address,
  //       deployer.address,
  //       deployer.address,
  //       deployer.address,
  //       deployer.address,
  //       "500",
  //     ],
  //     {
  //       initializer: "initialize",
  //       kind: "uups",
  //     }
  //   );
  //   const upgraded = await upgrades.upgradeProxy(
  //     await instance.getAddress(),
  //     TheMineBoxV2
  //   );

  //   await upgraded.setName("bla");

  //   const value = await upgraded.getName();

  //   console.log("value", value);
  //   // expect(value.toString()).to.be();
  // });
});
