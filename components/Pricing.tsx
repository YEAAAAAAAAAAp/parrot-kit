export default function Pricing() {
  const plans = [
    {
      name: 'Pro',
      price: '$20',
      period: '/month',
      description: 'For solo creators who want to ship consistently.',
      features: [
        'Unlimited recipe breakdowns',
        'Save & reuse templates',
        'Export shot list + caption flow + edit cues',
        'Priority in invite batches'
      ],
      highlighted: false
    },
    {
      name: 'Team',
      price: '$35',
      period: '/month',
      description: 'For small teams and agencies running repeatable production.',
      features: [
        'Everything in Pro',
        'Shared workspace & templates',
        'Team library (best-performing formats)',
        'Collaboration (notes + version history)',
        'Team priority support'
      ],
      highlighted: true
    }
  ]

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">Simple, transparent pricing</h2>
          <p className="text-xl text-gray-600">
            We&apos;re validating pricing with early users—join now to lock in early access.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`rounded-2xl p-8 ${
                plan.highlighted 
                  ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-2xl scale-105' 
                  : 'bg-white border-2 border-gray-200'
              }`}
            >
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-5xl font-bold">{plan.price}</span>
                <span className={`text-lg ${plan.highlighted ? 'text-white/80' : 'text-gray-500'}`}>
                  {plan.period}
                </span>
              </div>
              <p className={`mb-8 text-lg ${plan.highlighted ? 'text-white/90' : 'text-gray-600'}`}>
                {plan.description}
              </p>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <svg 
                      className={`w-6 h-6 flex-shrink-0 ${plan.highlighted ? 'text-white' : 'text-purple-600'}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                className={`w-full py-4 rounded-xl font-semibold text-lg transition ${
                  plan.highlighted
                    ? 'bg-white text-purple-600 hover:bg-gray-100'
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}
              >
                Get started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
