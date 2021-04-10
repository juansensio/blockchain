//const web3 = require("web3");
const assert = require("assert");

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
    assert.strictEqual(name, "Sensio Exchange");
  });

  it("EthSwap has all tokens", async () => {
    const balance = (await token.balanceOf(ethSwap.address)).toString();
    assert.strictEqual(tokens("1000000"), balance);
    //assert.strictEqual(totalSupply.toString(), balance);
  });

  it("Buy tokens", async () => {
    // el investor compra 100 tokens
    const result = await ethSwap.buyTokens({
      from: investor,
      value: tokens("1"),
    });
    let balance = await token.balanceOf(investor);
    assert.strictEqual(balance.toString(), tokens("100"));
    // los 100 tokens desaparecen del exchange
    balance = await token.balanceOf(ethSwap.address);
    assert.strictEqual(balance.toString(), tokens("999900"));
    // el exchange ha recibido 1 ETH
    balance = await web3.eth.getBalance(ethSwap.address);
    assert.strictEqual(balance.toString(), tokens("1"));
    // se emite evento
    const event = result.logs[0].args;
    assert.strictEqual(event.account, investor);
    assert.strictEqual(event.token, token.address);
    assert.strictEqual(event.amount.toString(), tokens("100"));
    assert.strictEqual(event.rate.toString(), "100");
  });

  it("Sell tokens", async () => {
    // el investor vende sus 100 tokens
    await token.approve(ethSwap.address, tokens("100"), {
      from: investor,
    });
    const result = await ethSwap.sellTokens(tokens("100"), {
      from: investor,
    });
    // los 100 tokens desaparecen del investor
    let balance = await token.balanceOf(investor);
    assert.strictEqual(balance.toString(), tokens("0"));
    // el exchange ha recibido los 100 tokens
    balance = await token.balanceOf(ethSwap.address);
    assert.strictEqual(balance.toString(), tokens("1000000"));
    // el exchange ha dado 1 ETH al investor
    balance = await web3.eth.getBalance(ethSwap.address);
    assert.strictEqual(balance.toString(), tokens("0"));
    // se emite evento de venta
    const event = result.logs[0].args;
    assert.strictEqual(event.account, investor);
    assert.strictEqual(event.token, token.address);
    assert.strictEqual(event.amount.toString(), tokens("100"));
    assert.strictEqual(event.rate.toString(), "100");
    // no se pueden vender mas tokens de los que tenemos
    await assert.rejects(async () => {
      await ethSwap.sellTokens(tokens("100"), {
        from: investor,
      });
    });
  });
});
