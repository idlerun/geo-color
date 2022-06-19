import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import type { AppProps } from 'next/app'

import '../src/style/main.css'

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
})

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={darkTheme}>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
