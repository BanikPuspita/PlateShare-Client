import React from "react";
import { motion } from "framer-motion";

const HowItWorks = () => {
  const steps = [
    { title: "Post Food", description: "Share your surplus food with the community by creating a new post.", icon: "📤", bg: "bg-yellow-100" },
    { title: "Find Food", description: "Browse available food items posted by donors near you.", icon: "🔍", bg: "bg-blue-100" },
    { title: "Collect Food", description: "Request the food you need and collect it from the donor.", icon: "🍽️", bg: "bg-green-100" },
  ];

  return (
    <section className="max-w-6xl mx-auto py-16 px-4 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-12 text-primary">How It Works</h2>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.3 }}
      >
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            className={`flex flex-col items-center text-center p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ${step.bg}`}
            variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } }}
          >
            <div className="text-6xl mb-4">{step.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-700">{step.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default HowItWorks;
