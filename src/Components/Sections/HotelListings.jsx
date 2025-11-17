import { useState } from 'react'

const HotelListings = () => {
  const [favorites, setFavorites] = useState(new Set())

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(id)) {
      newFavorites.delete(id)
    } else {
      newFavorites.add(id)
    }
    setFavorites(newFavorites)
  }

  const hotels = [
    {
      id: 1,
      name: 'Sakura Haven Kyoto',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop',
      description: "A boutique hotel offering vegetarian breakfast and a central location in Kyoto. It's praised for its excellent staff and little thoughtful extras.",
      amenities: ['Free Wi-Fi', 'Kitchen', '4 Beds', 'House', 'Spa', 'Central'],
      price: 180
    },
    {
      id: 2,
      name: 'Sakura Haven Kyoto',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop',
      description: 'Located in Nakagyo Ward, this hotel is known for its helpful staff, great location, and additional amenities like a bath and laundry.',
      amenities: ['Free Wi-Fi', 'Kitchen', '2 Beds', 'Room', 'Massage', 'Central'],
      price: 66
    },
    {
      id: 3,
      name: 'Sakura Haven Kyoto',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop',
      description: 'Situated in Shimogyo Ward, it features spacious rooms and is ideal for families and groups. Highly rated for comfort and service.',
      amenities: ['Free Wi-Fi', 'Restaurant', '2 Beds', 'Room', 'Massage'],
      price: 205
    },
    {
      id: 4,
      name: 'Sakura Haven Kyoto',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&h=300&fit=crop',
      description: 'A contemporary hotel with public baths, located near recommended areas. Recommended for its value and amenities.',
      amenities: ['Free Wi-Fi', 'House'],
      price: 120
    }
  ]

  return (
    <section className="py-16 px-6">
      <div className="container mx-auto">
        {/* Section Title */}
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Best hotels in
          </h2>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900 text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Kyoto, Japan</span>
          </div>
        </div>

        {/* Hotel Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {hotels.map((hotel) => (
            <div
              key={hotel.id}
              className="backdrop-blur-md bg-gray-900/40 rounded-2xl overflow-hidden border border-white/20 shadow-xl hover:shadow-2xl transition-all"
            >
              {/* Hotel Image */}
              <div className="relative h-48">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                />
                {/* Rating Badge */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-sm font-medium">
                  ★ {hotel.rating}/5
                </div>
                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(hotel.id)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center hover:bg-black/80 transition-colors"
                >
                  <svg
                    className={`w-5 h-5 ${favorites.has(hotel.id) ? 'text-red-500 fill-red-500' : 'text-white'}`}
                    fill={favorites.has(hotel.id) ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>

              {/* Hotel Info */}
              <div className="p-5 text-white">
                <h3 className="text-xl font-bold mb-2">{hotel.name}</h3>
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                  {hotel.description}
                </p>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {hotel.amenities.slice(0, 4).map((amenity, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs bg-white/10 backdrop-blur-sm rounded-full"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>

                {/* Price */}
                <div className="flex items-center justify-between pt-4 border-t border-white/20">
                  <span className="text-2xl font-bold">${hotel.price}</span>
                  <span className="text-gray-400 text-sm">/night</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HotelListings

