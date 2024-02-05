import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
import dotenv from "dotenv";

dotenv.config({
  path: ".env",
});

const {
  GOERLI_URL,
  GOERLI_PRIVATE_KEY,
  SEPOLIA_URL,
  SEPOLIA_PRIVATE_KEY,
  ETHERSCAN_API_KEY,
  MAINNET_URL,
  MAINNET_PRIVATE_KEY,
  BSC_TESTNET_URL,
  BSC_TESTNET_PRIVATE_KEY,
  BSCSCAN_API_KEY,
  BSC_MAINNET_PRIVATE_KEY,
} = process.env;

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.21",
    settings: {
      optimizer: {
        enabled: true,
        runs: 2000,
      },
    },
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    goerli: {
      url: GOERLI_URL,
      accounts: [`0x${GOERLI_PRIVATE_KEY!}`],
    },
    sepolia: {
      url: SEPOLIA_URL,
      accounts: [`0x${SEPOLIA_PRIVATE_KEY!}`],
    },
    mainnet: {
      url: MAINNET_URL,
      accounts: [`0x${MAINNET_PRIVATE_KEY!}`],
    },
    bscTestnet: {
      url: BSC_TESTNET_URL,
      chainId: 97,
      gasPrice: 20000000000,
      accounts: [`0x${BSC_TESTNET_PRIVATE_KEY!}`],
    },
    bscMainnet: {
      url: "https://bsc-dataseed.bnbchain.org/",
      chainId: 56,
      gasPrice: 20000000000,
      accounts: [`0x${BSC_MAINNET_PRIVATE_KEY!}`],
    },
  },
  etherscan: {
    apiKey: {
      bscTestnet: BSCSCAN_API_KEY!,
      bscMainnet: BSCSCAN_API_KEY!,
      goerli: ETHERSCAN_API_KEY!,
      mainnet: ETHERSCAN_API_KEY!,
    },
    customChains: [
      {
        network: "bscTestnet",
        chainId: 97,
        urls: {
          apiURL: "https://api-testnet.bscscan.com/api",
          browserURL: "https://testnet.bscscan.com",
        },
      },
      {
        network: "bscMainnet",
        chainId: 56,
        urls: {
          apiURL: "https://api.bscscan.com/api",
          browserURL: "https://bscscan.com/",
        },
      },
    ],
  },
};

export default config;
