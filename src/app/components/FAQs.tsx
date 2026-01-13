"use client";
import { useState } from "react";

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "What is the check-in and check-out time?",
    answer: "Check-in time is from 2:00 PM and check-out is until 12:00 PM."
  },
  {
    question: "Do you provide free Wi-Fi?",
    answer: "Yes, complimentary high-speed Wi-Fi is available in all rooms and public areas."
  },
  {
    question: "Is breakfast included in the stay?",
    answer: "Yes, a complimentary breakfast buffet is included with every booking."
  },
  {
    question: "Do you have parking available?",
    answer: "Yes, we offer free private parking for all our guests."
  },
  {
    question: "Are pets allowed in the hotel?",
    answer: "Unfortunately, pets are not allowed at our property."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-gray-50 py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Frequently Asked Questions
      </h2>
      <div className="w-full space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg shadow-sm bg-white cursor-pointer hover:cursor-pointer"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center px-6 py-4 text-left font-medium text-gray-800 hover:bg-gray-100"
            >
              {faq.question}
              <span className="text-xl">{openIndex === index ? "-" : "+"}</span>
            </button>
            {openIndex === index && (
              <div className="px-6 pb-4 text-gray-600">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
