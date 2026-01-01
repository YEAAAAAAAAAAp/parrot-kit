export default function HowItWorks() {
  const steps = [
    {
      number: '1',
      title: 'Paste a reference link',
      description: 'TikTok, Instagram Reels, YouTube Shorts.',
      icon: '🔗'
    },
    {
      number: '2',
      title: 'AI deconstructs the structure',
      description: 'Hook → beats → shot list → edit cues → CTA.',
      icon: '🧠'
    },
    {
      number: '3',
      title: 'Get a shoot-ready recipe',
      description: 'A checklist you can follow today, and reuse as a template tomorrow.',
      icon: '📋'
    }
  ]

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">How it works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From inspiration to production in three simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="relative">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 h-full space-y-4">
                <div className="text-5xl mb-4">{step.icon}</div>
                <div className="text-sm font-bold text-purple-600">STEP {step.number}</div>
                <h3 className="text-2xl font-bold">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-500 italic">
            Optional: generate a first draft video (coming soon).
          </p>
        </div>
      </div>
    </section>
  )
}
