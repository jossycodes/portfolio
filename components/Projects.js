// components/Projects.jsx
'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, animate, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'

// Add as many projects as you want — the ring spacing and radius adapt automatically.
const projects = [
    {
        title: 'CVEngine',
        description: "Build professional resumes - cvengine helps you manage resumes/CVs so you don't have to.",
        image: '/images/cvengine.png',
        tags: ['Next.js'],
        live: 'https://cvengine-ten.vercel.app',
    },
    {
        title: 'Cookblock',
        description: 'Github for normals, your projects, versioned and organized.',
        image: '/images/cookblock.svg',
        tags: ['Next.js', 'Socket.io'],
        live: 'https://cookblock.vercel.app',
    },
    {
        title: 'Color Ginie',
        description: 'Color picking tool, color wheel and mode selection included',
        tags: ['html','css','js'],
        live: 'https://colorgenie.netlify.app',
        image: '/images/colorgenie.png'
    },
    {
        title: 'Payfum',
        description: 'Landing page for a mobile money application',
        image: '/images/payfum.jpg',
        tags: ['Next.js', 'Tailwind', 'Framer Motion'],
        live: '#',
    },
    {
        title: 'Smat',
        description: 'Social platform built with Next.js and Socket.io',
        image: '/images/smat.jpg',
        tags: ['Next.js', 'Socket.io', 'MongoDB'],
        live: '#',
    },
    {
        title: 'Blup',
        description: 'Fun ball-popping game for relaxation',
        image: '/images/blup.jpg',
        tags: ['JavaScript', 'Canvas', 'Game'],
        live: '#',
    },
]

// wraps a diff to the shortest equivalent path around the ring, e.g. for n=5: 4 -> -1
function shortestDelta(delta, n) {
    let d = delta % n
    if (d > n / 2) d -= n
    if (d < -n / 2) d += n
    return d
}

function mod(n, m) {
    return ((n % m) + m) % m
}

