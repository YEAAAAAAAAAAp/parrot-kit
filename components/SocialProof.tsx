export default function SocialProof() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">
              Built for <span className="text-purple-600">aspiring creators</span> and{' '}
              <span className="text-purple-600">lean teams</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              who want consistent output without trial-and-error.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <button className="bg-purple-600 text-white px-8 py-4 rounded-xl hover:bg-purple-700 transition font-semibold">
              Join us with 10K+ Creators
            </button>
            <button className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-xl hover:bg-purple-50 transition font-semibold">
              Talk to us (10 min)
            </button>
          </div>

          <p className="text-gray-500">
            Want a faster invite?{' '}
            <span className="font-semibold text-purple-600">Book a 10-minute user interview</span>
          </p>
        </div>
      </div>
    </section>
  )
}
