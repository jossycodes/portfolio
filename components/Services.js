// components/Services.jsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Code, Palette, Search, Layout, Server, Smartphone } from 'lucide-react'

const services = [
    { icon: Code, title: 'Web Development', description: 'Build fast, responsive, and scalable web applications', color: 'from-blue-500 to-cyan-500' },
    { icon: Palette, title: 'UI/UX Design', description: 'Create beautiful, user-centered designs that convert', color: 'from-purple-500 to-pink-500' },
    { icon: Search, title: 'SEO Optimization', description: 'Improve visibility and ranking on search engines', color: 'from-green-500 to-emerald-500' },
    { icon: Layout, title: 'Web Templates', description: 'Custom website templates tailored to your brand', color: 'from-orange-500 to-red-500' },
    { icon: Server, title: 'Backend Development', description: 'Robust server-side architecture and APIs', color: 'from-yellow-500 to-amber-500' },
    { icon: Smartphone, title: 'Responsive Design', description: 'Websites that work perfectly on all devices', color: 'from-indigo-500 to-blue-500' },
]

export default function Services() {
    const [active, setActive] = useState(0)
    const current = services[active]

    return (
        <section id="services" className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        My <span className="gradient-text">Services</span>
                    </h2>
                    <p className="text-zinc-400 max-w-2xl mx-auto">What I can do for you and your business</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="glass rounded-2xl overflow-hidden grid md:grid-cols-[minmax(0,280px)_1fr]"
                >
                    {/* menu */}
                    <div className="border-b md:border-b-0 md:border-r border-zinc-800/60">
                        {services.map((service, index) => {
                            const isActive = index === active
                            return (
                                <button
                                    key={service.title}
                                    onClick={() => setActive(index)}
                                    onMouseEnter={() => setActive(index)}
                                    className="relative flex items-center gap-3 w-full text-left px-5 py-4 border-b border-zinc-800/40 last:border-0 transition-colors"
                                >
                                    {isActive && (
                                        <motion.span
                                            layoutId="service-indicator"
                                            className={`absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b ${service.color}`}
                                            transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                                        />
                                    )}
                                    <span className="text-xs text-zinc-600 tabular-nums w-5">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                    <span className={`text-sm font-medium transition-colors ${isActive ? 'text-white' : 'text-zinc-500'}`}>
                                        {service.title}
                                    </span>
                                </button>
                            )
                        })}
                    </div>

                    {/* detail panel */}
                    <div className="relative p-8 md:p-12 min-h-[280px] flex items-center overflow-hidden">
                        <div
                            className={`absolute -right-16 -top-16 w-64 h-64 rounded-full bg-gradient-to-br ${current.color} opacity-[0.08] blur-3xl transition-colors duration-500`}
                        />
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={current.title}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -12 }}
                                transition={{ duration: 0.3 }}
                                className="relative"
                            >
                                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${current.color} p-3.5 mb-6`}>
                                    <current.icon className="w-full h-full text-white" />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-semibold mb-3">{current.title}</h3>
                                <p className="text-zinc-400 max-w-md">{current.description}</p>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}