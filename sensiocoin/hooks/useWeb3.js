import React, { useState, useEffect, useContext, createContext } from "react";
import Web3 from "web3";
import Token from "../build/contracts/Token.json";
import EthSwap from "../build/contracts/EthSwap.json";

export function useProvideWeb3() {
  const [state, setState] = useState({});

  useEffect(async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      window.ethereum.enable();
      const web3 = window.web3;
      const networkId = await web3.eth.net.getId();
      const tokenData = Token.networks[networkId];
      const ethSwapData = EthSwap.networks[networkId];
      if (tokenData && ethSwapData) {
        const token = new web3.eth.Contract(Token.abi, tokenData.address);
        const ethSwap = new web3.eth.Contract(EthSwap.abi, ethSwapData.address);
        setState({
          web3,
          token,
          ethSwap,
        });
      } else window.alert("Contratos no desplegados");
    }
  }, []);

  const buyTokens = async (account, value) => {
    value = web3.utils.toWei(value.toString(), "Ether");
    state.ethSwap.methods.buyTokens().send({
      from: account,
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

  const sellTokens = async (account, amount) => {
    const value = web3.utils.toWei(amount.toString(), "Ether");
    state.token.methods
      .approve(state.ethSwap._address, value)
      .send({
        from: account,
      })
      .on("transactionHash", async (hash) => {
        state.ethSwap.methods.sellTokens(value).send({
          from: account,
        });
      });
  };

  return {
    ...state,
    buyTokens,
    sellTokens,
  };
}

const web3Context = createContext();

export function Web3Provider({ children }) {
  const web3 = useProvideWeb3();
  return <web3Context.Provider value={web3}>{children}</web3Context.Provider>;
}

export const useWeb3 = () => useContext(web3Context);
