function Resources() {
  const emergencyNumbers = [
    { name: 'Emergency Services', number: '112', description: 'Police, Fire, Medical Emergency' },
    { name: 'Women Helpline', number: '1191', description: '24/7 confidential support' },
    { name: 'Women in Distress (Delhi)', number: '181', description: 'Immediate assistance for women in distress' },
    { name: 'Domestic Violence (NCW WhatsApp)', number: '7827170170', description: 'Report domestic violence via WhatsApp' },
    { name: 'Cyber Crime', number: '1930', description: 'Report cyber frauds and online crimes' },
    { name: 'Mental Health (KIRAN Helpline)', number: '1800-599-0019', description: 'Counseling & mental health support' },
  ];

  const trustedNGOs = [
    {
      name: 'National Organization for Women (NOW)',
      description: 'Advancing women\'s rights and equality',
      website: 'www.now.org',
      services: ['Legal advocacy', 'Policy reform', 'Community support']
    },
    {
      name: 'Women\'s Law Center',
      description: 'Legal resources and advocacy for women',
      website: 'www.nwlc.org',
      services: ['Legal aid', 'Know your rights', 'Court advocacy']
    },
    {
      name: 'Safe Horizon',
      description: 'Support for victims of violence and abuse',
      website: 'www.safehorizon.org',
      services: ['Crisis counseling', 'Safety planning', 'Legal assistance']
    },
    {
      name: 'YWCA',
      description: 'Eliminating racism and empowering women',
      website: 'www.ywca.org',
      services: ['Shelter services', 'Counseling', 'Job training']
    },
  ];

  const safetyTips = [
    {
      category: 'Personal Safety',
      tips: [
        'Trust your instincts - if something feels wrong, it probably is',
        'Stay alert and aware of your surroundings at all times',
        'Keep your phone charged and easily accessible',
        'Share your location with trusted contacts when going out',
        'Avoid walking alone in poorly lit or isolated areas',
        'Learn basic self-defense techniques'
      ]
    },
    {
      category: 'Digital Safety',
      tips: [
        'Use strong, unique passwords for all accounts',
        'Enable two-factor authentication where possible',
        'Be cautious about sharing personal information online',
        'Regularly review privacy settings on social media',
        'Don\'t share your location publicly on social platforms',
        'Be wary of suspicious links and emails'
      ]
    },
    {
      category: 'Transportation Safety',
      tips: [
        'Verify ride-share details before getting in the vehicle',
        'Share your trip details with someone you trust',
        'Sit behind the driver in ride-shares',
        'Keep car doors locked while driving',
        'Park in well-lit, populated areas',
        'Have your keys ready before approaching your car'
      ]
    },
    {
      category: 'Home Safety',
      tips: [
        'Install quality locks on all doors and windows',
        'Use a peephole or security camera at your front door',
        'Don\'t open the door for unexpected visitors',
        'Keep emergency numbers easily accessible',
        'Consider a security system or alarm',
        'Let trusted neighbors know when you\'ll be away'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Safety Resources
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Essential resources, helpline numbers, and safety tips to help you stay safe and informed.
          </p>
        </div>

        {/* Emergency Numbers */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Emergency Helplines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {emergencyNumbers.map((emergency, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
                <h3 className="font-bold text-gray-900 mb-2">{emergency.name}</h3>
                <div className="text-2xl font-bold text-red-600 mb-2">{emergency.number}</div>
                <p className="text-gray-600 text-sm">{emergency.description}</p>
                <button className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors w-full">
                  Call Now
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Trusted NGOs */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Trusted Organizations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {trustedNGOs.map((ngo, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{ngo.name}</h3>
                <p className="text-gray-600 mb-4">{ngo.description}</p>
                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-700">Website: </span>
                  <span className="text-blue-600">{ngo.website}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Services:</h4>
                  <ul className="space-y-1">
                    {ngo.services.map((service, serviceIndex) => (
                      <li key={serviceIndex} className="text-gray-600 text-sm flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Tips */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Safety Tips</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {safetyTips.map((category, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  {category.category}
                </h3>
                <ul className="space-y-3">
                  {category.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Need Immediate Help?</h2>
          <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
            If you're in immediate danger, don't hesitate to contact emergency services or use our SOS feature.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-semibold transition-colors shadow-lg">
              Call 911
            </button>
            <button className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg">
              Use SOS Feature
            </button>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Safety Guides</h3>
              <p className="text-gray-600 text-sm">Comprehensive guides on personal safety and self-defense</p>
            </div>

            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Support Groups</h3>
              <p className="text-gray-600 text-sm">Connect with other women and find community support</p>
            </div>

            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Legal Aid</h3>
              <p className="text-gray-600 text-sm">Free legal resources and assistance for women in need</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resources;