// components/Projects.jsx
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'

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

export default function Projects() {
    // ... (use the same Projects section code from earlier, just exported as component)

    return(
        <div>
            <section id="projects" className="py-20 px-4 bg-zinc-900/30">
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

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="glass rounded-xl overflow-hidden transition-all hover:shadow-xl hover:shadow-primary/10 group"
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                                    <p className="text-zinc-400 text-sm mb-4">{project.description}</p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.tags.map((tag, tagIndex) => (
                                            <span
                                                key={tagIndex}
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
                                            className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition"
                                        >
                                            <ExternalLink size={14} /> Live Demo
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}