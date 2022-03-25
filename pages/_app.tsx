import {
  ChakraProvider,
  Container,
  VStack,
  Image,
  Heading,
  Text,
  Box,
  Divider,
} from "@chakra-ui/react";
import { AppProps } from "next/app";
import theme from "../theme";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Box padding={4}>
        <Container
          backgroundColor="white"
          boxShadow="md"
          borderRadius="sm"
          maxWidth="container.xl"
          padding={4}
        >
          <VStack marginBottom={6}>
            <Image
              src="https://media-exp1.licdn.com/dms/image/C4D0BAQHdpwBG9x1obw/company-logo_200_200/0/1619456100463?e=2147483647&v=beta&t=tpTVeFT-_ugxjOB3T4gU8oZNtqPXKv7c03Jyy2vZMM8"
              alt="wea"
            />
          </VStack>
          <Divider marginY={6} />
          <Component {...pageProps} />
        </Container>
      </Box>
    </ChakraProvider>
  );
};

export default App;
