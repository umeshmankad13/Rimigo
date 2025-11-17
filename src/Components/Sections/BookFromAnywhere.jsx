import { useRef, useEffect } from 'react'
import { useScroll } from '../../hooks/useScroll'

const BookFromAnywhere = () => {
  const sectionRef = useRef(null)
  const { scrollY } = useScroll()

  const vendors = [
    {
      name: 'Booking.com',
      logo: 'https://logos-world.net/wp-content/uploads/2020/11/Booking.com-Logo.png',
      description: 'World\'s leading online travel agency',
      features: ['Hotels', 'Flights', 'Car Rentals'],
      color: 'from-blue-500/20 to-blue-600/20',
      rating: 4.8
    },
    {
      name: 'Airbnb',
      logo: 'https://logos-world.net/wp-content/uploads/2020/11/Airbnb-Logo.png',
      description: 'Unique stays and experiences',
      features: ['Vacation Rentals', 'Experiences', 'Adventures'],
      color: 'from-pink-500/20 to-red-500/20',
      rating: 4.7
    },
    {
      name: 'Expedia',
      logo: 'https://logos-world.net/wp-content/uploads/2020/11/Expedia-Logo.png',
      description: 'Complete travel booking platform',
      features: ['Hotels', 'Flights', 'Packages'],
      color: 'from-orange-500/20 to-orange-600/20',
      rating: 4.6
    },
    {
      name: 'Tripadvisor',
      logo: 'https://logos-world.net/wp-content/uploads/2020/11/Tripadvisor-Logo.png',
      description: 'Reviews and bookings in one place',
      features: ['Hotels', 'Restaurants', 'Activities'],
      color: 'from-green-500/20 to-green-600/20',
      rating: 4.7
    },
    {
      name: 'Agoda',
      logo: 'https://logos-world.net/wp-content/uploads/2020/11/Agoda-Logo.png',
      description: 'Best hotel deals worldwide',
      features: ['Hotels', 'Apartments', 'Resorts'],
      color: 'from-red-500/20 to-pink-500/20',
      rating: 4.5
    },
    {
      name: 'Kayak',
      logo: 'https://logos-world.net/wp-content/uploads/2020/11/Kayak-Logo.png',
      description: 'Compare and save on travel',
      features: ['Flights', 'Hotels', 'Car Rentals'],
      color: 'from-purple-500/20 to-indigo-500/20',
      rating: 4.6
    },
    {
      name: 'Hotels.com',
      logo: 'https://logos-world.net/wp-content/uploads/2020/11/Hotels.com-Logo.png',
      description: 'Collect nights, get rewards',
      features: ['Hotels', 'Rewards', 'Deals'],
      color: 'from-yellow-500/20 to-orange-500/20',
      rating: 4.5
    },
    {
      name: 'Skyscanner',
      logo: 'https://logos-world.net/wp-content/uploads/2020/11/Skyscanner-Logo.png',
      description: 'Compare flights from all airlines',
      features: ['Flights', 'Hotels', 'Car Hire'],
      color: 'from-cyan-500/20 to-blue-500/20',
      rating: 4.7
    }
  ]

  useEffect(() => {
    if (!sectionRef.current) return

    const cards = sectionRef.current.querySelectorAll('.vendor-card')
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect()
      const elementCenterY = rect.top + rect.height / 2
      const viewportCenterY = window.innerHeight / 2
      const distanceFromCenter = elementCenterY - viewportCenterY
      const normalizedDistance = distanceFromCenter / (window.innerHeight / 2)

      const rotationX = normalizedDistance * 8
      const translateZ = Math.abs(normalizedDistance) * 35

      card.style.transform = `
        perspective(1200px)
        rotateX(${rotationX}deg)
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
            Book From Anywhere
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            We partner with the world's leading booking platforms to give you access to the best deals and options
          </p>
        </div>

        {/* Vendors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {vendors.map((vendor, index) => (
            <div
              key={index}
              className="vendor-card backdrop-blur-md bg-white/20 rounded-2xl p-6 border border-white/30 transition-all group cursor-pointer"
              style={{
                transformStyle: 'preserve-3d',
                willChange: 'transform'
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
                const rotationX = normalizedDistance * 8
                const translateZ = Math.abs(normalizedDistance) * 35

                e.currentTarget.style.transform = `
                  perspective(1200px)
                  rotateX(${rotationX}deg)
                  translateZ(${translateZ}px)
                `
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1) inset'
              }}
            >
              {/* Logo Area */}
              <div className={`h-24 rounded-xl bg-gradient-to-br ${vendor.color} flex items-center justify-center mb-4 p-4 backdrop-blur-sm border border-white/20 group-hover:scale-105 transition-transform`}>
                <div className="text-2xl font-bold text-gray-900">{vendor.name}</div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-sm ${i < Math.floor(vendor.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm text-gray-600 font-medium">{vendor.rating}</span>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-700 mb-4 line-clamp-2">{vendor.description}</p>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-4">
                {vendor.features.map((feature, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-xs rounded-full bg-white/30 backdrop-blur-sm text-gray-700 border border-white/20"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <button className="w-full py-2 rounded-lg bg-blue-800/80 backdrop-blur-sm text-gray-900 hover:bg-blue-700/50 transition-colors text-sm font-medium">
                Book Now
              </button>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="mt-16 backdrop-blur-md bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-8 border border-white/30">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">🔍</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Compare Prices</h3>
              <p className="text-gray-700">See all options in one place and choose the best deal</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🔒</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Secure Booking</h3>
              <p className="text-gray-700">All transactions are secure and protected</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">💳</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">One Payment</h3>
              <p className="text-gray-700">Pay for everything in a single transaction</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BookFromAnywhere

