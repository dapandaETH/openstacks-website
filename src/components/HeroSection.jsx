import ParticleGalaxy from './ParticleGalaxy'
import HeroContent from './HeroContent'
import GradientOverlay from './GradientOverlay'
import './HeroSection.css'

export default function HeroSection() {
  return (
    <section className="hero-section">
      <ParticleGalaxy />
      <GradientOverlay />
      <HeroContent />
    </section>
  )
}