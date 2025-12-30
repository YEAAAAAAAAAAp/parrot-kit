export default function OutputPreview() {
  const outputs = [
    {
      title: 'Hook formula',
      time: '0-2s',
      description: 'Pattern interrupt + promise'
    },
    {
      title: 'Beat map',
      time: '15-30s',
      description: 'What happens, when, and why'
    },
    {
      title: 'Shot list',
      time: null,
      description: 'Framing, actions, props, B-roll cues'
    },
    {
      title: 'Caption + on-screen text',
      time: null,
      description: 'Style, rhythm, keywords'
    },
    {
      title: 'Edit cues',
      time: null,
      description: 'Cuts, pacing, sound beats, transitions'
    },
    {
      title: 'CTA',
      time: null,
      description: 'Comment prompt / follow / link strategy'
    }
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            The breakdown that makes it <span className="text-purple-600">repeatable</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your recipe, in seconds
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {outputs.map((output, index) => (
            <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-purple-300 transition">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold">{output.title}</h3>
                {output.time && (
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-semibold">
                    {output.time}
                  </span>
                )}
              </div>
              <p className="text-gray-600">{output.description}</p>
            </div>
          ))}
        </div>

        {/* Sample Recipe */}
        <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-8 md:p-12 text-white">
          <h3 className="text-2xl font-bold mb-8">Sample Recipe Snippet</h3>
          
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-xs font-bold mb-2 text-purple-200">HOOK (0–2s)</div>
              <div className="text-lg">&quot;Stop doing X. Do this instead.&quot;</div>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-xs font-bold mb-2 text-purple-200">BEAT 1 (2–6s)</div>
              <div className="text-lg">Show the problem in one shot</div>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-xs font-bold mb-2 text-purple-200">BEAT 2 (6–14s)</div>
              <div className="text-lg">Demo the fix with 3 quick cuts</div>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-xs font-bold mb-2 text-purple-200">BEAT 3 (14–22s)</div>
              <div className="text-lg">Proof / result</div>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-xs font-bold mb-2 text-purple-200">CTA (22–30s)</div>
              <div className="text-lg">&quot;Comment &apos;TEMPLATE&apos; and I&apos;ll send it.&quot;</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
