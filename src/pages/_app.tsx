import type { AppProps } from 'next/app'
import Image from 'next/image'
import logoImg from '../assets/logo.svg'
import { globalStyles } from '../styles/global'
import { Container, Header } from '../styles/pages/app'

// A função `globalStyles()` está fora do componente `App` porque 
// ela não precisa ser renderizada toda vez que uma página for 
// alterada. 
globalStyles()

export default function App({ Component, pageProps }: AppProps) {

  return (
    <Container>
      <Header>
        <Image src={logoImg} alt="" />
      </Header>
      <Component {...pageProps} />
    </Container>
  )
}
