import React, { useState } from "react";
import "./../styles/faq.css";
function Faq() {
  const [openIndex, setOpenIndex] = useState(null);
  const columns = [[], [], []];
  const faqData = [
    // Column 1
    {
      question: "What documents do I need to rent a car?",
      answer:
        "Valid driver’s license, ID proof (Aadhar or Passport), and a credit/debit card.",
    },
    {
      question: "Is there a minimum age to rent a car?",
      answer: "Yes, you must be at least 21 years old.",
    },
    {
      question: "Can I pick up the car from one location and drop at another?",
      answer: "Yes, but intercity drop-off charges may apply.",
    },
    {
      question: "Can I extend my rental period?",
      answer: "Yes, based on availability. Extra charges will apply.",
    },
    {
      question: "Is insurance included?",
      answer: "Basic insurance is included. Additional cover can be purchased.",
    },

    // Column 2
    {
      question: "Can I cancel my booking?",
      answer: "Yes, full refund if cancelled 24 hours before pickup.",
    },
    {
      question: "What happens if I return the car late?",
      answer:
        "Late return fees will be charged hourly beyond the grace period.",
    },
    {
      question: "Do you provide fuel?",
      answer: "Cars come with fuel. You return it at the same level.",
    },
    {
      question: "Are there mileage limits?",
      answer: "Yes, 250 km/day limit. Extra km are chargeable.",
    },
    {
      question: "What should I do if the car breaks down?",
      answer: "Call our 24x7 support. We provide roadside assistance.",
    },

    // Column 3
    {
      question: "Can I add an additional driver?",
      answer: "Yes, for a nominal fee. License verification needed.",
    },
    {
      question: "Are pets allowed in the car?",
      answer: "Yes, but you must return the car clean or pay a cleaning fee.",
    },
    {
      question: "How are tolls and parking handled?",
      answer: "Tolls and parking are to be paid by the customer during usage.",
    },
    {
      question: "Is there a deposit required?",
      answer: "Yes, refundable security deposit depending on car type.",
    },
    {
      question: "Can I choose the exact car model?",
      answer: "We try to match preferences but cannot guarantee exact models.",
    },
  ];
  faqData.forEach((faq, i) => {
    columns[i % 3].push({ ...faq, index: i });
  });
  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <div className="faq-container">
        <div className="faq-columns">
          {columns.map((col, colIndex) => (
            <div key={colIndex} className="faq-column">
              {col.map((faq) => (
                <div key={faq.index} className="faq-item">
                  <button
                    className="faq-question"
                    onClick={() => toggle(faq.index)}
                  >
                    {faq.question}
                    <span>{openIndex === faq.index ? "−" : "+"}</span>
                  </button>
                  {openIndex === faq.index && (
                    <div className="faq-answer">{faq.answer}</div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Faq;
