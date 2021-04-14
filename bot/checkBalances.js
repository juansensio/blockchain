const { web3, daiContract } = require("./setUpWeb3");

async function checkBalances() {
  let balance;

  // Check Ether balance swap
  balance = await web3.eth.getBalance(process.env.ACCOUNT);
  balance = web3.utils.fromWei(balance, "Ether");
  console.log("Ether Balance:", balance);

  // Check Dai balance swap
  balance = await daiContract.methods.balanceOf(process.env.ACCOUNT).call();
  balance = web3.utils.fromWei(balance, "Ether");
  console.log("Dai Balance:", balance);
}

module.exports = {
  checkBalances,
};
