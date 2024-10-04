import { useState } from 'react';

const FAQ = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const faqData = [
    {
      question: "What types of plants do you offer?",
      answer: "At Plants Oasis, we offer a wide variety of indoor and outdoor plants, including succulents, tropical plants, herbs, and more."
    },
    {
      question: "How do I care for my new plant?",
      answer: "Each plant has different care requirements. We provide detailed care instructions with every purchase, and our team is always available to answer specific questions."
    },
    {
      question: "Do you offer shipping?",
      answer: "Yes, we offer shipping across the continental United States. Shipping costs vary based on location and order size."
    },
    {
      question: "What is your return policy?",
      answer: "We have a 14-day return policy for plants that arrive damaged or unhealthy. Please contact us immediately if you have any issues with your order."
    }
  ];

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 p-6 font-smono">
      <h2 className="text-4xl
       font-bold mb-6 text-center font-reck uppercase pb-6">Frequently Asked Questions</h2>
      {faqData.map((item, index) => (
        <div key={index} className="mb-4 border-b border-gray-200 pb-4">
          <button
            className="flex justify-between items-center w-full text-left"
            onClick={() => toggleQuestion(index)}
          >
            <span className="text-lg font-semibold">{item.question}</span>
            <span className="text-2xl">{openQuestion === index ? '-' : '+'}</span>
          </button>
          {openQuestion === index && (
            <p className="mt-2 text-zinc-600">{item.answer}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQ;