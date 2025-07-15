import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Trophy, TrendingUp, Star, Clock } from 'lucide-react';
import { mockCurrentUser } from '@/data/mockData';
import { getKarmaColor, getKarmaBadge } from '@/lib/karma';

export function KarmaCard() {
  const user = mockCurrentUser;
  const nextLevelKarma = (user.level) * 100;
  const currentLevelProgress = ((user.karma % 100) / 100) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border-purple-400/30 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Karma Score</h3>
              <p className="text-gray-400 text-sm">Your reputation in the community</p>
            </div>
            <div className="relative">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center ${getKarmaColor(user.karma).replace('text-', 'shadow-')} shadow-lg`}>
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-500 opacity-20 blur-sm"
              />
            </div>
          </div>

          {/* Karma Score */}
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className={`text-4xl font-bold ${getKarmaColor(user.karma)} mb-2`}
            >
              {user.karma}
            </motion.div>
            <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-400/30">
              Level {user.level} • {getKarmaBadge(user.karma)}
            </Badge>
          </div>

          {/* Progress to Next Level */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Progress to Level {user.level + 1}</span>
              <span>{user.karma % 100}/100</span>
            </div>
            <Progress 
              value={currentLevelProgress} 
              className="h-2 bg-gray-700"
            />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-black/30 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center mb-1">
                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                <span className="text-yellow-400 font-semibold">{user.rating}</span>
              </div>
              <p className="text-xs text-gray-400">Rating</p>
            </div>
            <div className="bg-black/30 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center mb-1">
                <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                <span className="text-green-400 font-semibold">{user.sessionsCompleted}</span>
              </div>
              <p className="text-xs text-gray-400">Sessions</p>
            </div>
            <div className="bg-black/30 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center mb-1">
                <Clock className="w-4 h-4 text-cyan-400 mr-1" />
                <span className="text-cyan-400 font-semibold">{user.responseTime}h</span>
              </div>
              <p className="text-xs text-gray-400">Response</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}