import { useState, useRef, useEffect } from 'react'
import { useScroll } from '../../hooks/useScroll'

const SharePreferences = () => {
  const sectionRef = useRef(null)
  const { scrollY } = useScroll()
  const [selectedPreferences, setSelectedPreferences] = useState([])

  const preferences = [
    { id: 'beach', label: 'Beach', icon: '🏖️', color: 'from-blue-400 to-cyan-400' },
    { id: 'mountain', label: 'Mountain', icon: '⛰️', color: 'from-green-400 to-emerald-400' },
    { id: 'city', label: 'City', icon: '🏙️', color: 'from-purple-400 to-pink-400' },
    { id: 'adventure', label: 'Adventure', icon: '🧗', color: 'from-orange-400 to-red-400' },
    { id: 'culture', label: 'Culture', icon: '🏛️', color: 'from-amber-400 to-yellow-400' },
    { id: 'nature', label: 'Nature', icon: '🌲', color: 'from-green-500 to-teal-500' },
    { id: 'luxury', label: 'Luxury', icon: '✨', color: 'from-indigo-400 to-purple-400' },
    { id: 'budget', label: 'Budget', icon: '💰', color: 'from-yellow-400 to-orange-400' },
    { id: 'family', label: 'Family', icon: '👨‍👩‍👧‍👦', color: 'from-pink-400 to-rose-400' },
    { id: 'romantic', label: 'Romantic', icon: '💕', color: 'from-red-400 to-pink-400' },
    { id: 'solo', label: 'Solo Travel', icon: '🧳', color: 'from-blue-500 to-indigo-500' },
    { id: 'food', label: 'Food & Dining', icon: '🍽️', color: 'from-orange-500 to-amber-500' }
  ]

  const togglePreference = (id) => {
    setSelectedPreferences(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    )
  }

  useEffect(() => {
    if (!sectionRef.current) return

    const cards = sectionRef.current.querySelectorAll('.preference-card, .form-card')
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect()
      const elementCenterY = rect.top + rect.height / 2
      const viewportCenterY = window.innerHeight / 2
      const distanceFromCenter = elementCenterY - viewportCenterY
      const normalizedDistance = distanceFromCenter / (window.innerHeight / 2)

      const rotationX = normalizedDistance * 6
      const translateZ = Math.abs(normalizedDistance) * 30

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
            Share Your Preferences
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Tell us what you love, and we'll create the perfect travel experience just for you
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Preferences Selection */}
          <div className="lg:col-span-2">
            <div className="form-card backdrop-blur-md bg-white/20 rounded-2xl p-8 border border-white/30 mb-8"
              style={{
                transformStyle: 'preserve-3d',
                willChange: 'transform',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1) inset'
              }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">What interests you?</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {preferences.map((pref) => {
                  const isSelected = selectedPreferences.includes(pref.id)
                  return (
                    <button
                      key={pref.id}
                      onClick={() => togglePreference(pref.id)}
                      className={`preference-card p-6 rounded-xl border-2 transition-all text-left ${isSelected
                          ? 'border-white bg-gradient-to-br ' + pref.color + ' scale-105'
                          : 'border-white/30 bg-white/10 hover:bg-white/20'
                        }`}
                      style={{
                        transformStyle: 'preserve-3d',
                        willChange: 'transform'
                      }}
                      onMouseMove={(e) => {
                        if (!isSelected) {
                          const rect = e.currentTarget.getBoundingClientRect()
                          const x = e.clientX - rect.left
                          const y = e.clientY - rect.top
                          const centerX = rect.width / 2
                          const centerY = rect.height / 2
                          const rotateX = ((y - centerY) / centerY) * 10
                          const rotateY = ((centerX - x) / centerX) * 10

                          e.currentTarget.style.transform = `
                            perspective(1000px)
                            rotateX(${rotateX}deg)
                            rotateY(${rotateY}deg)
                            translateZ(15px)
                          `
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)'
                        }
                      }}
                    >
                      <div className="text-4xl mb-2">{pref.icon}</div>
                      <div className={`font-semibold ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                        {pref.label}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Side Info Card */}
          <div className="lg:col-span-1">
            <div className="form-card backdrop-blur-md bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl p-8 border border-white/30 sticky top-24"
              style={{
                transformStyle: 'preserve-3d',
                willChange: 'transform',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1) inset'
              }}
            >
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Share Preferences?</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 text-xl">✓</span>
                  <span>Personalized travel recommendations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 text-xl">✓</span>
                  <span>Best deals matching your interests</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 text-xl">✓</span>
                  <span>Save time searching</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 text-xl">✓</span>
                  <span>Expert-curated itineraries</span>
                </li>
              </ul>
              {selectedPreferences.length > 0 && (
                <div className="mt-6 pt-6 border-t border-white/20">
                  <p className="text-sm text-gray-600 mb-2">Selected ({selectedPreferences.length})</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedPreferences.map(id => {
                      const pref = preferences.find(p => p.id === id)
                      return (
                        <span key={id} className="px-3 py-1 rounded-full bg-white/30 text-sm text-gray-900">
                          {pref.icon} {pref.label}
                        </span>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SharePreferences

