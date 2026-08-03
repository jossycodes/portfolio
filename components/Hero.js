// components/Hero.jsx
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Typewriter } from 'react-simple-typewriter'
import { ChevronDown, Send, Briefcase, Code2, Pause, Play } from 'lucide-react'
import Image from 'next/image'
import { socialLinks } from './socialIcons'

const ease = [0.22, 1, 0.36, 1]
const SLIDE_DURATIONS = [6000, 6000, 8000]

const accents = [
  { solid: '#ec4899', soft: 'rgba(236,72,153,0.18)', grad: 'linear-gradient(90deg,#f9a8d4,#ec4899)' },
  { solid: '#3b82f6', soft: 'rgba(59,130,246,0.18)', grad: 'linear-gradient(90deg,#93c5fd,#3b82f6)' },
  { solid: '#a855f7', soft: 'rgba(168,85,247,0.18)', grad: 'linear-gradient(90deg,#d8b4fe,#a855f7)' },
]

const slideThemes = [
  'radial-gradient(circle at 25% 25%, rgba(236,72,153,0.22), transparent 60%), radial-gradient(circle at 75% 75%, rgba(217,70,160,0.14), transparent 55%)',
  'radial-gradient(circle at 75% 25%, rgba(59,130,246,0.22), transparent 60%), radial-gradient(circle at 25% 75%, rgba(56,189,248,0.14), transparent 55%)',
  'radial-gradient(circle at 50% 30%, rgba(168,85,247,0.22), transparent 60%), radial-gradient(circle at 80% 80%, rgba(192,132,252,0.14), transparent 55%)',
]

const slideVariants = {
  enter: { opacity: 0, x: 80 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -80 },
}



