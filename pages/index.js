// pages/index.js
import Head from 'next/head'
import BackgroundDots from '@/components/BackgroundDots'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Services from '@/components/Services'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Head>
        <title>Josiah Adeniyi | Fullstack Developer</title>
        <meta name="description" content="Fullstack developer with 4+ years experience building web applications" />
        <meta property="og:title" content="Josiah Adeniyi | Fullstack Developer" />
        <meta property="og:description" content="Fullstack developer with 4+ years experience" />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="relative z-10 min-h-screen">
        <BackgroundDots />

        <Hero />
        <About />
        <Skills />
        <Projects />
        <Services />
        <Contact />
        <Footer />
      </main>
    </>
  )
}