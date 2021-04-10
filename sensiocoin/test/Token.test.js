const Token = artifacts.require("Token");
const EthSwap = artifacts.require("EthSwap");

//require("chai").use(require("chai-as-promised")).should();

contract("Token", (accounts) => {
  it("Token has a name", async () => {
    const token = await Token.new();
    const name = await token.name();
    assert.equal(name, "SensioCoin");
  });
  it("Token has a symbol", async () => {
    const token = await Token.new();
    const symbol = await token.symbol();
    assert.equal(symbol, "SENC");
  });
});
