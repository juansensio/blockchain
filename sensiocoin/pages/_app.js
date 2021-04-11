import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/styles/theme";
import { Web3Provider } from "@/hooks/useWeb3";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Web3Provider>
        <Component {...pageProps} />
      </Web3Provider>
    </ChakraProvider>
  );
}

export default MyApp;
