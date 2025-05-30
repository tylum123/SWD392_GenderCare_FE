import React, { useState } from 'react';

const ReproductiveHealth = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('');

  const healthTopics = [
    {
      title: 'Menstrual Health',
      content: 'Information about menstrual cycles, common issues, and self-care tips.',
      icon: '📅',
    },
    {
      title: 'Sexual Health',
      content: 'Guidance on sexual health, contraception, and safe practices.',
      icon: '🏥',
    },
    {
      title: 'General Information',
      content: 'Basic information about reproductive health and wellness.',
      icon: 'ℹ️',
    },
  ];

  const faqs = [
    {
      question: 'What is reproductive health?',
      answer: 'Reproductive health is a state of complete physical, mental and social well-being in all matters relating to the reproductive system and its functions and processes.',
    },
    {
      question: 'How can I maintain good reproductive health?',
      answer: 'Maintaining good reproductive health involves regular check-ups, practicing safe sex, maintaining a healthy lifestyle, and being aware of your body\'s changes.',
    },
    {
      question: 'When should I see a healthcare provider?',
      answer: 'You should see a healthcare provider for regular check-ups, if you experience unusual symptoms, or if you have concerns about your reproductive health.',
    },
  ];

  const handleOpenDialog = (topic) => {
    setSelectedTopic(topic);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Reproductive Health Resources
      </h1>

      {/* Health Topics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {healthTopics.map((topic, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-6 transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            <div className="text-center">
              <div className="text-4xl mb-4">{topic.icon}</div>
              <h2 className="text-2xl font-semibold mb-3">{topic.title}</h2>
              <p className="text-gray-600 mb-4">{topic.content}</p>
              <button
                onClick={() => handleOpenDialog(topic.title)}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* FAQs Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border rounded-lg overflow-hidden">
              <details className="group">
                <summary className="flex justify-between items-center p-4 cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <h3 className="text-lg font-semibold">{faq.question}</h3>
                  <span className="transform group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <div className="p-4 bg-white">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              </details>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold mb-6">Contact a Healthcare Provider</h2>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your email"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <textarea
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows="4"
              placeholder="Your message"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Topic Dialog */}
      {openDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">{selectedTopic}</h3>
              <button
                onClick={handleCloseDialog}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="text-gray-700">
              <p className="mb-4">
                Detailed information about {selectedTopic} will be displayed here.
                This section can include comprehensive resources, guidelines, and
                professional advice related to the selected topic.
              </p>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleCloseDialog}
                className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReproductiveHealth;
