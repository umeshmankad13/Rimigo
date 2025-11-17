import Navbar from './Components/Layout/Navbar'
import Hero from './Components/Sections/Hero'
import Features from './Components/Sections/Features'
import Destinations from './Components/Sections/Destinations'
import HowItWorks from './Components/Sections/HowItWorks'
import SharePreferences from './Components/Sections/SharePreferences'
import TravelAnywhere from './Components/Sections/TravelAnywhere'
import BookFromAnywhere from './Components/Sections/BookFromAnywhere'
import Testimonials from './Components/Sections/Testimonials'
import Floating3DElement from './Components/UI/Floating3DElement'
import Footer from './Components/Layout/Footer'
import './App.css'

function App() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Floating 3D Decorative Elements */}
      <Floating3DElement
        speed={0.3}
        rotationSpeed={0.2}
        initialX={10}
        initialY={100}
        className="top-20 left-10 z-5"
      >
        <div className="w-20 h-20 backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 shadow-xl"></div>
      </Floating3DElement>

      <Floating3DElement
        speed={0.4}
        rotationSpeed={-0.25}
        initialX={-80}
        initialY={200}
        className="top-40 right-10 z-5"
      >
        <div className="w-16 h-16 backdrop-blur-md bg-white/10 rounded-full border border-white/20 shadow-xl"></div>
      </Floating3DElement>

      <Floating3DElement
        speed={0.35}
        rotationSpeed={0.15}
        initialX={50}
        initialY={400}
        className="top-60 left-20 z-5"
      >
        <div className="w-12 h-12 backdrop-blur-md bg-white/20 rounded-lg border border-white/20 shadow-xl rotate-45"></div>
      </Floating3DElement>

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Features />
        <Destinations />
        <HowItWorks />
        <SharePreferences />
        <TravelAnywhere />
        <BookFromAnywhere />
        <Testimonials />
        <Footer />
      </div>
    </div>
  )
}

export default App
