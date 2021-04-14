const moment = require("moment");
const { web3, exchangeContract } = require("./setUpWeb3");

async function sellEth(ethAmount, daiAmount) {
  // Set Deadline 1 minute from now
  const now = moment().unix(); // fetch current unix timestamp
  const DEADLINE = now + 10; // add 10 seconds
  console.log("Deadline", DEADLINE);

  // Transaction Settings
  const SETTINGS = {
    gasLimit: 8000000, // Override gas settings: https://github.com/ethers-io/ethers.js/issues/469
    gasPrice: web3.utils.toWei("50", "Gwei"),
    from: process.env.ACCOUNT, // Use your account here
    value: ethAmount, // Amount of Ether to Swap
  };

  // Perform Swap
  console.log("Performing swap...");
  try {
    let result = await exchangeContract.methods
      .ethToTokenSwapInput(daiAmount.toString(), DEADLINE)
      .send(SETTINGS);
    console.log(
      `Successful Swap: https://ropsten.etherscan.io/tx/${result.transactionHash}`
    );
  } catch (e) {
    console.error(e);
  }
}

module.exports = {
  sellEth,
};
