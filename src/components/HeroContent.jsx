import { motion } from 'framer-motion'
import './HeroContent.css'

export default function HeroContent() {
  return (
    <div className="hero-content">
      <motion.h1
        className="hero-headline"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        OpenStacks Inc., a great software company that builds great developer tools
      </motion.h1>

      <motion.a
        href="https://x.com/openstacksio"
        target="_blank"
        rel="noopener noreferrer"
        className="twitter-link"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2 }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      </motion.a>
    </div>
  )
}