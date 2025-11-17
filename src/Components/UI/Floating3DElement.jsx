import { useRef, useEffect } from 'react'
import { useScroll } from '../../hooks/useScroll'

const Floating3DElement = ({ 
  children, 
  className = '', 
  speed = 0.5,
  rotationSpeed = 0.3,
  initialX = 0,
  initialY = 0
}) => {
  const elementRef = useRef(null)
  const { scrollY } = useScroll()

  useEffect(() => {
    if (!elementRef.current) return

    const yOffset = scrollY * speed
    const rotation = scrollY * rotationSpeed

    elementRef.current.style.transform = `
      translate(${initialX}px, ${initialY + yOffset}px)
      rotateY(${rotation}deg)
      rotateX(${rotation * 0.5}deg)
      perspective(1000px)
    `
  }, [scrollY, speed, rotationSpeed, initialX, initialY])

  return (
    <div
      ref={elementRef}
      className={`fixed pointer-events-none ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        willChange: 'transform'
      }}
    >
      {children}
    </div>
  )
}

export default Floating3DElement

