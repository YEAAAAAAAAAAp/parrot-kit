export default function WhyUs() {
  const reasons = [
    {
      title: 'Angle',
      description: 'Real-time camera angle adjustments from your phone—no reshoots needed.',
      icon: '📐',
      highlight: true
    },
    {
      title: 'Script',
      description: 'Hyper-personalized scripts that go beyond generic LLM outputs—production-ready quality.',
      icon: '✍️',
      highlight: true
    },
    {
      title: 'Resolution',
      description: 'Consistent resolution with color grading and filters built in—professional finish guaranteed.',
      icon: '🎨',
      highlight: true
    }
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">Why us</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div key={index} className="text-center space-y-4">
              <div className="text-6xl">{reason.icon}</div>
              <h3 className="text-2xl font-bold">{reason.title}</h3>
              <p className="text-xl text-gray-600">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
