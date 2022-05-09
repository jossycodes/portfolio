import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import Nav from '@components/Nav'

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Josiah Adeniyi</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/uikit@3.14.1/dist/css/uikit.min.css" />
      </Head>
      <nav>
       <Nav />
      </nav>
      <main>
        <h1>Hello am Josiah</h1>
      </main>

      <Footer />
    </div>
  )
}
