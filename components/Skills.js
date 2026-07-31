// components/SkillsGrid.jsx
import { motion } from 'framer-motion'
import Image from 'next/image'

const skills = {
    Expert: [
        { name: 'JavaScript', icon: '/images/javascript-icon.png', color: '#F7DF1E' },
        { name: 'React', icon: '/images/react-icon.png', color: '#61DAFB' },
        { name: 'Node.js', icon: '/images/nodejs-icon.png', color: '#339933' },
    ],
    Proficient: [
        { name: 'Next.js', icon: '/images/nextjs-icon.svg', color: '#ffffff' },
        { name: 'TypeScript', icon: '/images/typescriptlang-icon.svg', color: '#3178C6' },
        { name: 'MongoDB', icon: '/images/mongodb-icon.png', color: '#47A248' },
        { name: 'Tailwind', icon: '/images/tailwindcss-icon.svg', color: '#06B6D4' },
        { name: 'Git', icon: '/images/git-scm-icon.svg', color: '#f03c2e' },
    ],
    Familiar: [
        { name: 'Docker', icon: '/images/docker-icon.svg', color: '#2496ED' },
        { name: 'Angular', icon: '/images/angular-icon.svg', color: '#b52e31' },
        { name: 'GraphQL', icon: '/images/graphql-icon.svg', color: '#E10098' },
    ],
}

// strength shown per tier, out of 3 — real signal, not decoration
const tierStrength = { Expert: 3, Proficient: 2, Familiar: 1 }

function StrengthDots({ level }) {
    return (
        <span className="flex gap-1">
            {[1, 2, 3].map((i) => (
                <span
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full ${i <= level ? 'bg-primary' : 'bg-zinc-700'}`}
                />
            ))}
        </span>
    )
}

export default function SkillsGrid() {
    return (
        <section className="py-24 px-4 bg-zinc-900/30">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        My <span className="gradient-text">Tech Stack</span>
                    </h2>
                    <p className="text-zinc-400 max-w-2xl mx-auto">
                        Technologies I work with regularly
                    </p>
                </motion.div>

                <div className="space-y-16">
                    {Object.entries(skills).map(([category, items], categoryIndex) => (
                        <motion.div
                            key={category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: categoryIndex * 0.15 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center justify-center gap-3 mb-8">
                                <div className="h-px w-12 bg-gradient-to-r from-transparent to-zinc-700" />
                                <h3 className="text-2xl font-semibold text-zinc-300 tracking-wide">
                                    {category}
                                </h3>
                                <StrengthDots level={tierStrength[category]} />
                                <div className="h-px w-12 bg-gradient-to-l from-transparent to-zinc-700" />
                            </div>

                            <div className="flex flex-wrap justify-center gap-5">
                                {items.map((skill) => (
                                    <motion.div
                                        key={skill.name}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.05 }}
                                        whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300 } }}
                                        viewport={{ once: true }}
                                        className="group relative p-5 rounded-2xl text-center bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 transition-colors duration-300 hover:border-[--tier-color] w-[auto] lg:w-[200px]"
                                        style={{ '--tier-color': skill.color }}
                                    >
                                        <div
                                            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                            style={{
                                                background: `radial-gradient(circle at center, ${skill.color}25, transparent 70%)`,
                                                boxShadow: `0 0 30px ${skill.color}25`,
                                            }}
                                        />

                                        <div className="relative z-10">
                                            <div className="w-14 h-14 mx-auto mb-3 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                                                <Image
                                                    src={skill.icon}
                                                    alt={skill.name}
                                                    width={45}
                                                    height={45}
                                                    className="object-contain"
                                                />
                                            </div>

                                            <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors duration-300">
                                                {skill.name}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <p className="text-sm text-zinc-500 max-w-2xl mx-auto">
                        I specialize in JavaScript/TypeScript with a focus on React and Node.js.
                        I've been building web applications for over 4 years, working on everything
                        from startups to enterprise projects.
                    </p>
                </motion.div>
            </div>
        </section>
    )
}