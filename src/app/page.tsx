export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">🏖️ Vacacional Rental</h1>
          <nav className="space-x-4">
            <a href="#" className="text-gray-600 hover:text-blue-600">Propiedades</a>
            <a href="#" className="text-gray-600 hover:text-blue-600">Destinos</a>
            <a href="#" className="text-gray-600 hover:text-blue-600">Contacto</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 px-4 text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-6">
          Encuentra tu escapada perfecta
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Descubre alojamientos únicos para unas vacaciones inolvidables
        </p>
        
        {/* Search Box */}
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input 
              type="text" 
              placeholder="¿A dónde quieres ir?" 
              className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input 
              type="date" 
              className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input 
              type="date" 
              className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button className="bg-blue-600 text-white rounded-lg px-6 py-3 hover:bg-blue-700 transition">
              Buscar
            </button>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Propiedades Destacadas</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                <div className="h-48 bg-gradient-to-r from-blue-400 to-blue-600"></div>
                <div className="p-6">
                  <h4 className="font-bold text-lg mb-2">Villa de ejemplo {i}</h4>
                  <p className="text-gray-600 text-sm mb-4">Costa Brava, España</p>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-600 font-bold">150€/noche</span>
                    <span className="text-sm text-gray-500">⭐ 4.9 (24)</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">© 2025 Vacacional Rental Platform. Todos los derechos reservados.</p>
        </div>
      </footer>
    </main>
  );
}
