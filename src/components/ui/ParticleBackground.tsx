'use client'

import { useEffect, useRef } from 'react'

export default function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const particles = Array.from({ length: 18 }, (_, i) => {
      const el = document.createElement('div')
      el.className = 'particle'
      el.style.cssText = `
        --duration: ${6 + Math.random() * 8}s;
        --delay: ${Math.random() * 8}s;
        --x: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        width: ${2 + Math.random() * 4}px;
        height: ${2 + Math.random() * 4}px;
      `
      container.appendChild(el)
      return el
    })

    return () => particles.forEach(p => p.remove())
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    />
  )
}
