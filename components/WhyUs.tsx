export default function WhyUs() {
  const reasons = [
    {
      title: 'Not just ideas.',
      description: 'We output a production recipe you can actually follow.',
      icon: '✅'
    },
    {
      title: 'Straightforward, appliable tips',
      description: 'We extract the exact structure that makes a Short work.',
      icon: '🎯'
    },
    {
      title: 'Access to repeatable viral templates',
      description: 'Save recipes as templates for your channel and team.',
      icon: '🔄'
    }
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">Why us?</h2>
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
