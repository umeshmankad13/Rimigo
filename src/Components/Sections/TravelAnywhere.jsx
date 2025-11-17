import { useRef, useEffect } from 'react'
import { useScroll } from '../../hooks/useScroll'


const TravelAnywhere = () => {
  const sectionRef = useRef(null)
  const { scrollY } = useScroll()

  const continents = [
    {
      name: 'Asia',
      image: 'https://c8.alamy.com/comp/2WGDH37/mount-everest-lhotse-and-nuptse-from-nepal-side-as-seen-from-pumori-base-camp-with-three-hikers-vector-illustration-mt-everest-8848-m-khumbu-valley-2WGDH37.jpg',
      countries: 48,
      popular: ['Japan', 'Thailand', 'Bali', 'Singapore'],
      color: 'from-red-500/30 to-orange-500/30'
    },
    {
      name: 'Europe',
      image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&h=600&fit=crop',
      countries: 44,
      popular: ['France', 'Italy', 'Spain', 'Greece'],
      color: 'from-blue-500/30 to-indigo-500/30'
    },
    {
      name: 'Americas',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop',
      countries: 35,
      popular: ['USA', 'Canada', 'Brazil', 'Mexico'],
      color: 'from-green-500/30 to-emerald-500/30'
    },
    {
      name: 'Africa',
      image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&h=600&fit=crop',
      countries: 54,
      popular: ['Morocco', 'Kenya', 'South Africa', 'Egypt'],
      color: 'from-amber-500/30 to-yellow-500/30'
    },
    {
      name: 'Oceania',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
      countries: 14,
      popular: ['Australia', 'New Zealand', 'Fiji', 'Tahiti'],
      color: 'from-cyan-500/30 to-blue-500/30'
    }
  ]

  useEffect(() => {
    if (!sectionRef.current) return

    const cards = sectionRef.current.querySelectorAll('.continent-card, .map-card')
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect()
      const elementCenterY = rect.top + rect.height / 2
      const viewportCenterY = window.innerHeight / 2
      const distanceFromCenter = elementCenterY - viewportCenterY
      const normalizedDistance = distanceFromCenter / (window.innerHeight / 2)

      const rotationY = normalizedDistance * 10
      const translateZ = Math.abs(normalizedDistance) * 40

      card.style.transform = `
        perspective(1200px)
        rotateY(${rotationY}deg)
        translateZ(${translateZ}px)
      `
      card.style.boxShadow = `0 25px 70px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1) inset`
    })
  }, [scrollY])

  return (
    <section ref={sectionRef} className="py-20 px-6 relative">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            We Travel You Anywhere in the World
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Explore every corner of the globe. From bustling cities to remote islands, we make your travel dreams come true.
          </p>
        </div>

        {/* World Map Visual with 3D Effect */}
        <div className="mb-16">
          <div className="map-card backdrop-blur-md bg-gradient-to-br from-blue-600/30 via-purple-600/20 to-cyan-600/30 rounded-3xl p-12 border border-white/40 overflow-hidden relative"
            style={{
              transformStyle: 'preserve-3d',
              willChange: 'transform',
              boxShadow: '0 30px 80px rgba(59, 130, 246, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2) inset'
            }}
          >
            <div className="relative h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
              {/* Animated Background */}
              <div className="absolute inset-0 opacity-20">
                <svg width="100%" height="100%" className="animate-pulse">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" opacity="0.2"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              {/* World Map Image */}
              <img
                src="https://cdn1.vectorstock.com/i/1000x1000/27/90/map-of-the-world-and-travel-icons-vector-12632790.jpg"
                alt="World Map"
                className="w-full h-full object-cover opacity-60"
              />

              {/* Animated Travel Lines */}
              <svg className="absolute inset-0 w-full h-full" style={{ mixBlendMode: 'screen' }}>
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
                    <stop offset="50%" stopColor="#06b6d4" stopOpacity="1" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
                    <stop offset="50%" stopColor="#8b5cf6" stopOpacity="1" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="lineGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ec4899" stopOpacity="0" />
                    <stop offset="50%" stopColor="#ec4899" stopOpacity="1" />
                    <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Travel paths */}
                <polyline points="10,30 40,20 70,40 90,35" stroke="url(#lineGradient)" strokeWidth="3" fill="none" className="travel-line-1" />
                <polyline points="20,70 50,50 80,75 95,65" stroke="url(#lineGradient2)" strokeWidth="3" fill="none" className="travel-line-2" />
                <polyline points="5,50 30,45 60,55 85,50" stroke="url(#lineGradient3)" strokeWidth="3" fill="none" className="travel-line-3" />
                
                {/* Animated dots */}
                <circle cx="10" cy="30" r="4" fill="#06b6d4" className="travel-dot-1" />
                <circle cx="20" cy="70" r="4" fill="#8b5cf6" className="travel-dot-2" />
                <circle cx="5" cy="50" r="4" fill="#ec4899" className="travel-dot-3" />
              </svg>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

              {/* Content */}
              <div className="absolute bottom-8 left-8 right-8 z-10">
                <h3 className="text-3xl font-bold text-white mb-2">🌍 242+ Vacations</h3>
                <p className="text-white/90 text-lg">Watch your journey unfold across the globe</p>
              </div>
            </div>
          </div>
        </div>

        {/* Continents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {continents.map((continent, index) => (
            <div
              key={index}
              className="continent-card backdrop-blur-md bg-pink-950 rounded-2xl overflow-hidden border border-white/20 group cursor-pointer"
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
                const rotateY = ((centerX - x) / centerX) * 20
                const rotateX = ((y - centerY) / centerY) * 15

                e.currentTarget.style.transform = `
                  perspective(1200px)
                  rotateX(${rotateX}deg)
                  rotateY(${rotateY}deg)
                  translateZ(50px)
                `
                e.currentTarget.style.boxShadow = `
                  0 40px 100px rgba(0, 0, 0, 0.5),
                  0 0 0 1px rgba(255, 255, 255, 0.2) inset,
                  ${(x - centerX) / 15}px ${(y - centerY) / 15}px 50px rgba(0, 0, 0, 0.4)
                `
              }}
              onMouseLeave={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                const elementCenterY = rect.top + rect.height / 2
                const viewportCenterY = window.innerHeight / 2
                const distanceFromCenter = elementCenterY - viewportCenterY
                const normalizedDistance = distanceFromCenter / (window.innerHeight / 2)
                const rotationY = normalizedDistance * 10
                const translateZ = Math.abs(normalizedDistance) * 40

                e.currentTarget.style.transform = `
                  perspective(1200px)
                  rotateY(${rotationY}deg)
                  translateZ(${translateZ}px)
                `
                e.currentTarget.style.boxShadow = '0 25px 70px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1) inset'
              }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={continent.image}
                  alt={continent.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${continent.color}`}></div>
                <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-black/60 backdrop-blur-sm text-white text-sm font-medium">
                  {continent.countries} Countries
                </div>
              </div>

              {/* Content */}
              <div className="p-6 text-white">
                <h3 className="text-2xl font-bold mb-4">{continent.name}</h3>
                <div className="mb-4">
                  <p className="text-sm text-gray-300 mb-2">Popular Destinations:</p>
                  <div className="flex flex-wrap gap-2">
                    {continent.popular.map((country, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-sm border border-white/20"
                      >
                        {country}
                      </span>
                    ))}
                  </div>
                </div>
                <button className="w-full py-3 rounded-lg bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors font-medium">
                  Explore {continent.name}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { number: '242+', label: 'Vacations', icon: '🌴' },
            { number: '4.9+', label: 'Rating', icon: '⭐' },
            { number: '78', label: 'Countries', icon: '🌍' },
            { number: '8354', label: 'Average Savings per trip', icon: '💸' }
          ].map((stat, index) => (
            <div
              key={index}
              className="backdrop-blur-md bg-white/20 rounded-xl p-6 border border-white/30 text-center"
              style={{
                transformStyle: 'preserve-3d',
                boxShadow: '0 15px 50px rgba(0, 0, 0, 0.3)'
              }}
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
              <div className="text-gray-700">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TravelAnywhere

