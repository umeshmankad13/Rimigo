import { useState, useEffect } from 'react'

export const useScroll = () => {
  const [scrollY, setScrollY] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [scrollDirection, setScrollDirection] = useState('down')

  useEffect(() => {
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = maxScroll > 0 ? currentScrollY / maxScroll : 0

      setScrollY(currentScrollY)
      setScrollProgress(progress)
      setScrollDirection(currentScrollY > lastScrollY ? 'down' : 'up')
      lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { scrollY, scrollProgress, scrollDirection }
}

export const use3DTransform = (elementRef, options = {}) => {
  const { scrollY } = useScroll()
  const {
    intensity = 0.1,
    rotateX = true,
    rotateY = true,
    translateZ = false,
    maxRotation = 15
  } = options

  useEffect(() => {
    if (!elementRef.current) return

    const rect = elementRef.current.getBoundingClientRect()
    const elementCenterY = rect.top + rect.height / 2
    const viewportCenterY = window.innerHeight / 2
    const distanceFromCenter = elementCenterY - viewportCenterY
    const normalizedDistance = distanceFromCenter / (window.innerHeight / 2)

    const rotationX = rotateX ? normalizedDistance * maxRotation * intensity : 0
    const rotationY = rotateY ? (scrollY * 0.01) * intensity : 0
    const translateZValue = translateZ ? Math.abs(normalizedDistance) * 50 : 0

    elementRef.current.style.transform = `
      perspective(1000px)
      rotateX(${rotationX}deg)
      rotateY(${rotationY}deg)
      translateZ(${translateZValue}px)
    `
  }, [scrollY, elementRef, intensity, rotateX, rotateY, translateZ, maxRotation])
}

