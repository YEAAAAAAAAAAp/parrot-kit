export default function UseCases() {
  const cases = [
    {
      title: 'Aspiring UGC Creators',
      description: 'Get your first 10 Shorts structured like winners.',
      icon: '🎬',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Growing UGC Creators',
      subtitle: '10k–100k',
      description: 'Ship more experiments per week by breaking down winning formats into repeatable templates.',
      icon: '📈',
      gradient: 'from-pink-500 to-orange-500'
    },
    {
      title: 'Agencies / teams',
      description: 'Standardize content production with reusable templates.',
      icon: '🏢',
      gradient: 'from-orange-500 to-purple-500'
    }
  ]

  return (
    <section id="use-cases" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            For people who want to work <span className="text-purple-600">smarter, better, faster</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {cases.map((useCase, index) => (
            <div key={index} className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-purple-300 transition hover:shadow-xl">
              <div className={`text-5xl mb-6 bg-gradient-to-r ${useCase.gradient} bg-clip-text text-transparent`}>
                {useCase.icon}
              </div>
              
              <h3 className="text-2xl font-bold mb-2">{useCase.title}</h3>
              {useCase.subtitle && (
                <div className="text-sm text-gray-500 mb-4">{useCase.subtitle}</div>
              )}
              
              <p className="text-gray-600 text-lg">{useCase.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
