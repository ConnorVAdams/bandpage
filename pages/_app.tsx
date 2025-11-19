import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/nav/Navbar/Navbar'
import Background from '../components/shared/Background/Background';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Background />
      <Navbar />
      <Component {...pageProps} />
    </>
  )
}
