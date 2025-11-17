import { useRef, useEffect, useState } from 'react'
import { useScroll } from '../../hooks/useScroll'
import './HowItWorks.css'

const HowItWorks = () => {
  const sectionRef = useRef(null)
  const { scrollY } = useScroll()
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const steps = [
    {
      number: '01',
      title: 'Choose Your Destination',
      description: 'Browse through our curated list of destinations and select your dream location.',
      icon: '🌍',
      color: 'from-emerald-500 to-cyan-500'
    },
    {
      number: '02',
      title: 'Customize Your Trip',
      description: 'Select flights, hotels, activities, and dining options that match your preferences.',
      icon: '✏️',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      number: '03',
      title: 'Review & Book',
      description: 'Review your complete itinerary and make a single payment for all expenses.',
      icon: '📋',
      color: 'from-purple-500 to-pink-500'
    },
    {
      number: '04',
      title: 'Enjoy Your Journey',
      description: 'Receive all confirmations and travel documents. Just pack and go!',
      icon: '✈️',
      color: 'from-pink-500 to-rose-500'
    }
  ]

  useEffect(() => {
    if (!sectionRef.current) return

    const items = sectionRef.current.querySelectorAll('.step-item')
    items.forEach((item) => {
      const rect = item.getBoundingClientRect()
      const elementCenterY = rect.top + rect.height / 2
      const viewportCenterY = window.innerHeight / 2
      const distanceFromCenter = elementCenterY - viewportCenterY
      const normalizedDistance = distanceFromCenter / (window.innerHeight / 2)

      const rotationX = normalizedDistance * 10
      const translateZ = Math.abs(normalizedDistance) * 35

      item.style.transform = `
        perspective(1200px)
        rotateX(${rotationX}deg)
        translateZ(${translateZ}px)
      `
      item.style.boxShadow = `0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1) inset`
    })
  }, [scrollY])

  return (
    <section ref={sectionRef} className="py-20 px-6 relative">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Booking your complete travel experience is simple and straightforward
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group step-item relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Gradient Background Blur */}
              <div className={`absolute inset-0 bg-gradient-to-br ${step.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500`}></div>

              {/* Main Card */}
              <div
                className={`step-item relative backdrop-blur-md bg-gradient-to-br from-white/40 to-white/10 rounded-2xl p-8 border border-white/60 text-center transition-all duration-300 hover:border-white/90 hover:shadow-2xl`}
                style={{
                  transformStyle: 'preserve-3d',
                  willChange: 'transform',
                  background: `linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.1)), linear-gradient(135deg, var(--step-color-light), var(--step-color-dark))`,
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.15) inset'
                }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  const x = e.clientX - rect.left
                  const y = e.clientY - rect.top
                  const centerX = rect.width / 2
                  const centerY = rect.height / 2
                  const rotateX = ((y - centerY) / centerY) * 15
                  const rotateY = ((centerX - x) / centerX) * 15

                  e.currentTarget.style.transform = `
                    perspective(1200px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateZ(40px)
                  `
                  e.currentTarget.style.boxShadow = `
                    0 30px 80px rgba(0, 0, 0, 0.4),
                    0 0 0 1px rgba(255, 255, 255, 0.2) inset,
                    ${(x - centerX) / 10}px ${(y - centerY) / 10}px 40px rgba(0, 0, 0, 0.3)
                  `
                }}
                onMouseLeave={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  const elementCenterY = rect.top + rect.height / 2
                  const viewportCenterY = window.innerHeight / 2
                  const distanceFromCenter = elementCenterY - viewportCenterY
                  const normalizedDistance = distanceFromCenter / (window.innerHeight / 2)
                  const rotationX = normalizedDistance * 10
                  const translateZ = Math.abs(normalizedDistance) * 35

                  e.currentTarget.style.transform = `
                    perspective(1200px)
                    rotateX(${rotationX}deg)
                    translateZ(${translateZ}px)
                  `
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1) inset'
                }}
              >
                {/* Animated Step Number */}
                <div className={`absolute -top-6 -left-6 w-20 h-20 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold text-2xl shadow-2xl group-hover:shadow-lg group-hover:scale-110 transition-all duration-300 animate-pulse-glow`}>
                  <span className="drop-shadow-lg">{step.number}</span>
                </div>

                {/* Icon with Animation */}
                <div className="text-7xl mb-8 mt-6 group-hover:scale-125 transition-transform duration-300 inline-block animate-bounce-slow">
                  {step.icon}
                </div>

                {/* Content with Stagger Effect */}
                <h3 className={`text-2xl font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent mb-4 transition-all duration-300`}>
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {step.description}
                </p>

                {/* Bottom Accent Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-2xl"></div>

                {/* Connector Line (except last) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform -translate-y-1/2 z-0 group-hover:w-12 group-hover:h-1 transition-all duration-300"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks

