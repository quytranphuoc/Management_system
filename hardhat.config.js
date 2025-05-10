// require("@nomicfoundation/hardhat-toolbox");

// task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
//   const accounts = await hre.ethers.getSigners();

//   for (const account of accounts) {
//     console.log(account.address);
//   }
// },);
// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.28",
// };

require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    // localhost: {
    //   url: "http://127.0.0.1:8545",
    // },
    // Nếu sau này bạn muốn deploy lên Goerli chẳng hạn:
    /*
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY",
      accounts: ["YOUR_PRIVATE_KEY"]
    }
    */
    sepolia: {
      url: `https://sepolia.infura.io/v3/6fcd4f242e4a4b1fbaac14561548fbe3`,
      accounts: [
        "ede4c9ffd9357124fab7fcb5416447be7f4cd701af46b8ca03990f7a05816463",
      ],
    },
  },
  paths: {
    sources: "./contracts", // nơi chứa các file .sol của bạn
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};
