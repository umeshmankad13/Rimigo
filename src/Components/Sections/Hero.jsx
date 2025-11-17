import { useState, useRef, useEffect } from 'react'
import { useScroll } from '../../hooks/useScroll'

const Hero = () => {
  const heroPanelRef = useRef(null)
  const headingRef = useRef(null)
  const descriptionRef = useRef(null)
  const buttonsRef = useRef(null)
  const leftImageRef = useRef(null)
  const rightImageRef = useRef(null)
  const bottomImageRef = useRef(null)
  const { scrollY } = useScroll()

  useEffect(() => {
    if (!heroPanelRef.current || !headingRef.current) return

    const rect = heroPanelRef.current.getBoundingClientRect()
    const elementCenterY = rect.top + rect.height / 2
    const viewportCenterY = window.innerHeight / 2
    const distanceFromCenter = elementCenterY - viewportCenterY
    const normalizedDistance = distanceFromCenter / (window.innerHeight / 2)

    // 3D transform for main panel
    const rotationX = normalizedDistance * 8
    const rotationY = (scrollY * 0.005) % 360
    const translateZ = Math.abs(normalizedDistance) * 30

    heroPanelRef.current.style.transform = `
      perspective(1000px)
      rotateX(${rotationX}deg)
      rotateY(${rotationY}deg)
      translateZ(${translateZ}px)
    `

    // Parallax effect for heading
    const headingOffset = scrollY * 0.1
    headingRef.current.style.transform = `translateY(${headingOffset}px)`

    // Fade out images on scroll - smooth disappear
    const imageOpacity = Math.max(0, 1 - scrollY / 300)

    if (leftImageRef.current) {
      leftImageRef.current.style.opacity = imageOpacity
    }
    if (rightImageRef.current) {
      rightImageRef.current.style.opacity = imageOpacity
    }
    if (bottomImageRef.current) {
      bottomImageRef.current.style.opacity = imageOpacity
    }

    // Scroll reveal text
    const revealThreshold = 200
    const revealElements = [descriptionRef.current, buttonsRef.current]

    revealElements.forEach((el) => {
      if (el) {
        if (scrollY > revealThreshold) {
          el.classList.add('visible')
        } else {
          el.classList.remove('visible')
        }
      }
    })
  }, [scrollY])

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-32 px-6 overflow-hidden">
      {/* Floating Travel Images - Left */}
      <div ref={leftImageRef} className="absolute left-0 top-1/4 w-64 h-80 opacity-80 hidden lg:block transition-opacity duration-300 group z-20" style={{
        animation: 'slide-in-left 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards'
      }}>
        <div className="relative w-full h-full" style={{
          animation: 'float-3d-left 8s ease-in-out infinite',
          transformStyle: 'preserve-3d'
        }}>
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/40 to-blue-600/40 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <img
            src="https://images.hdqwalls.com/download/travel-hd-1920x1080.jpg"
            alt="Mountain Adventure"
            className="w-full h-full object-cover rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group-hover:brightness-110"
            style={{
              boxShadow: '0 20px 50px rgba(6, 182, 212, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
              transform: 'translateZ(20px)'
            }}
          />
          {/* Shine effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </div>

      {/* Floating Travel Images - Right */}
      <div ref={rightImageRef} className="absolute right-0 bottom-1/4 w-64 h-80 opacity-80 hidden lg:block transition-opacity duration-300 group z-20" style={{
        animation: 'slide-in-right 2.0s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards'
      }}>
        <div className="relative w-full h-full" style={{
          animation: 'float-3d-right 9s ease-in-out infinite',
          transformStyle: 'preserve-3d'
        }}>
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/40 to-purple-600/40 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <img
            src="http://www.pixelstalk.net/wp-content/uploads/2016/08/Free-Desktop-Travel-Backgrounds.jpg"
            alt="Beach Paradise"
            className="w-full h-full object-cover rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group-hover:brightness-110"
            style={{
              boxShadow: '0 20px 50px rgba(236, 72, 153, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
              transform: 'translateZ(20px)'
            }}
          />
          {/* Shine effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </div>

      {/* Floating Travel Images - Bottom Center */}
      <div ref={bottomImageRef} className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-80 h-64 opacity-70 hidden md:block transition-opacity duration-300 group z-20" style={{
        animation: 'slide-in-up 2.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards'
      }}>
        <div className="relative w-full h-full" style={{
          animation: 'float-3d-bottom 10s ease-in-out infinite',
          transformStyle: 'preserve-3d'
        }}>
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/40 to-orange-600/40 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <img
            src="https://static.toiimg.com/photo/msid-96457229,width-96,height-65.cms"
            alt="City Exploration"
            className="w-full h-full object-cover rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group-hover:brightness-110"
            style={{
              boxShadow: '0 20px 50px rgba(245, 158, 11, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
              transform: 'translateZ(20px)'
            }}
          />
          {/* Shine effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </div>

      {/* Glassmorphism Panel with 3D effect */}
      <div
        ref={heroPanelRef}
        className="backdrop-blur-sm bg-white/10 rounded-3xl p-12 max-w-4xl w-full border border-white/30 shadow-3xl relative z-10"
        style={{
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          transition: 'transform 0.1s ease-out'
        }}
      >
        {/* Main Heading with parallax */}
        <h1
          ref={headingRef}
          className="text-5xl md:text-6xl font-bold text-black-900 mb-6 text-center"
          style={{
            transformStyle: 'preserve-3d',
            willChange: 'transform'
          }}
        >
          Start Your  <span className="text-blue-700 bg-white rounded-md  font-mono font-bold">Journey</span> to Your Dream Destination Here.
        </h1>


        <div className='flex justify-center'>
          <button
            className=' start-trip-btn px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-lg font-bold rounded-lg transition-all duration-300 relative overflow-hidden group'
            style={{
              transformStyle: 'preserve-3d',
              boxShadow: '0 0 15px rgba(59, 130, 246, 0.5)'
            }}
            onClick={() => {
              const destinationsSection = document.getElementById('destinations-section')
              if (destinationsSection) {
                destinationsSection.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              const x = e.clientX - rect.left
              const y = e.clientY - rect.top
              const centerX = rect.width / 2
              const centerY = rect.height / 2
              const rotateX = ((y - centerY) / centerY) * 8
              const rotateY = ((centerX - x) / centerX) * 8

              e.currentTarget.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateZ(20px)
              `
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)'
            }}
          >
            Start Trip
          </button>
        </div>



        {/* Filter Buttons with 3D hover effect */}
        <div ref={buttonsRef} className="scroll-reveal flex flex-wrap justify-center gap-4">
        </div>
      </div>
    </section>
  )
}

export default Hero
