const Token = artifacts.require("Token");
const EthSwap = artifacts.require("EthSwap");

module.exports = async function (deployer) {
  await deployer.deploy(Token);
  const token = await Token.deployed();

  await deployer.deploy(EthSwap, token.address);
  const ethSwap = await EthSwap.deployed();

  const totalSupply = await token.totalSupply();
  await token.transfer(ethSwap.address, totalSupply);
};
