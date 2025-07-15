import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MessageCircle, User, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const activities = [
  {
    id: 1,
    type: 'exchange_request',
    title: 'New Exchange Request',
    description: 'Maria wants to learn Python in exchange for Guitar lessons',
    time: '2 hours ago',
    status: 'pending',
    avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop'
  },
  {
    id: 2,
    type: 'session_scheduled',
    title: 'Session Scheduled',
    description: 'Photography lesson with David tomorrow at 3 PM',
    time: '5 hours ago',
    status: 'confirmed',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop'
  },
  {
    id: 3,
    type: 'message',
    title: 'New Message',
    description: 'Sarah replied to your Spanish tutoring inquiry',
    time: '1 day ago',
    status: 'unread',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop'
  },
  {
    id: 4,
    type: 'session_completed',
    title: 'Session Completed',
    description: 'Yoga session with Emma - Review pending',
    time: '2 days ago',
    status: 'review_needed',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop'
  }
];

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'exchange_request':
      return <User className="w-4 h-4" />;
    case 'session_scheduled':
      return <Calendar className="w-4 h-4" />;
    case 'message':
      return <MessageCircle className="w-4 h-4" />;
    case 'session_completed':
      return <Clock className="w-4 h-4" />;
    default:
      return <User className="w-4 h-4" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30';
    case 'confirmed':
      return 'bg-green-500/20 text-green-400 border-green-400/30';
    case 'unread':
      return 'bg-cyan-500/20 text-cyan-400 border-cyan-400/30';
    case 'review_needed':
      return 'bg-orange-500/20 text-orange-400 border-orange-400/30';
    default:
      return 'bg-gray-500/20 text-gray-400 border-gray-400/30';
  }
};

export function ActivitySummary() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="bg-black/30 backdrop-blur-sm border-white/10">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-xl text-white">Recent Activity</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/activity" className="text-cyan-400 hover:text-cyan-300">
              View All
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-start space-x-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
            >
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <img
                  src={activity.avatar}
                  alt=""
                  className="w-10 h-10 rounded-full ring-2 ring-white/20"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-black/80 rounded-full flex items-center justify-center border border-white/20">
                  {getActivityIcon(activity.type)}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-white font-medium text-sm group-hover:text-cyan-400 transition-colors">
                    {activity.title}
                  </h4>
                  <Badge className={`text-xs ${getStatusColor(activity.status)}`}>
                    {activity.status.replace('_', ' ')}
                  </Badge>
                </div>
                <p className="text-gray-400 text-sm mb-2">{activity.description}</p>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}