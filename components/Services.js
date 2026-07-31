// components/Services.jsx
import { motion } from 'framer-motion'
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
    // ... (use the same Services section code from earlier, just exported as component)

    return (
        <div>
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

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                viewport={{ once: true }}
                                className="glass p-6 rounded-xl text-center transition-all hover:shadow-xl hover:shadow-primary/5"
                            >
                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} p-3 mx-auto mb-4`}>
                                    <service.icon className="w-full h-full text-white" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                                <p className="text-zinc-400 text-sm">{service.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}