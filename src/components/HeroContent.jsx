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
        OpenStacks Inc., a software company that builds developer tools
      </motion.h1>
    </div>
  )
}