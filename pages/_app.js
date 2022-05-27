import '../styles/globals.css'
import React from 'react'
import { UserProvider } from '@auth0/nextjs-auth0'
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import constants from '../styles/constants'

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: constants.mainColor,
        color: 'black',
      },
      a: {
        color: 'teal.500'
      }
    },
  },
  brand: {
    1: '#58beaa',
    2: '#be586c',
    3: '#be7758',
    4: '#589fbe',
    5: '#F6BD60',
    6: '#FAE0C6',
  }
})

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </ChakraProvider>
  )
}

export default MyApp