function PausePlayButton({ isPaused, togglePause }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={togglePause}
      layout
      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
      className={`relative flex items-center cursor-pointer z-20 overflow-hidden rounded-full hover:border-none focus:border-none`}
      style={{
        backdropFilter: 'blur(12px)',
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.08)',
        padding: '3px',
      }}
    >
      <motion.div layout className="flex items-center justify-center w-6 h-6 flex-shrink-0">
        {isPaused ? (
          <Play size={15} className="text-white" />
        ) : (
          <Pause size={15} className="text-white" />
        )}
      </motion.div>

      <AnimatePresence initial={false}>
        {isHovered && (
          <motion.span
            key="label"
            initial={{ opacity: 0, width: 0, marginLeft: 0 }}
            animate={{ opacity: 1, width: 'auto', marginLeft: 5 }}
            exit={{ opacity: 0, width: 0, marginLeft: 0 }}
            transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
            className="text-xs font-medium text-white whitespace-nowrap overflow-hidden"
          >
            {isPaused ? <span>PLAY&nbsp;&nbsp;</span> : <span>PAUSE&nbsp;&nbsp;</span>}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}


export default function Hero() {
  const [active, setActive] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const apply = () => setIsMobile(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  useEffect(() => {
    if (isPaused) return
    const t = setTimeout(() => setActive((a) => (a + 1) % 3), SLIDE_DURATIONS[active])
    return () => clearTimeout(t)
  }, [active, isPaused])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') setActive((a) => (a + 1) % 3)
      if (e.key === 'ArrowLeft') setActive((a) => (a - 1 + 3) % 3)
      if (e.key === ' ') {
        e.preventDefault()
        setIsPaused((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const togglePause = () => setIsPaused((prev) => !prev)
  const accent = accents[active]

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      {/* Base backdrop with subtle gradient — lowered alpha on the solid fill so the
          fixed BackgroundDots layer behind the page shows through */}
      <div
        className="absolute inset-0 -z-20"
        style={{
          background: 'radial-gradient(ellipse at 20% 50%, rgba(236,72,153,0.06) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(59,130,246,0.06) 0%, transparent 60%), rgba(9,9,11,0.55)'
        }}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 -z-15 opacity-[0.03]">
        <div className="h-full w-full" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Background washes */}
      {slideThemes.map((bg, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 -z-10"
          style={{ background: bg }}
          animate={{ opacity: active === i ? 1 : 0 }}
          transition={{ duration: 1.6, ease: 'easeInOut' }}
        />
      ))}

      {/* Ambient blobs — smaller blur radius and no position tween on mobile,
          since animating a large blur is one of the costliest things a
          mobile GPU can be asked to do continuously */}
      <motion.div
        className={`absolute top-1/4 left-1/4 rounded-full -z-10 ${isMobile ? 'w-56 h-56 blur-2xl' : 'w-96 h-96 blur-3xl'}`}
        animate={{
          backgroundColor: accent.soft,
          x: isMobile ? 0 : active === 0 ? 0 : active === 1 ? 60 : -40,
          y: isMobile ? 0 : active === 0 ? 0 : active === 1 ? -30 : 40,
        }}
        transition={{ duration: 1.8, ease }}
      />
      <motion.div
        className={`absolute bottom-1/4 right-1/4 rounded-full -z-10 ${isMobile ? 'w-56 h-56 blur-2xl' : 'w-96 h-96 blur-3xl'}`}
        animate={{
          backgroundColor: accent.soft,
          x: isMobile ? 0 : active === 0 ? 0 : active === 1 ? -50 : 50,
          y: isMobile ? 0 : active === 0 ? 0 : active === 1 ? 30 : -30,
        }}
        transition={{ duration: 1.8, ease, delay: 0.1 }}
      />

      <div className="max-w-6xl mx-auto w-full overflow-hidden">
        <AnimatePresence mode="wait">
          {active === 0 && <SlideIntro key="slide-0" accent={accent} />}
          {active === 1 && <SlideInfo key="slide-1" accent={accent} />}
          {active === 2 && <SlideCTA key="slide-2" accent={accent} />}
        </AnimatePresence>
      </div>

      {/* Controls bar: Dot navigation + Pause/Play */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-4 z-10">
        {/* Dot navigation */}
        <div className="flex items-center gap-3 glass px-4 py-2.5 rounded-full">
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="relative h-2 rounded-full transition-all duration-500 outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              style={{ width: active === i ? 28 : 8 }}
            >
              <span
                className="absolute inset-0 rounded-full transition-colors duration-500"
                style={{ backgroundColor: active === i ? accents[i].solid : '#52525b' }}
              />
            </button>
          ))}
        </div>

        {/* Pause/Play button */}
        <PausePlayButton isPaused={isPaused} togglePause={togglePause} />
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-zinc-500 z-10"
      >
        <ChevronDown size={32} className="animate-pulse" />
      </motion.div>
    </section>
  )
}

/* ---------- Slide 1: identity ---------- */
function SlideIntro({ accent }) {
  return (
    <motion.div
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.7, ease }}
      className="grid lg:grid-cols-2 gap-12 items-center"
    >
      <div>
        <motion.a
          href="#contact"
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.08 }}
          className="inline-block px-4 py-2 pr-8 rounded-full glass text-sm text-zinc-300 mb-6 cursor-pointer hover:shadow-lg transition-shadow relative"
          style={{ borderColor: accent.solid }}
        >
          <span className="relative">

            <span className='font-bold text-white'>OPEN TO WORK</span>
            <span className="absolute top-1.5 -right-4 w-2 h-2 rounded-full bg-sky-400 animate-ping"
              style={{
                boxShadow: '0 0 15px 5px rgba(0, 191, 255, 0.8), 0 0 30px 10px rgba(0, 191, 255, 0.4)',
                backgroundColor: '#00d4ff',
              }}
            />
          </span>
        </motion.a>

        <motion.h1
          initial={{ opacity: 0, y: -32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.14 }}
          className="text-4xl md:text-6xl font-bold mb-4 leading-tight"
        >
          <span className="text-zinc-400">Hi, I&apos;m</span>{' '}
          <span
            style={{ backgroundImage: accent.grad, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}
          >
            Josiah Adeniyi
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.22 }}
          className="text-xl md:text-2xl text-zinc-300 h-12"
        >
          <Typewriter
            words={['Building web apps', 'Solving problems', 'Creating experiences', 'Shipping products']}
            typeSpeed={100}
            loop={0}
            delaySpeed={800}
            deleteSpeed={60}
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -40, rotate: -4 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.8, ease, delay: 0.15 }}
        className="flex justify-center"
      >
        <div className="relative">
          <div
            className="absolute inset-0 rounded-full blur-2xl animate-glow"
            style={{ background: accent.grad }}
          />
          <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 shadow-2xl" style={{ borderColor: accent.soft }}>
            <Image
              src="/images/me.png"
              alt="Josiah Adeniyi"
              fill
              className="object-cover"
              priority
              quality={90}
              sizes="(max-width: 768px) 288px, 384px"
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ---------- Slide 2: the pitch ---------- */
function SlideInfo({ accent }) {
  const stack = ['React', 'Next.js', 'Node.js', 'MongoDB']

  return (
    <motion.div
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.7, ease }}
      className="flex flex-col items-center text-center max-w-3xl mx-auto"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, duration: 0.5, ease }}
        className="flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-zinc-300 mb-6"
        style={{ borderColor: accent.solid }}
      >
        <Code2 size={16} style={{ color: accent.solid }} />
        Fullstack Developer &middot; 4+ Years Experience
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6, ease }}
        className="text-3xl md:text-5xl font-bold mb-6 leading-tight"
      >
        I build web apps that are
        <br />
        <span style={{ backgroundImage: accent.grad, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
          fast, beautiful, and user-friendly
        </span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28, duration: 0.5, ease }}
        className="text-zinc-400 max-w-lg mb-8 leading-relaxed"
      >
        From idea to production — I bring ideas to life with clean code and thoughtful design.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.36, duration: 0.5, ease }}
        className="flex flex-wrap justify-center gap-3"
      >
        {stack.map((s) => (
          <span key={s} className="px-4 py-1.5 rounded-full glass text-sm text-zinc-300">
            {s}
          </span>
        ))}
      </motion.div>
    </motion.div>
  )
}

