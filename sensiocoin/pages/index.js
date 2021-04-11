import useAccount from "@/hooks/useAccount";
import { useWeb3 } from "@/hooks/useWeb3";
import {
  Heading,
  VStack,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  Box,
} from "@chakra-ui/react";

export default function Home() {
  const { web3, token, ethSwap } = useWeb3();
  console.log(web3, token, ethSwap);

  const { account, ethBalance, tokenBalance } = useAccount();
  console.log(account, ethBalance, tokenBalance);

  const buyTokens = async (e) => {
    e.preventDefault();
    //   const web3 = window.web3;
    //   const value = web3.utils.toWei(ethAmount.toString(), "Ether");
    //   state.ethSwap.methods.buyTokens().send({
    //     from: state.account,
    //     value,
    //   });
    //   // .on("transactionHash", async (hash) => {
    //   //   console.log("ei");
    //   //   const balance = await web3.eth.getBalance(state.account);
    //   //   const tokenBalance = await state.token.methods
    //   //     .balanceOf(state.account)
    //   //     .call();
    //   //   console.log(tokenBalance);
    //   //   setState({
    //   //     ...state,
    //   //     balance: web3.utils.fromWei(balance, "Ether"),
    //   //     tokenBalance: web3.utils.fromWei(tokenBalance, "Ether"),
    //   //   });
    //   // });
  };

  // const sellTokens = async (amount) => {
  //   const web3 = window.web3;
  //   const value = web3.utils.toWei(amount.toString(), "Ether");
  //   state.token.methods
  //     .approve(state.ethSwap._address, value)
  //     .send({
  //       from: state.account,
  //     })
  //     .on("transactionHash", async (hash) => {
  //       state.ethSwap.methods.sellTokens(value).send({
  //         from: state.account,
  //       });
  //     });
  // };

  return (
    <VStack>
      <Heading>Sensio Exchange</Heading>
      <Text>Consigue aquí tus SensioCoins</Text>
      <Alert status={account ? "success" : "error"}>
        <AlertIcon />
        <AlertTitle mr={2}>Cuenta</AlertTitle>
        <AlertDescription>
          {account ? account : "Conecta tu cuenta"}
        </AlertDescription>
      </Alert>
      <Box as="form" onSubmit={buyTokens}>
        <FormControl id="amount">
          <FormLabel>Cantidad</FormLabel>
          <FormLabel fontSize="10px" color="gray.500">
            100 SENC = 1 ETH
          </FormLabel>
          <NumberInput max={100} min={1}>
            <NumberInputField placeholder={1} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Button mt={4} type="submit" variant="outline">
            Comprar
          </Button>
        </FormControl>
      </Box>
      {/* <p>Cuenta: {account}</p>
      <p>ETH Balance: {balance}</p>
      <p>SENC Balance: {tokenBalance}</p>
      <button onClick={() => buyTokens(1)}>COMPRA</button>
      <button onClick={() => sellTokens(100)}>VENDE</button> */}
    </VStack>
  );
}
