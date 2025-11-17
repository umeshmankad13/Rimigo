import { useRef, useEffect } from 'react'
import { useScroll } from '../../hooks/useScroll'

const Testimonials = () => {
  const sectionRef = useRef(null)
  const { scrollY } = useScroll()

  const testimonials = [
    {
      name: 'Sarah Johnson',
      location: 'New York, USA',
      image: 'https://i.pravatar.cc/150?img=1',
      rating: 5,
      text: 'Rimigo made planning our honeymoon so easy! We booked everything in one place - flights, hotel, activities, and even restaurant reservations. Highly recommend!',
      trip: 'Bali, Indonesia'
    },
    {
      name: 'Michael Chen',
      location: 'London, UK',
      image: 'https://i.pravatar.cc/150?img=12',
      rating: 5,
      text: 'The all-in-one booking feature is a game changer. No more juggling multiple websites and confirmations. Everything was perfectly organized.',
      trip: 'Tokyo, Japan'
    },
    {
      name: 'Emma Williams',
      location: 'Sydney, Australia',
      image: 'https://i.pravatar.cc/150?img=5',
      rating: 5,
      text: 'I love how transparent the pricing is. I could see exactly what I was paying for each component, and the total was very competitive.',
      trip: 'Santorini, Greece'
    }
  ]

  useEffect(() => {
    if (!sectionRef.current) return

    const cards = sectionRef.current.querySelectorAll('.testimonial-card')
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect()
      const elementCenterY = rect.top + rect.height / 2
      const viewportCenterY = window.innerHeight / 2
      const distanceFromCenter = elementCenterY - viewportCenterY
      const normalizedDistance = distanceFromCenter / (window.innerHeight / 2)

      const rotationY = normalizedDistance * 15
      const translateZ = Math.abs(normalizedDistance) * 40

      card.style.transform = `
        perspective(1200px)
        rotateY(${rotationY}deg)
        translateZ(${translateZ}px)
      `
      card.style.boxShadow = `0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1) inset`
    })
  }, [scrollY])

  return (
    <section ref={sectionRef} className="py-20 px-6 relative">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our Travelers Say
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Don't just take our word for it - hear from travelers who've experienced the Rimigo difference
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card backdrop-blur-md bg-white/20 rounded-2xl p-8 border border-white/30 transition-all"
              style={{
                transformStyle: 'preserve-3d',
                willChange: 'transform',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1) inset'
              }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                const x = e.clientX - rect.left
                const y = e.clientY - rect.top
                const centerX = rect.width / 2
                const centerY = rect.height / 2
                const rotateY = ((centerX - x) / centerX) * 20
                const rotateX = ((y - centerY) / centerY) * 15

                e.currentTarget.style.transform = `
                  perspective(1200px)
                  rotateX(${rotateX}deg)
                  rotateY(${rotateY}deg)
                  translateZ(50px)
                `
                e.currentTarget.style.boxShadow = `
                  0 35px 90px rgba(0, 0, 0, 0.4),
                  0 0 0 1px rgba(255, 255, 255, 0.2) inset,
                  ${(x - centerX) / 12}px ${(y - centerY) / 12}px 45px rgba(0, 0, 0, 0.3)
                `
              }}
              onMouseLeave={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                const elementCenterY = rect.top + rect.height / 2
                const viewportCenterY = window.innerHeight / 2
                const distanceFromCenter = elementCenterY - viewportCenterY
                const normalizedDistance = distanceFromCenter / (window.innerHeight / 2)
                const rotationY = normalizedDistance * 15
                const translateZ = Math.abs(normalizedDistance) * 40

                e.currentTarget.style.transform = `
                  perspective(1200px)
                  rotateY(${rotationY}deg)
                  translateZ(${translateZ}px)
                `
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1) inset'
              }}
            >
              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "{testimonial.text}"
              </p>

              {/* Trip Info */}
              <div className="mb-6 pb-6 border-b border-white/20">
                <p className="text-sm text-gray-600 font-medium">Trip to</p>
                <p className="text-lg font-bold text-gray-900">{testimonial.trip}</p>
              </div>

              {/* User Info */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white/30"
                />
                <div>
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials

