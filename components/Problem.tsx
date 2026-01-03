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
              <span className="text-purple-600">winning viral-recipe</span> to shoot your own version
            </h2>
          </div>

          <div className="space-y-6">
            <div className="inline-block">
              <span className="text-sm font-semibold text-purple-600 uppercase tracking-wide">
                WE PROMISE
              </span>
            </div>
            <h2 className="text-4xl font-bold leading-tight">
              We turn inspiration into <span className="text-purple-600">instructions</span>
            </h2>
            <p className="text-xl text-gray-600">
              Hook formulas, storyboards, shot lists, captions, edit cues, and CTAs.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
