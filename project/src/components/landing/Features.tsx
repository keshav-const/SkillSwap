import { motion } from 'framer-motion';
import { Shield, Zap, Globe, Trophy, MessageSquare, Calendar } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Karma-Based Trust',
    description: 'Our advanced karma system ensures you connect with reliable, committed learners.',
    highlight: true
  },
  {
    icon: Zap,
    title: 'Instant Matching',
    description: 'AI-powered skill matching finds your perfect learning partner in seconds.',
    highlight: false
  },
  {
    icon: Globe,
    title: 'Global Community',
    description: 'Learn from experts worldwide, no matter where you are located.',
    highlight: false
  },
  {
    icon: Trophy,
    title: 'Gamified Experience',
    description: 'Earn badges, climb leaderboards, and unlock exclusive features.',
    highlight: true
  },
  {
    icon: MessageSquare,
    title: 'Real-time Chat',
    description: 'Seamless communication with built-in scheduling and session planning.',
    highlight: false
  },
  {
    icon: Calendar,
    title: 'Smart Scheduling',
    description: 'Timezone-aware booking system that works with your busy schedule.',
    highlight: false
  }
];

export function Features() {
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Powerful Features for
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"> Seamless Learning</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to discover, connect, and learn new skills in a safe, engaging environment.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative group ${
                feature.highlight 
                  ? 'bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border-cyan-400/30' 
                  : 'bg-black/30 border-white/10'
              } backdrop-blur-sm rounded-2xl p-8 border hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105`}
            >
              {/* Highlight Badge */}
              {feature.highlight && (
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-cyan-400 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Popular
                </div>
              )}

              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                feature.highlight 
                  ? 'bg-gradient-to-r from-cyan-400 to-purple-500 shadow-lg shadow-cyan-400/25' 
                  : 'bg-gradient-to-r from-gray-600 to-gray-700'
              }`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>

              {/* Glow Effect */}
              <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                feature.highlight 
                  ? 'bg-gradient-to-r from-cyan-500/5 to-purple-500/5' 
                  : 'bg-white/5'
              }`} />
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { number: '10K+', label: 'Active Users' },
            { number: '500+', label: 'Skills Available' },
            { number: '25K+', label: 'Sessions Completed' },
            { number: '4.9★', label: 'Average Rating' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}