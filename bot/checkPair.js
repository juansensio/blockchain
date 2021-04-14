const moment = require("moment-timezone");
const {
  web3,
  uniswapFactoryContract,
  UNISWAP_EXCHANGE_ABI,
  kyberRateContract,
} = require("./setUpWeb3.js");

async function checkPair(args) {
  const {
    inputTokenSymbol,
    inputTokenAddress,
    outputTokenSymbol,
    outputTokenAddress,
    inputAmount,
  } = args;

  const exchangeAddress = await uniswapFactoryContract.methods
    .getExchange(outputTokenAddress)
    .call();
  const exchangeContract = new web3.eth.Contract(
    UNISWAP_EXCHANGE_ABI,
    exchangeAddress
  );

  const uniswapResult = await exchangeContract.methods
    .getEthToTokenInputPrice(inputAmount)
    .call();
  let kyberResult = await kyberRateContract.methods
    .getExpectedRate(inputTokenAddress, outputTokenAddress, inputAmount, true)
    .call();

  console.table([
    {
      "Input Token": inputTokenSymbol,
      "Output Token": outputTokenSymbol,
      "Input Amount": web3.utils.fromWei(inputAmount, "Ether"),
      "Uniswap Return": web3.utils.fromWei(uniswapResult, "Ether"),
      "Kyber Expected Rate": web3.utils.fromWei(
        kyberResult.expectedRate,
        "Ether"
      ),
      "Kyber Min Return": web3.utils.fromWei(kyberResult.slippageRate, "Ether"),
      Timestamp: moment().tz("Europe/Madrid").format(),
    },
  ]);
}

module.exports = {
  checkPair,
};
