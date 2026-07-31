// components/About.jsx
import { motion } from 'framer-motion'
import { Code, Users, Rocket, Award } from 'lucide-react'

const stats = [
    { icon: Code, label: 'Years Experience', value: '4+' },
    { icon: Users, label: 'Happy Clients', value: '30+' },
    { icon: Rocket, label: 'Projects Delivered', value: '50+' },
    { icon: Award, label: 'Certifications', value: '3+' },
]

// Kept to traits that aren't already covered by the Services / Tech Stack
// sections — no point restating "React, Node, MongoDB" a second time.
const workingStyle = [
    'Team player & collaborative problem solver',
    'Continuous learner & self-improvement',
    'Agile development & project management',
]

// Parent controls timing; letters just react to it. This is the part that
// was missing before — hardcoded per-letter variants can't stagger
// against each other without a shared parent driving the timeline.
const headingContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.045,
            delayChildren: 0.1,
        },
    },
}

const letterVariants = {
    hidden: { opacity: 0, y: 24, rotateX: -90 },
    visible: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: { type: 'spring', stiffness: 300, damping: 20 },
    },
}

// Renders a string as individually animated letter spans sharing one
// staggerChildren timeline. Spaces render as non-breaking so they keep
// their width.
function AnimatedWord({ text, className = '' }) {
    return (
        <span className={`inline-block ${className}`} style={{ perspective: 400 }}>
            {text.split('').map((char, i) => (
                <motion.span
                    key={i}
                    variants={letterVariants}
                    className="inline-block"
                    style={{ transformOrigin: 'bottom' }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            ))}
        </span>
    )
}

export default function About() {
    return (
        <section id="about" className="py-20 px-4 bg-zinc-900/30">
            <div className="max-w-6xl mx-auto">
                {/* Section title with animated letters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="text-center mb-12"
                >
                    <motion.h2
                        className="text-4xl md:text-5xl font-bold mb-4"
                        variants={headingContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        <AnimatedWord text="About " />
                        <span className='gradient-text'>Me</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        viewport={{ once: true, amount: 0.3 }}
                        className="text-zinc-400 max-w-2xl mx-auto"
                    >
                        Passionate about building things that make a difference
                    </motion.p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <h3 className="text-2xl font-semibold mb-4">
                            Fullstack Developer & Problem Solver
                        </h3>
                        <p className="text-zinc-400 leading-relaxed mb-4">
                            I'm a passionate fullstack web developer who loves turning complex problems
                            into elegant solutions. With a strong foundation in JavaScript and a
                            diverse tech stack, I bring ideas to life.
                        </p>
                        <p className="text-zinc-400 leading-relaxed">
                            Whether it's crafting beautiful user interfaces or building robust
                            backend systems, I thrive on creating impactful digital experiences.
                        </p>

                        <motion.div
                            className="grid grid-cols-2 gap-4 mt-6"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={{
                                hidden: {},
                                visible: { transition: { staggerChildren: 0.1 } },
                            }}
                        >
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    variants={{
                                        hidden: { opacity: 0, scale: 0.8, y: 10 },
                                        visible: { opacity: 1, scale: 1, y: 0 },
                                    }}
                                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                                    className="glass p-4 rounded-xl text-center"
                                >
                                    <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                                    <div className="text-sm text-zinc-400">{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true, amount: 0.2 }}
                        className="glass p-8 rounded-2xl"
                    >
                        <h4 className="text-xl font-semibold mb-4">How I Work</h4>
                        <motion.ul
                            className="space-y-3 text-zinc-400"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={{
                                hidden: {},
                                visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
                            }}
                        >
                            {workingStyle.map((item, index) => (
                                <motion.li
                                    key={index}
                                    variants={{
                                        hidden: { opacity: 0, x: -10 },
                                        visible: { opacity: 1, x: 0 },
                                    }}
                                    className="flex items-center gap-2"
                                >
                                    <span className="text-primary">▸</span>
                                    {item}
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}