import type { AppProps } from 'next/app';
import { Box, ChakraProvider } from '@chakra-ui/react';
import customTheme from '../utils/theme';
import Navbar from '../components/Navbar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={customTheme}>
      <Box maxW="100vw" minH="100vh" bg="background" color="white">
        <Navbar />
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  )
}

export default MyApp
