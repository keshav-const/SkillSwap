import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Calendar, MessageSquare, TrendingUp } from 'lucide-react';

const stats = [
  {
    title: 'Active Exchanges',
    value: '3',
    change: '+1 this week',
    icon: Users,
    color: 'from-cyan-400 to-blue-500',
    bgColor: 'bg-cyan-500/10'
  },
  {
    title: 'Upcoming Sessions',
    value: '5',
    change: '2 today',
    icon: Calendar,
    color: 'from-green-400 to-emerald-500',
    bgColor: 'bg-green-500/10'
  },
  {
    title: 'Unread Messages',
    value: '8',
    change: '3 new',
    icon: MessageSquare,
    color: 'from-purple-400 to-pink-500',
    bgColor: 'bg-purple-500/10'
  },
  {
    title: 'This Month',
    value: '12',
    change: '+4 sessions',
    icon: TrendingUp,
    color: 'from-orange-400 to-red-500',
    bgColor: 'bg-orange-500/10'
  }
];

export function QuickStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
        >
          <Card className={`${stat.bgColor} backdrop-blur-sm border-white/10 hover:border-white/20 transition-all duration-300`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium mb-1">{stat.title}</p>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-bold text-white">{stat.value}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}