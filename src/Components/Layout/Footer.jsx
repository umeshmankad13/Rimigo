import { useRef, useEffect } from 'react'
import { useScroll } from '../../hooks/useScroll'

const Footer = () => {
  const footerRef = useRef(null)
  const { scrollY } = useScroll()

  const partners = [
    'Booking.com',
    'airbnb',
    'Expedia',
    'Tripadvisor',
    'Outdoorsy'
  ]

  useEffect(() => {
    if (!footerRef.current) return

    const rect = footerRef.current.getBoundingClientRect()
    const elementCenterY = rect.top + rect.height / 2
    const viewportCenterY = window.innerHeight / 2
    const distanceFromCenter = elementCenterY - viewportCenterY
    const normalizedDistance = distanceFromCenter / (window.innerHeight / 2)

    // 3D tilt effect
    const rotationX = normalizedDistance * 5
    footerRef.current.style.transform = `
      perspective(1000px)
      rotateX(${rotationX}deg)
    `
  }, [scrollY])

  return (
    <footer
      ref={footerRef}
      className="py-12 px-6 backdrop-blur-md  border-t border-white/20"
      style={{
        transformStyle: 'preserve-3d',
        willChange: 'transform'
      }}
    >
      <div className="container mx-auto">
        {/* Partner Logos / Names */}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 mb-8">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="text-gray/80 text-lg font-medium hover:text-white transition-all cursor-pointer"
              style={{
                transformStyle: 'preserve-3d',
                transition: 'transform 0.3s ease'
              }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                const x = e.clientX - rect.left
                const centerX = rect.width / 2
                const rotateY = ((centerX - x) / centerX) * 15
                e.currentTarget.style.transform = `perspective(1000px) rotateY(${rotateY}deg) translateZ(10px)`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'perspective(1000px) rotateY(0) translateZ(0)'
              }}
            >
              {partner}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white/90">
          {/* Links */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-900">
              <li className="hover:text-black-100 cursor-pointer">About Us</li>
              <li className="hover:text-black-100 cursor-pointer">Careers</li>
              <li className="hover:text-black-100 cursor-pointer">Terms and Conditions</li>
              <li className="hover:text-black-100 cursor-pointer">Refunds and Cancellations Policy</li>
              <li className="hover:text-black-100 cursor-pointer">Privacy Policy</li>
              <li className="hover:text-black-100 cursor-pointer">Testimonials</li>
              <li className="hover:text-black-100 cursor-pointer">Blogs</li>
              <li className="hover:text-black-100 cursor-pointer">Contact</li>
            </ul>
          </div>

          {/* Contact / Registration Details */}
          <div>
            <h4 className="text-gray-900   font-semibold mb-4">Contact</h4>
            <div className="text-gray-900 space-y-2">
              <div>Viareel Travel Private Limited</div>
              <div>
                <a href="mailto:contact@rimigo.com" className="hover:text-white">contact@rimigo.com</a>
              </div>
              <div>CIN: U73100KA2024PTC192855</div>
              <div>GST: 29AAKCV4267D1Z0</div>
            </div>
          </div>

          {/* Office Address */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-4">Office</h4>
            <address className="not-italic text-gray-900 space-y-2">
              <div>Vaishnavi Signature</div>
              <div>Marathahalli-Sarjapur Outer Ring Road</div>
              <div>Bangalore, Karnataka - 560103</div>
              <div>India</div>
            </address>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 text-center text-sm text-gray-00">
          © {new Date().getFullYear()} Viareel Travel Private Limited. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer

