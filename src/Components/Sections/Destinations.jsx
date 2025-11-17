import { useRef, useEffect, useState } from 'react'
import { useScroll } from '../../hooks/useScroll'

const Destinations = () => {
  const sectionRef = useRef(null)
  const { scrollY } = useScroll()
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [selectedDestination, setSelectedDestination] = useState('')
  const [userName, setUserName] = useState('')
  const [userContact, setUserContact] = useState('')
  const [tripType, setTripType] = useState('given')
  const [customTrip, setCustomTrip] = useState('')
  const [bookingSubmitted, setBookingSubmitted] = useState(false)
  const [budget, setBudget] = useState(1000)

  const destinations = [
    {
      name: 'Kyoto, Japan',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&h=400&fit=crop',
      price: '$1,299',
      duration: '7 days',
      rating: 4.9,
      description: 'Experience traditional Japanese culture and modern luxury'
    },
    {
      name: 'Santorini, Greece',
      image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=600&h=400&fit=crop',
      price: '$1,599',
      duration: '5 days',
      rating: 4.8,
      description: 'Stunning sunsets and pristine white architecture'
    },
    {
      name: 'Bali, Indonesia',
      image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=600&h=400&fit=crop',
      price: '$899',
      duration: '6 days',
      rating: 4.7,
      description: 'Tropical paradise with beautiful beaches and temples'
    },
    {
      name: 'Paris, France',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=400&fit=crop',
      price: '$1,199',
      duration: '4 days',
      rating: 4.9,
      description: 'The city of lights, romance, and world-class cuisine'
    },
    {
      name: 'Dubai, UAE',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop',
      price: '$1,499',
      duration: '5 days',
      rating: 4.8,
      description: 'Luxury shopping, modern architecture, and desert adventures'
    },
    {
      name: 'Custom Location',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
      price: '$2,299',
      duration: '7 days',
      rating: 4.9,
      description: 'Choose your own destination and we will make it happen'
    }
  ]

  useEffect(() => {
    if (!sectionRef.current) return

    const cards = sectionRef.current.querySelectorAll('.destination-card')
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect()
      const elementCenterY = rect.top + rect.height / 2
      const viewportCenterY = window.innerHeight / 2
      const distanceFromCenter = elementCenterY - viewportCenterY
      const normalizedDistance = distanceFromCenter / (window.innerHeight / 2)

      const rotationY = normalizedDistance * 15
      const translateZ = Math.abs(normalizedDistance) * 50

      card.style.transform = `
        perspective(1200px)
        rotateY(${rotationY}deg)
        translateZ(${translateZ}px)
      `
      card.style.boxShadow = `0 25px 70px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1) inset`
    })
  }, [scrollY])

  // Close form on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && showBookingForm) {
        setShowBookingForm(false)
        setBookingSubmitted(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [showBookingForm])

  return (
    <section ref={sectionRef} id="destinations-section" className="py-20 px-6 relative">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Popular Destinations
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Discover amazing places around the world with our all-inclusive travel packages
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <div
              key={index}
              className="destination-card backdrop-blur-md bg-gray-900/40 rounded-2xl overflow-hidden border border-white/20 transition-all cursor-pointer group"
              style={{
                transformStyle: 'preserve-3d',
                willChange: 'transform',
                boxShadow: '0 25px 70px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1) inset'
              }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                const x = e.clientX - rect.left
                const y = e.clientY - rect.top
                const centerX = rect.width / 2
                const centerY = rect.height / 2
                const rotateY = ((centerX - x) / centerX) * 25
                const rotateX = ((y - centerY) / centerY) * 15

                e.currentTarget.style.transform = `
                  perspective(1200px)
                  rotateX(${rotateX}deg)
                  rotateY(${rotateY}deg)
                  translateZ(60px)
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
                const rotationY = normalizedDistance * 15
                const translateZ = Math.abs(normalizedDistance) * 50

                e.currentTarget.style.transform = `
                  perspective(1200px)
                  rotateY(${rotationY}deg)
                  translateZ(${translateZ}px)
                `
                e.currentTarget.style.boxShadow = '0 25px 70px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1) inset'
              }}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-sm font-medium">
                  ★ {destination.rating}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-bold">{destination.name}</h3>
                  <span className="text-lg font-semibold text-yellow-400">{destination.price}</span>
                </div>
                <p className="text-gray-300 mb-4">{destination.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-white/20">
                  <span className="text-sm text-gray-400">Duration: {destination.duration}</span>
                  <button
                    onClick={() => {
                      setSelectedDestination(destination.name)
                      setShowBookingForm(true)
                    }}
                    className="px-4 py-2 rounded-lg bg-purple-950 backdrop-blur-sm text-white hover:bg-white/30 transition-colors">
                    Book This
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => { setShowBookingForm(false); setBookingSubmitted(false) }}>
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 w-full max-w-md mx-4 shadow-2xl border border-white/50" onClick={(e) => e.stopPropagation()}>
            {!bookingSubmitted ? (
              <form onSubmit={(e) => {
                e.preventDefault()
                if (!userName || !userContact) {
                  alert('Please fill in all fields')
                  return
                }
                setBookingSubmitted(true)
              }}>
                {/* Header */}
                <div className="mb-6">
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">Book Your Trip</h3>
                  <p className="text-gray-600 text-sm">Fill in your details and choose your trip type</p>
                </div>

                {/* Destination Display */}
                <div className="mb-5 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100">
                  <label className="block text-xs font-semibold text-gray-600 mb-1">SELECTED DESTINATION</label>
                  <p className="text-lg font-bold text-gray-800">{selectedDestination || 'Choose a destination'}</p>
                </div>

                {/* User Name */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Contact */}
                <div className="mb-5">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Contact (Email or Phone) *</label>
                  <input
                    type="text"
                    value={userContact}
                    onChange={(e) => setUserContact(e.target.value)}
                    placeholder="you@example.com or +1234567890"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Budget */}
                <div className="mb-5">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Budget (USD) *</label>
                  <input
                    type="range"
                    min="500"
                    max="10000"
                    step="100"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="mt-2 text-center">
                    <span className="text-lg font-bold text-blue-600">${budget.toLocaleString()}</span>
                    <p className="text-xs text-gray-500 mt-1">
                      {budget <= 1000 ? 'Budget Friendly' : budget <= 3000 ? 'Moderate' : budget <= 6000 ? 'Premium' : 'Luxury'}
                    </p>
                  </div>
                </div>

                {/* Trip Type Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Trip Type</label>
                  <div className="space-y-2">
                    <label className="flex items-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all" style={{ borderColor: tripType === 'given' ? '#3B82F6' : '', backgroundColor: tripType === 'given' ? '#EFF6FF' : '' }}>
                      <input
                        type="radio"
                        name="tripType"
                        value="given"
                        checked={tripType === 'given'}
                        onChange={(e) => setTripType(e.target.value)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="ml-3 font-medium text-gray-700">Given Trip - {selectedDestination}</span>
                    </label>
                    <label className="flex items-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-purple-400 hover:bg-purple-50 transition-all" style={{ borderColor: tripType === 'custom' ? '#9333EA' : '', backgroundColor: tripType === 'custom' ? '#FAF5FF' : '' }}>
                      <input
                        type="radio"
                        name="tripType"
                        value="custom"
                        checked={tripType === 'custom'}
                        onChange={(e) => setTripType(e.target.value)}
                        className="w-4 h-4 text-purple-600"
                      />
                      <span className="ml-3 font-medium text-gray-700">Custom Trip</span>
                    </label>
                  </div>
                </div>

                {/* Custom Trip Input */}
                {tripType === 'custom' && (
                  <div className="mb-5">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Tell us your destination</label>
                    <input
                      type="text"
                      value={customTrip}
                      onChange={(e) => setCustomTrip(e.target.value)}
                      placeholder="e.g., Iceland, Maldives, Switzerland"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                  </div>
                )}

                {/* Buttons */}
                <div className="flex items-center justify-end gap-3 mt-7">
                  <button
                    type="button"
                    onClick={() => { setShowBookingForm(false); setBookingSubmitted(false) }}
                    className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-lg transition-all"
                  >
                    Book Now
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-4">
                {/* Thank You Message */}
                <div className="mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <span className="text-3xl">✓</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h3>
                  <p className="text-gray-600 mb-1">Your booking request has been received.</p>
                  <p className="text-gray-600 font-medium">Our team will connect with you soon.</p>
                </div>

                {/* Booking Summary */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-6 border border-blue-100">
                  <div className="text-left space-y-2 text-sm">
                    <div><span className="font-semibold text-gray-700">Name:</span> <span className="text-gray-600">{userName}</span></div>
                    <div><span className="font-semibold text-gray-700">Contact:</span> <span className="text-gray-600">{userContact}</span></div>
                    <div><span className="font-semibold text-gray-700">Trip:</span> <span className="text-gray-600">{tripType === 'given' ? selectedDestination : customTrip}</span></div>
                    <div><span className="font-semibold text-gray-700">Budget:</span> <span className="text-gray-600">${budget.toLocaleString()} USD</span></div>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => {
                    setShowBookingForm(false)
                    setBookingSubmitted(false)
                    setUserName('')
                    setUserContact('')
                    setTripType('given')
                    setCustomTrip('')
                    setSelectedDestination('')
                    setBudget(1000)
                  }}
                  className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}

export default Destinations

