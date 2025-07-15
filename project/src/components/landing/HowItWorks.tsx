import { motion } from 'framer-motion';
import { Search, MessageCircle, Calendar, Award } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Discover Skills',
    description: 'Browse through thousands of skills or let our AI match you with perfect learning partners.',
    color: 'from-cyan-400 to-blue-500'
  },
  {
    icon: MessageCircle,
    title: 'Connect & Chat',
    description: 'Message potential partners, discuss your goals, and build trust through our karma system.',
    color: 'from-purple-400 to-pink-500'
  },
  {
    icon: Calendar,
    title: 'Schedule Sessions',
    description: 'Book learning sessions that work for both of you with our smart scheduling system.',
    color: 'from-green-400 to-emerald-500'
  },
  {
    icon: Award,
    title: 'Earn Karma',
    description: 'Complete sessions, leave reviews, and build your reputation to unlock premium features.',
    color: 'from-orange-400 to-red-500'
  }
];

export function HowItWorks() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            How <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">SkillSwap</span> Works
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Four simple steps to start your skill-sharing journey and connect with learners worldwide.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Step Card */}
              <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 group-hover:transform group-hover:scale-105">
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-lg transition-all duration-300`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-gray-300 leading-relaxed">{step.description}</p>
              </div>

              {/* Connecting Line (Desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-white/20 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Learning?</h3>
            <p className="text-gray-300 mb-6">Join thousands of learners already trading skills on SkillSwap.</p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300">
                Get Started Free
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}