export default function Problem() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block">
              <span className="text-sm font-semibold text-purple-600 uppercase tracking-wide">
                The Problem
              </span>
            </div>
            <h2 className="text-4xl font-bold leading-tight">
              You&apos;ve saved great references, but you don&apos;t have a{' '}
              <span className="text-purple-600">winning viral-recipe</span> to shoot your own version.
            </h2>
          </div>

          <div className="space-y-6">
            <div className="inline-block">
              <span className="text-sm font-semibold text-purple-600 uppercase tracking-wide">
                We Promise
              </span>
            </div>
            <h2 className="text-4xl font-bold leading-tight">
              We turn inspiration into <span className="text-purple-600">instructions</span>
            </h2>
            <p className="text-xl text-gray-600">
              We reverse-engineer your references into a Viral Blueprint.
            </p>
            <p className="text-lg text-gray-600">
              You get the exact hook formulas, scripts, shot lists, and edit cues used in the original, turned into a plug-and-play template for your content.
            </p>
            
            {/* Recipe Blueprint Preview Image */}
            <div className="mt-8 rounded-xl overflow-hidden shadow-2xl border-2 border-purple-200">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6">
                <div className="bg-white rounded-lg p-4 shadow-inner">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="ml-2 text-xs text-gray-500">Shot-by-Shot Recipe Blueprint</span>
                  </div>
                  <div className="space-y-3">
                    {/* Shot timeline mockup */}
                    <div className="grid grid-cols-6 gap-2">
                      {[1,2,3,4,5,6].map((i) => (
                        <div key={i} className="space-y-2">
                          <div className="aspect-[9/16] bg-gradient-to-br from-gray-200 to-gray-300 rounded flex items-center justify-center">
                            <div className="w-8 h-12 bg-gradient-to-b from-blue-400 to-blue-600 rounded"></div>
                          </div>
                          <div className={`h-12 rounded ${
                            i === 1 ? 'bg-purple-200' :
                            i === 2 ? 'bg-purple-200' :
                            i === 3 ? 'bg-yellow-200' :
                            i === 4 ? 'bg-pink-200' :
                            i === 5 ? 'bg-orange-200' :
                            'bg-purple-300'
                          }`}></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
