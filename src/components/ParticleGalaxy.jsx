import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { motion } from 'framer-motion'

const PARTICLE_COUNT = 2700

function Particles() {
  const meshRef = useRef()
  const mouseRef = useRef({ x: 0, y: 0 })

  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const colors = new Float32Array(PARTICLE_COUNT * 3)
    const sizes = new Float32Array(PARTICLE_COUNT)

    const indigo = new THREE.Color('#6366f1')
    const cyan = new THREE.Color('#06b6d4')
    const white = new THREE.Color('#ffffff')

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = Math.pow(Math.random(), 0.5) * 4.5

      positions[i3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.4
      positions[i3 + 2] = r * Math.cos(phi)

      const t = Math.random()
      let color
      if (t < 0.4) {
        color = indigo.clone().lerp(cyan, Math.random())
      } else if (t < 0.7) {
        color = cyan.clone().lerp(white, Math.random() * 0.5)
      } else {
        color = white.clone().multiplyScalar(0.4 + Math.random() * 0.3)
      }
      colors[i3] = color.r
      colors[i3 + 1] = color.g
      colors[i3 + 2] = color.b

      sizes[i] = (Math.random() * 3 + 1) * 3.5
    }

    return { positions, colors, sizes }
  }, [])

  useFrame((state, delta) => {
    if (!meshRef.current) return
    const geometry = meshRef.current.geometry
    const posAttr = geometry.attributes.position
    const arr = posAttr.array

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      arr[i3 + 1] += Math.sin(state.clock.elapsedTime * 0.3 + i * 0.01) * 0.001
      arr[i3] += Math.cos(state.clock.elapsedTime * 0.2 + i * 0.02) * 0.0005
    }
    posAttr.needsUpdate = true

    meshRef.current.rotation.y += delta * 0.03
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1

    mouseRef.current.x += (state.pointer.x * 0.3 - mouseRef.current.x) * 0.02
    mouseRef.current.y += (state.pointer.y * 0.3 - mouseRef.current.y) * 0.02
    meshRef.current.rotation.y += mouseRef.current.x * delta * 0.5
    meshRef.current.rotation.x += mouseRef.current.y * delta * 0.3
  })

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      },
      vertexShader: `
        attribute float aSize;
        attribute vec3 aColor;
        varying vec3 vColor;
        uniform float uTime;
        uniform float uPixelRatio;

        void main() {
          vColor = aColor;
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);
          vec4 viewPosition = viewMatrix * modelPosition;
          vec4 projectedPosition = projectionMatrix * viewPosition;
          gl_Position = projectedPosition;

          float sizeProg = 1.0 + sin(uTime * 0.5 + position.x * 2.0) * 0.3;
          gl_PointSize = aSize * uPixelRatio * sizeProg * (1.0 / -viewPosition.z);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;

        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float alpha = 1.0 - smoothstep(0.2, 0.5, d);
          gl_FragColor = vec4(vColor, alpha * 0.8);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  }, [])

  useFrame((state) => {
    shaderMaterial.uniforms.uTime.value = state.clock.elapsedTime
  })

  return (
    <points ref={meshRef} material={shaderMaterial}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aColor"
          count={PARTICLE_COUNT}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aSize"
          count={PARTICLE_COUNT}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
    </points>
  )
}

export default function ParticleGalaxy() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 2]}
        style={{ width: '100%', height: '100%' }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={0.5} color="#6366f1" />
        <pointLight position={[-5, -2, 3]} intensity={0.3} color="#06b6d4" />
        <Particles />
      </Canvas>
    </motion.div>
  )
}
