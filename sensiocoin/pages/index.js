import Web3 from "web3";
import EthSwap from "../build/contracts/EthSwap.json";
import Token from "../build/contracts/Token.json";
import { useEffect, useState } from "react";

export default function Home() {
  const [state, setState] = useState({});

  useEffect(() => {
    ethEnabled();
    loadData();
  }, []);

  const ethEnabled = () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      window.ethereum.enable();
      return true;
    }
    return false;
  };

  const loadData = async () => {
    const web3 = window.web3;
    const account = (await web3.eth.getAccounts())[0];
    const balance = await web3.eth.getBalance(account);
    const networkId = await web3.eth.net.getId();
    const tokenData = Token.networks[networkId];
    const ethSwapData = EthSwap.networks[networkId];
    if (tokenData && ethSwapData) {
      const token = new web3.eth.Contract(Token.abi, tokenData.address);
      const tokenBalance = await token.methods.balanceOf(account).call();
      const ethSwap = new web3.eth.Contract(EthSwap.abi, ethSwapData.address);
      setState({
        account,
        balance: web3.utils.fromWei(balance, "Ether"),
        token,
        ethSwap,
        tokenBalance: web3.utils.fromWei(tokenBalance, "Ether"),
      });
    } else window.alert("Contratos no desplegados");
  };

  const buyTokens = async (ethAmount) => {
    const web3 = window.web3;
    const value = web3.utils.toWei(ethAmount.toString(), "Ether");
    state.ethSwap.methods.buyTokens().send({
      from: state.account,
      value,
    });
    // .on("transactionHash", async (hash) => {
    //   console.log("ei");
    //   const balance = await web3.eth.getBalance(state.account);
    //   const tokenBalance = await state.token.methods
    //     .balanceOf(state.account)
    //     .call();
    //   console.log(tokenBalance);
    //   setState({
    //     ...state,
    //     balance: web3.utils.fromWei(balance, "Ether"),
    //     tokenBalance: web3.utils.fromWei(tokenBalance, "Ether"),
    //   });
    // });
  };

  const sellTokens = async (amount) => {
    const web3 = window.web3;
    const value = web3.utils.toWei(amount.toString(), "Ether");
    console.log(state.ethSwap.address);
    // state.token.methods
    //   .approve(state.ethSwap.address, value)
    //   .send({
    //     from: state.account,
    //   })
    //   .on("transactionHash", async (hash) => {
    //     state.ethSwap.methods.sellTokens(value).send({
    //       from: state.account,
    //     });
    //   });
  };

  const { account, balance, tokenBalance } = state;
  return (
    <div>
      <p>Cuenta: {account}</p>
      <p>ETH Balance: {balance}</p>
      <p>SENC Balance: {tokenBalance}</p>
      <button onClick={() => buyTokens(1)}>COMPRA</button>
      <button onClick={() => sellTokens(100)}>VENDE</button>
    </div>
  );
}
