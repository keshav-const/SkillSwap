import { motion } from 'framer-motion';
import { KarmaCard } from '@/components/dashboard/KarmaCard';
import { QuickStats } from '@/components/dashboard/QuickStats';
import { ActivitySummary } from '@/components/dashboard/ActivitySummary';
import { mockCurrentUser } from '@/data/mockData';

export function Dashboard() {
  const user = mockCurrentUser;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-black pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Welcome back, <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">{user.name}</span>
          </h1>
          <p className="text-gray-400 text-lg">Ready to learn something new today?</p>
        </motion.div>

        {/* Quick Stats */}
        <div className="mb-8">
          <QuickStats />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <ActivitySummary />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <KarmaCard />
          </div>
        </div>
      </div>
    </div>
  );
}