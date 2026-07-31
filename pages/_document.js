// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" className="dark">
      <Head>
        <meta name="theme-color" content="#e94560" />
        <meta name="description" content="Fullstack developer with 4+ years experience building web applications" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <body className="bg-zinc-950 text-zinc-100 antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}