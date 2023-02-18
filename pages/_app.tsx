import type { AppProps } from 'next/app';
import { Box, ChakraProvider } from '@chakra-ui/react';
import customTheme from '../utils/theme';
import Navbar from '../components/Navbar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider resetCSS theme={customTheme}>
        <Box maxW="100vw" minH="100vh" bg="background" color="white">
          <Navbar />
          <Component {...pageProps} />
        </Box>
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default MyApp
