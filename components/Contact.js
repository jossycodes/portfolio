// components/Contact.jsx
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Send, Mail, User, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react'
import { RedirectType } from 'next/navigation'

export default function Contact() {
    // ... (use the same Contact section code from earlier, just exported as component)
    const [formData, setFormData] = useState({ name: '', email: '', message: '' })
    const [status, setStatus] = useState({ type: '', message: '' })
    const [loading, setLoading] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setStatus({ type: '', message: '' })

        try {
            const response = await fetch('/api/mailer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (data.ok) {
                setStatus({
                    type: 'success',
                    message: 'Message sent! I\'ll reach out soon.',
                })
                setFormData({ name: '', email: '', message: '' })
            } else {
                setStatus({
                    type: 'error',
                    message: data.error || 'Failed to send message. Please try again.',
                })
            }
        } catch {
            setStatus({
                type: 'error',
                message: 'Network error. Please try again.',
            })
        } finally {
            setLoading(false)
        }
    }
    return (

        <section id="contact" className="py-20 px-4 bg-zinc-900/30">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Let's <span className="gradient-text">Connect</span>
                    </h2>
                    <p className="text-zinc-400 max-w-2xl mx-auto">Got an idea? Let's build something amazing together</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                    className="glass p-8 rounded-2xl max-w-2xl mx-auto"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-2">
                                    <User size={16} className="inline mr-1" /> Your Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg bg-zinc-800/50 border border-zinc-700 focus:border-primary focus:outline-none transition text-white"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-2">
                                    <Mail size={16} className="inline mr-1" /> Your Email
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg bg-zinc-800/50 border border-zinc-700 focus:border-primary focus:outline-none transition text-white"
                                    placeholder="john@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-2">
                                <MessageSquare size={16} className="inline mr-1" /> Your Message
                            </label>
                            <textarea
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                rows={5}
                                className="w-full px-4 py-2 rounded-lg bg-zinc-800/50 border border-zinc-700 focus:border-primary focus:outline-none transition text-white resize-none"
                                placeholder="Tell me about your project..."
                                required
                            />
                        </div>

                        {status.message && (
                            <div className={`flex items-center gap-2 p-3 rounded-lg ${status.type === 'success'
                                ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                : 'bg-red-500/10 text-red-400 border border-red-500/20'
                                }`}>
                                {status.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                                {status.message}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 rounded-lg bg-primary hover:bg-primary/80 text-white font-medium transition-all flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''
                                }`}
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <Send size={18} />
                                    Send Message
                                </>
                            )}
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    )
}