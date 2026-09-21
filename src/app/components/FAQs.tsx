"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "What is the check-in and check-out time?",
    answer:
      "Check-in time is from 2:00 PM and check-out is until 12:00 PM.",
  },
  {
    question: "Do you provide free Wi-Fi?",
    answer:
      "Yes, complimentary high-speed Wi-Fi is available in all rooms and public areas.",
  },
  {
    question: "Is breakfast included in the stay?",
    answer:
      "Yes, a complimentary breakfast buffet is included with every booking.",
  },
  {
    question: "Do you have parking available?",
    answer:
      "Yes, we offer free private parking for all our guests.",
  },
  {
    question: "Are pets allowed in the hotel?",
    answer:
      "Unfortunately, pets are not allowed at our property.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.section
      className="w-full bg-gray-50 py-8 sm:py-10 md:py-16 lg:py-24 px-4 sm:px-6 md:px-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7 }}
    >
      {/* Heading */}
      <motion.h2
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12 text-gray-800"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        Frequently Asked Questions
      </motion.h2>

      {/* FAQ Container */}
      <div className="w-full max-w-5xl mx-auto space-y-3 sm:space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{
              opacity: 0,
              x: index % 2 === 0 ? -40 : 40,
              y: 15,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.6,
              delay: index * 0.08,
              ease: "easeOut",
            }}
            className="border border-gray-300 rounded-lg shadow-sm bg-white overflow-hidden"
          >
            {/* Question */}
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center gap-4 cursor-pointer px-4 sm:px-6 py-4 sm:py-5 text-left font-medium text-sm sm:text-base md:text-lg text-gray-800 hover:bg-gray-100 transition-colors duration-200"
            >
              <span>{faq.question}</span>

              <motion.span
                className="text-xl sm:text-2xl flex-shrink-0"
                animate={{
                  rotate: openIndex === index ? 45 : 0,
                }}
                transition={{ duration: 0.2 }}
              >
                +
              </motion.span>
            </button>

            {/* Answer */}
            <AnimatePresence initial={false}>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                  }}
                >
                  <div className="px-4 sm:px-6 pb-4 sm:pb-5 text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
// "use client";
// import { useState } from "react";

// type FAQItem = {
//   question: string;
//   answer: string;
// };

// const faqs: FAQItem[] = [
//   {
//     question: "What is the check-in and check-out time?",
//     answer: "Check-in time is from 2:00 PM and check-out is until 12:00 PM."
//   },
//   {
//     question: "Do you provide free Wi-Fi?",
//     answer: "Yes, complimentary high-speed Wi-Fi is available in all rooms and public areas."
//   },
//   {
//     question: "Is breakfast included in the stay?",
//     answer: "Yes, a complimentary breakfast buffet is included with every booking."
//   },
//   {
//     question: "Do you have parking available?",
//     answer: "Yes, we offer free private parking for all our guests."
//   },
//   {
//     question: "Are pets allowed in the hotel?",
//     answer: "Unfortunately, pets are not allowed at our property."
//   }
// ];

// export default function FAQSection() {
//   const [openIndex, setOpenIndex] = useState<number | null>(null);

//   const toggleFAQ = (index: number) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   return (
//     <section className="w-full bg-gray-50 py-12 px-4">
//       <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
//         Frequently Asked Questions
//       </h2>
//       <div className="w-full space-y-4">
//         {faqs.map((faq, index) => (
//           <div
//             key={index}
//             className="border border-gray-300 rounded-lg shadow-sm bg-white "
//           >
//             <button
//               onClick={() => toggleFAQ(index)}
//               className="w-full flex justify-between items-center cursor-pointer hover:cursor-pointer px-6 py-4 text-left font-medium text-gray-800 hover:bg-gray-100"
//             >
//               {faq.question}
//               <span className="text-xl">{openIndex === index ? "-" : "+"}</span>
//             </button>
//             {openIndex === index && (
//               <div className="px-6 pb-4 text-gray-600">{faq.answer}</div>
//             )}
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }
