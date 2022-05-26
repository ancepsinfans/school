import '../styles/globals.css'
import React from 'react'
import { UserProvider } from '@auth0/nextjs-auth0'
import { Box, ChakraProvider, extendTheme } from "@chakra-ui/react"

const colors = {
  brand: {
    1: '#58beaa',
    2: '#be586c',
    3: '#be7758',
    4: '#589fbe',
    5: '#F6BD60',
    6: '#FAE0C6',
  }
}

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={extendTheme({ colors })}>
      <Box bg='brand.1'>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </Box>
    </ChakraProvider>
  )
}

export default MyApp
