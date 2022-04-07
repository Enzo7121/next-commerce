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
import avatar from "../assets/images/avatar.png";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
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
              src="https://farmaciatavernercaselles.com/wp-content/uploads/2018/09/banner-home-farmacia.jpg"
            ></Image>
            <Stack direction="row" alignItems="center" spacing={6}>
              <Box
                padding={1}
                backgroundColor="white"
                marginTop={-16}
                borderRadius={9999}
              >
                <Image
                  src="https://scontent.feze13-1.fna.fbcdn.net/v/t1.6435-9/119515822_114068367103604_4294626060624776154_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeHTrzP6iMIi4bTbDvBqwMFkpelgN91qIJul6WA33Wogm-BElbQ4dtvh81Vj-4g_-lE&_nc_ohc=i8WXLDbpJsEAX9F-NLp&_nc_ht=scontent.feze13-1.fna&oh=00_AT-McmhP9r460hync-1I3hpufZT_qMAnK0eV_NJwEefAsw&oe=6273D561"
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
  );
};

export default App;
