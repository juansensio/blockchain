import { useEffect, useState } from "react";
import { useWeb3 } from "./useWeb3";

export default function useAccount() {
  const [state, setState] = useState({});
  const { web3, token } = useWeb3();

  useEffect(async () => {
    if (web3) {
      const account = (await web3.eth.getAccounts())[0];
      const ethBalance = await web3.eth.getBalance(account);
      const tokenBalance = await token.methods.balanceOf(account).call();
      setState({
        account,
        ethBalance: web3.utils.fromWei(ethBalance, "Ether"),
        tokenBalance: web3.utils.fromWei(tokenBalance, "Ether"),
      });
    }
  }, [web3]);

  return state;
}