export default function Projects() {
    const n = projects.length
    const angleStep = (2 * Math.PI) / n

    const [steps, setSteps] = useState(0) // continuous ring position, in "card slots"
    const [active, setActive] = useState(0)
    const [dragging, setDragging] = useState(false)
    const [radiusX, setRadiusX] = useState(320)

    const stageRef = useRef(null)
    const controlsRef = useRef(null)
    const panStartSteps = useRef(0)

    // keep the ring proportional to the available width
    useEffect(() => {
        const el = stageRef.current
        if (!el) return
        const ro = new ResizeObserver(([entry]) => {
            const w = entry.contentRect.width
            setRadiusX(Math.min(380, Math.max(140, w * 0.34)))
        })
        ro.observe(el)
        return () => ro.disconnect()
    }, [])

    const settle = useCallback((targetSteps) => {
        controlsRef.current?.stop()
        controlsRef.current = animate(steps, targetSteps, {
            type: 'spring',
            stiffness: 260,
            damping: 30,
            onUpdate: (v) => setSteps(v),
            onComplete: () => setActive(mod(Math.round(-targetSteps), n)),
        })
    }, [steps, n])

    const goTo = (index) => {
        const base = -index
        const target = steps + shortestDelta(base - steps, n)
        settle(target)
    }

    // px of drag needed to move one card slot
    const pxPerStep = radiusX * 0.7

    const onPanStart = () => {
        controlsRef.current?.stop()
        panStartSteps.current = steps
        setDragging(true)
    }

    const onPan = (e, info) => {
        setSteps(panStartSteps.current + info.offset.x / pxPerStep)
    }

    const onPanEnd = (e, info) => {
        setDragging(false)
        // fold in release velocity so a fast flick carries past the nearest
        // slot instead of always snapping to whatever's closest
        const flingSteps = Math.max(-2, Math.min(2, (info.velocity.x / pxPerStep) * 0.15))
        settle(Math.round(steps + flingSteps))
    }

    const prev = () => goTo(mod(active + 1, n))
    const next = () => goTo(mod(active - 1, n))

    return (
        <section id="projects" className="py-20 px-4 bg-zinc-900/30 overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        My <span className="gradient-text">Projects</span>
                    </h2>
                    <p className="text-zinc-400 max-w-2xl mx-auto">Some projects I've built personally</p>
                </motion.div>

                <motion.div
                    ref={stageRef}
                    className="relative mx-auto select-none touch-none cursor-grab active:cursor-grabbing"
                    style={{ height: 420 }}
                    onPanStart={onPanStart}
                    onPan={onPan}
                    onPanEnd={onPanEnd}
                >
                    {projects.map((project, i) => {
                        const angle = (i + steps) * angleStep
                        const depth = Math.cos(angle) // 1 front, -1 back
                        const x = Math.sin(angle) * radiusX
                        const y = (1 - depth) * 26
                        const scale = 0.55 + 0.45 * ((depth + 1) / 2)
                        const opacity = 0.25 + 0.75 * ((depth + 1) / 2)
                        const zIndex = Math.round(depth * 100)
                        const isFront = i === active && depth > 0.98

                        return (
                            <div
                                key={project.title}
                                onClick={() => !dragging && !isFront && goTo(i)}
                                className="absolute top-1/2 left-1/2"
                                style={{
                                    transform: `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`,
                                    zIndex,
                                    opacity,
                                    filter: depth < 0.6 ? `blur(${(1 - depth) * 1.5}px)` : 'none',
                                    pointerEvents: depth < -0.2 ? 'none' : 'auto',
                                }}
                            >
                                <motion.div
                                    className={`glass rounded-xl overflow-hidden w-72 ${
                                        isFront ? 'shadow-xl shadow-primary/10 cursor-default' : 'cursor-pointer'
                                    }`}
                                    animate={{
                                        scale: isFront ? 1.02 : 1,
                                        boxShadow: isFront
                                            ? '0 20px 60px rgba(233, 69, 96, 0.15)'
                                            : '0 0 0 0 rgba(233, 69, 96, 0)',
                                        borderColor: isFront ? 'rgba(233, 69, 96, 0.3)' : 'rgba(255,255,255,0.05)',
                                    }}
                                    transition={{
                                        duration: 0.4,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                >
                                    <div className="relative h-40 overflow-hidden">
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            draggable={false}
                                            className="object-cover pointer-events-none"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
                                    </div>

                                    <div className="p-5">
                                        <h3 className="text-lg font-semibold mb-1">{project.title}</h3>

                                        <AnimatePresence mode="wait">
                                            {isFront && (
                                                <motion.div
                                                    key="project-details"
                                                    initial={{ opacity: 0, y: -10, height: 0 }}
                                                    animate={{
                                                        opacity: 1,
                                                        y: 0,
                                                        height: 'auto',
                                                        transition: {
                                                            duration: 0.35,
                                                            delay: 0.05,
                                                            ease: [0.22, 1, 0.36, 1],
                                                        },
                                                    }}
                                                    exit={{
                                                        opacity: 0,
                                                        y: 10,
                                                        height: 0,
                                                        transition: {
                                                            duration: 0.25,
                                                            ease: [0.22, 1, 0.36, 1],
                                                        },
                                                    }}
                                                >
                                                    <p className="text-zinc-400 text-sm mb-3">{project.description}</p>
                                                    <div className="flex flex-wrap gap-2 mb-3">
                                                        {project.tags.map((tag) => (
                                                            <span
                                                                key={tag}
                                                                className="px-3 py-1 text-xs rounded-full glass text-zinc-300"
                                                            >
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                    {project.live && project.live !== '#' && (
                                                        <a
                                                            href={project.live}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            onClick={(e) => e.stopPropagation()}
                                                            className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition"
                                                        >
                                                            <ExternalLink size={14} /> Live Demo
                                                        </a>
                                                    )}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                            </div>
                        )
                    })}
                </motion.div>

                <div className="flex items-center justify-center gap-6 mt-6">
                    <button
                        onClick={prev}
                        aria-label="Previous project"
                        className="glass p-2 rounded-full hover:text-primary transition"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <span className="text-sm text-zinc-500 tabular-nums w-14 text-center">
                        {String(active + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
                    </span>
                    <button
                        onClick={next}
                        aria-label="Next project"
                        className="glass p-2 rounded-full hover:text-primary transition"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </section>
    )
}