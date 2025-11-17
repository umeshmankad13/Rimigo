import { useState } from 'react'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/30 border-b border-white/20">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-semibold text-gray-900">
         Rimigo
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#homepage" className="text-gray-900 hover:text-gray-700 transition-colors">Homepage</a>
          <a href="#vacation" className="text-gray-900 hover:text-gray-700 transition-colors">Destinations</a>
      
         
        </div>

        {/* User Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/50 backdrop-blur-sm text-gray-900 hover:bg-white/70 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            
          </button>
          <button
            className='start-trip-btn px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-lg font-bold rounded-lg transition-all duration-300 relative overflow-hidden group'
            style={{
              transformStyle: 'preserve-3d',
              boxShadow: '0 0 15px rgba(59, 130, 246, 0.5)'
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
          Register  
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-900 focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden backdrop-blur-md bg-white/30 border-t border-white/20">
          <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
            <a href="#homepage" className="text-gray-900 hover:text-gray-700 transition-colors">Homepage</a>
            <a href="#vacation" className="text-gray-900 hover:text-gray-700 transition-colors">Vacation</a>

  
            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/50 backdrop-blur-sm text-gray-900">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              
            </button>
            <button className="px-6 py-2   rounded-lg bg-white text-gray-900 font-medium">
              Register
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar

