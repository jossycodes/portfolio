// components/Footer.jsx
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { socialLinks } from './socialIcons'

export default function Footer() {
  return (
    <footer className="py-8 px-4 border-t border-zinc-800/50">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-4">
        <div className="flex gap-6">
          {socialLinks.map((social, idx) => (
            <motion.a
              key={idx}
              whileHover={{ y: -3 }}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-zinc-400 hover:text-white transition ${social.color}`}
            >
              <social.icon className="w-5 h-5" />
            </motion.a>
          ))}
        </div>
        <p className="text-sm text-zinc-500 flex items-center gap-1">
          Made with <Heart size={14} className="text-red-500" /> by Josiah Adeniyi
        </p>
      </div>
    </footer>
  )
}