/* ---------- Slide 3: the call to action ---------- */
function SlideCTA({ accent }) {
  return (
    <motion.div
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.7, ease }}
      className="flex flex-col items-center text-center max-w-2xl mx-auto"
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.16, duration: 0.6, ease }}
        className="text-3xl md:text-5xl font-bold mb-4 leading-tight"
      >
        Let&apos;s build something
        <br />
        <span style={{ backgroundImage: accent.grad, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
          worth shipping
        </span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.24, duration: 0.5, ease }}
        className="text-zinc-400 mb-8"
      >
        Got a project in mind? I&apos;m currently open to new opportunities and collaborations.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.32, duration: 0.5, ease }}
        className="flex flex-wrap justify-center gap-4 mb-8"
      >
        <a href="#projects">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-full text-white font-medium transition-all flex items-center gap-2 shadow-lg"
            style={{ background: accent.grad, boxShadow: `0 10px 30px -10px ${accent.soft}` }}
          >
            <Briefcase size={18} />
            View My Work
          </motion.button>
        </a>
        <a href="#contact">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-full glass hover:glass-light text-white font-medium transition-all flex items-center gap-2"
          >
            <Send size={18} />
            Contact Me
          </motion.button>
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="flex gap-4"
      >
        {socialLinks.map((social, idx) => (
          <motion.a
            key={idx}
            whileHover={{ y: -3 }}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 rounded-full glass hover:glass-light transition-all ${social.color}`}
          >
            <social.icon className="w-5 h-5" />
          </motion.a>
        ))}
      </motion.div>
    </motion.div>
  )
}