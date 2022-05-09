import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Josiah Adeniyi</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Hello am Josiah</h1>
      </main>

      <Footer />
    </div>
  )
}
