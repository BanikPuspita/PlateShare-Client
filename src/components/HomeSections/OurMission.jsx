import React from "react";
import { motion } from "framer-motion";

const OurMission = () => {
  const stats = [
    { label: "Meals Shared", value: 500, bg: "bg-green-100" },
    { label: "Active Donors", value: 200, bg: "bg-yellow-100" },
    { label: "Happy Recipients", value: 100, bg: "bg-blue-100" },
  ];

  return (
    <section className="py-16 px-4 bg-green-50">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6 text-primary">Our Mission</h2>
        <p className="text-gray-700 text-lg mb-12">
          We aim to reduce food waste and help the community by connecting generous donors with those in need. Every meal shared counts!
        </p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.3 }}
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              className={`p-8 rounded-2xl shadow-lg ${stat.bg} hover:shadow-2xl transition-all duration-300`}
              variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } }}
            >
              <h3 className="text-4xl font-bold text-primary mb-2">{stat.value}+</h3>
              <p className="text-gray-700">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default OurMission;
