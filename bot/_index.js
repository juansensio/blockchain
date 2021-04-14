require("dotenv").config();
const { checkPair } = require("./checkPair");
const { web3 } = require("./setUpWeb3.js");

let priceMonitor;
let monitoringPrice = false;

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
const POLLING_INTERVAL = process.env.POLLING_INTERVAL || 1000; // 1 Second
priceMonitor = setInterval(async () => {
  await monitorPrice();
}, POLLING_INTERVAL);
