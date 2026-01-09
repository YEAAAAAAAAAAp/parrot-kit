export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              ParrotKit
            </h3>
            <p className="text-gray-400 mb-4">
              Turn any Short into a shoot-ready recipe.
            </p>
            <p className="text-gray-500 text-sm">
              © 2025 ParrotKit. All rights reserved.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#how-it-works" className="hover:text-white transition">How it works</a></li>
              <li><a href="#pricing" className="hover:text-white transition">Pricing</a></li>
              <li><a href="#use-cases" className="hover:text-white transition">Use cases</a></li>
              <li><a href="#faq" className="hover:text-white transition">FAQ</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left">
            <p className="text-gray-500 text-sm mt-2">
              Contact: <a href="mailto:parrotkit01@gmail.com" className="text-purple-400 hover:text-purple-300 transition">parrotkit01@gmail.com</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
