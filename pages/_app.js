import '../styles/globals.css'
import React from 'react'
import { UserProvider } from '@auth0/nextjs-auth0'
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import constants from '../styles/constants'

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: constants.primary80,
        color: constants.blackMain,
      },
      a: {
        color: constants.accentRedMain
      }
    },
  },

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
