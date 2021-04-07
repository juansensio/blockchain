//const web3 = require("web3");

const Token = artifacts.require("Token");
const EthSwap = artifacts.require("EthSwap");

//require("chai").use(require("chai-as-promised")).should();

function tokens(n) {
  return web3.utils.toWei(n, "ether");
}

contract("EthSwap", ([deployer, investor]) => {
  let token, ethSwap;

  before(async () => {
    token = await Token.new();
    ethSwap = await EthSwap.new(token.address);
    await token.transfer(ethSwap.address, tokens("1000000"));
  });

  it("EthSwap has a name", async () => {
    const name = await ethSwap.name();
    assert.equal(name, "EthSwap Sensio Exchange");
  });

  it("EthSwap has all tokens", async () => {
    const balance = (await token.balanceOf(ethSwap.address)).toString();
    assert.equal(tokens("1000000"), balance);
    //assert.equal(totalSupply.toString(), balance);
  });

  it("Buy tokens", async () => {
    // el investor compra 100 tokens
    const result = await ethSwap.buyTokens({
      from: investor,
      value: tokens("1"),
    });
    let balance = await token.balanceOf(investor);
    assert.equal(balance.toString(), tokens("100"));
    // los 100 tokens desaparecen del exchange
    balance = await token.balanceOf(ethSwap.address);
    assert.equal(balance.toString(), tokens("999900"));
    // el exchange ha recibido 1 ETH
    balance = await web3.eth.getBalance(ethSwap.address);
    assert.equal(balance.toString(), tokens("1"));
    // se emite evento
    const event = result.logs[0].args;
    assert.equal(event.account, investor);
    assert.equal(event.token, token.address);
    assert.equal(event.amount.toString(), tokens("100"));
    assert.equal(event.rate.toString(), "100");
  });
});
