require("dotenv").config();
const { checkPair } = require("./checkPair");
const { web3, exchangeContract } = require("./setUpWeb3.js");
const { checkBalances } = require("./checkBalances");
const { sellEth } = require("./sellEth");
// Minimum eth to swap
const ETH_AMOUNT = web3.utils.toWei("0.2", "Ether");
console.log("Eth Amount", ETH_AMOUNT);

const ETH_SELL_PRICE = web3.utils.toWei("200", "Ether"); // 200 Dai a.k.a. $200 USD

let priceMonitor;
let monitoringPrice = false;

async function main() {
  await checkBalances();

  // Check Eth Price
  const daiAmount = await exchangeContract.methods
    .getEthToTokenInputPrice(ETH_AMOUNT)
    .call();
  const price = web3.utils.fromWei(daiAmount.toString(), "Ether");
  console.log("Eth Price:", price, " DAI");

  await sellEth(ETH_AMOUNT, daiAmount);
  await checkBalances();
}

main();

async function monitorPrice() {
  if (monitoringPrice) {
    return;
  }

  console.log("Checking prices...");
  monitoringPrice = true;

  try {
    // ADD YOUR CUSTOM TOKEN PAIRS HERE!!!
    await checkPair({
      inputTokenSymbol: "ETH",
      inputTokenAddress: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      outputTokenSymbol: "MKR",
      outputTokenAddress: "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2",
      inputAmount: web3.utils.toWei("1", "ETHER"),
    });
  } catch (error) {
    console.error(error);
    monitoringPrice = false;
    clearInterval(priceMonitor);
    return;
  }

  monitoringPrice = false;
}

// Check markets every n seconds
// const POLLING_INTERVAL = process.env.POLLING_INTERVAL || 1000; // 1 Second
// priceMonitor = setInterval(async () => {
//   await monitorPrice();
// }, POLLING_INTERVAL);
