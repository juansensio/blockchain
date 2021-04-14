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
  Grid,
  ButtonGroup,
} from "@chakra-ui/react";
import { useRef } from "react";

export default function Home() {
  const { buyTokens, sellTokens } = useWeb3();
  const { account, ethBalance, tokenBalance } = useAccount();
  const ref = useRef();

  function _buyTokens(e) {
    e.preventDefault();
    const value = ref.current.value;
    if (value) buyTokens(account, value / 100);
  }

  function _sellTokens() {
    const value = ref.current.value;
    if (value) sellTokens(account, value);
  }

  return (
    <VStack maxW="6xl" p={6} margin="0 auto">
      <Heading>Sensio Exchange</Heading>
      <Text>Consigue aquí tus SensioCoins</Text>
      <Grid templateColumns="1fr 1fr" gap="30px">
        <VStack w="full" align="left">
          <Alert status={account ? "success" : "error"} fontSize="10px">
            <AlertIcon />
            <AlertTitle mr={2}>Cuenta</AlertTitle>
            <AlertDescription>
              {account ? account : "Conecta tu cuenta"}
            </AlertDescription>
          </Alert>
          <Text>Tus ETH: {ethBalance}</Text>
          <Text>Tus SENC: {tokenBalance}</Text>
        </VStack>
        <Box as="form" onSubmit={_buyTokens}>
          <FormControl id="amount">
            <FormLabel>Cantidad</FormLabel>
            <FormLabel fontSize="10px" color="gray.500">
              100 SENC = 1 ETH
            </FormLabel>
            <NumberInput min={0}>
              <NumberInputField placeholder={1} ref={ref} />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <ButtonGroup w="full" spacing={6} alignSelf="flex-end">
              <Button mt={4} type="submit" variant="outline">
                Comprar
              </Button>
              <Button mt={4} onClick={_sellTokens} variant="link">
                Vender
              </Button>
            </ButtonGroup>
          </FormControl>
        </Box>
      </Grid>
    </VStack>
  );
}
