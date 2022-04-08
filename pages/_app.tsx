import {
  ChakraProvider,
  Container,
  Image,
  Heading,
  Text,
  Divider,
  Stack,
  Box,
} from "@chakra-ui/react";
import { AppProps } from "next/app";
import theme from "../theme";
import avatar from "../public/images/avatar.png";
import Head from "next/head";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>FarmaPlus</title>
        <meta name="description" content="uwu" />
      </Head>
      <ChakraProvider theme={theme}>
        <Container
          backgroundColor="white"
          borderRadius="sm"
          maxWidth="container.xl"
          padding={4}
        >
          <Stack spacing={8}>
            <Stack marginBottom={4} spacing={0}>
              <Image
                alt="farmaplus"
                height="100%"
                maxHeight={64}
                src="./images/banner.jpg"
              ></Image>
              <Stack direction="row" alignItems="center" spacing={6}>
                <Box
                  padding={1}
                  backgroundColor="white"
                  marginTop={-16}
                  borderRadius={9999}
                >
                  <Image
                    src="./images/avatar.jpg"
                    alt="wea"
                    borderRadius={9999}
                    width={32}
                    height={32}
                  />
                </Box>
                <Stack spacing={1}>
                  <Heading>FarmaPlus</Heading>
                  <Text color="gray.500" fontWeight={500}>
                    Te ayudamos a cuidarte
                  </Text>
                </Stack>
              </Stack>
              <Divider marginY={6} />
            </Stack>
            <Component {...pageProps} />
          </Stack>
        </Container>
      </ChakraProvider>
    </>
  );
};

export default App;
