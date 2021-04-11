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

  return state;
}

const web3Context = createContext();

export function Web3Provider({ children }) {
  const web3 = useProvideWeb3();
  return <web3Context.Provider value={web3}>{children}</web3Context.Provider>;
}

export const useWeb3 = () => useContext(web3Context);
