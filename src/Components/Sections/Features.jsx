import { useRef, useEffect, useState } from 'react'
import { useScroll } from '../../hooks/useScroll'
import './Features.css'

const Features = () => {
  const sectionRef = useRef(null)
  const carouselRef = useRef(null)
  const { scrollY } = useScroll()
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  const features = [
    {
      icon: '✈️',
      title: 'Flight Booking',
      description: 'Book flights to any destination worldwide with the best prices and flexible options. Get instant confirmations and manage your bookings easily.',
      color: 'from-blue-500/20 to-cyan-500/20',
      height: 'h-64'
    },
    {
      icon: '🏨',
      title: 'Hotel Reservations',
      description: 'Find and book hotels, resorts, and accommodations that suit your budget and preferences. Compare prices and read reviews from verified travelers.',
      color: 'from-purple-500/20 to-pink-500/20',
      height: 'h-72'
    },
    {
      icon: '🧠',
      title: 'Expert Knowledge',
      description: 'Our travel experts have years of experience and insider knowledge. Get personalized recommendations and travel tips tailored to your preferences.',
      color: 'from-green-500/20 to-emerald-500/20',
      height: 'h-64'
    },
    {
      icon: '💰',
      title: 'Maximise Saving',
      description: 'Save money on every trip with our exclusive deals, discounts, and price comparison tools. We negotiate the best rates so you don\'t have to.',
      color: 'from-orange-500/20 to-red-500/20',
      height: 'h-72'
    },
    {
      icon: '🕐',
      title: 'Always Available',
      description: '24/7 customer support whenever you need it. Our team is always ready to help with bookings, changes, or any travel-related questions.',
      color: 'from-indigo-500/20 to-blue-500/20',
      height: 'h-64'
    }
  ]

  useEffect(() => {
    if (!sectionRef.current) return

    const cards = sectionRef.current.querySelectorAll('.feature-card')
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect()
      const elementCenterY = rect.top + rect.height / 2
      const viewportCenterY = window.innerHeight / 2
      const distanceFromCenter = elementCenterY - viewportCenterY
      const normalizedDistance = distanceFromCenter / (window.innerHeight / 2)

      const rotationX = normalizedDistance * 8
      const translateZ = Math.abs(normalizedDistance) * 40

      card.style.transform = `
        perspective(1200px)
        rotateX(${rotationX}deg)
        translateZ(${translateZ}px)
      `
      card.style.boxShadow = `0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1) inset`
    })
  }, [scrollY])

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlay) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % features.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlay, features.length])

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + features.length) % features.length)
    setIsAutoPlay(false)
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % features.length)
    setIsAutoPlay(false)
  }

  return (
    <section ref={sectionRef} className="min-h-screen py-20 px-6 relative flex items-center justify-center bg-gradient-to-b from-white via-blue-50 to-white">
      <div className="container mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>Features & Benefits</span>
          </h2>

          <h4 className='text-gray-600 text-2xl font-semibold mb-4'>May you have a wonderful time and come back with amazing memories</h4>

          <p className='text-gray-500 text-lg max-w-2xl mx-auto'>Experience the best travel booking platform with premium features designed for your comfort</p>
        </div>

        {/* 3D Carousel */}
        <div className="flex flex-col items-center justify-center gap-8">
          {/* Carousel Container */}
          <div ref={carouselRef} className="relative w-full h-96 perspective" style={{ perspective: '1200px' }}>
            <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
              {features.map((feature, index) => {
                const angle = (index - activeIndex) * (360 / features.length)
                const isActive = index === activeIndex
                const distance = 300

                return (
                  <div
                    key={index}
                    className={`feature-card absolute w-full max-w-md h-full left-1/2 top-1/2 transition-all duration-500 ease-out ${isActive ? 'z-50 opacity-100' : 'z-0 opacity-60 pointer-events-none'
                      }`}
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: `
                        translateX(-50%)
                        translateY(-50%)
                        rotateY(${angle}deg)
                        translateZ(${distance}px)
                        ${isActive ? 'scale(1)' : 'scale(0.7)'}
                      `,
                      transformOrigin: 'center'
                    }}
                    onMouseEnter={() => setIsAutoPlay(false)}
                    onMouseLeave={() => setIsAutoPlay(true)}
                  >
                    <div className="backdrop-blur-md bg-gradient-to-br from-white/70 to-white/40 rounded-3xl p-8 border border-white/70 h-full flex flex-col shadow-2xl hover:shadow-3xl transition-all group overflow-hidden">
                      {/* Animated Background Gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl`}></div>

                      {/* Content */}
                      <div className="relative z-10 flex flex-col h-full">
                        <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-5xl mb-6 backdrop-blur-sm border border-white/40 group-hover:scale-125 transition-transform duration-300`}>
                          {feature.icon}
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">{feature.title}</h3>
                        <p className="text-gray-600 leading-relaxed flex-grow group-hover:text-gray-700 transition-colors text-lg">{feature.description}</p>

                        {/* Card Number */}
                        <div className="mt-4 text-sm font-semibold text-gray-400 group-hover:text-blue-400 transition-colors">
                          {String(index + 1).padStart(2, '0')} / {String(features.length).padStart(2, '0')}
                        </div>
                      </div>

                      {/* Shine Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl carousel-shine"></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-8 mt-8">
            <button
              onClick={handlePrev}
              className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold text-xl shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center group"
            >
              ❮
            </button>

            {/* Dot Indicators */}
            <div className="flex gap-3">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveIndex(index)
                    setIsAutoPlay(false)
                  }}
                  className={`transition-all duration-300 rounded-full ${index === activeIndex
                      ? 'w-8 h-3 bg-blue-600 shadow-lg'
                      : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                    }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold text-xl shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center group"
            >
              ❯
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features

