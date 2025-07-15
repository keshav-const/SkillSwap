import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, MapPin, Clock, Heart, X } from 'lucide-react';
import { User, Skill } from '@/types';

interface SkillCardProps {
  user: User;
  skill: Skill;
  onLike: () => void;
  onPass: () => void;
}

export function SkillCard({ user, skill, onLike, onPass }: SkillCardProps) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-sm mx-auto"
    >
      <Card className="bg-black/30 backdrop-blur-sm border-white/10 overflow-hidden">
        <CardContent className="p-0">
          {/* Header with User Info */}
          <div className="p-6 pb-4">
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16 ring-2 ring-cyan-400/20">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white">{user.name}</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>{user.location}</span>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-white font-medium">{user.rating}</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {user.sessionsCompleted} sessions
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Skill Details */}
          <div className="px-6 pb-6">
            <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl p-6 border border-cyan-400/20">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold text-white">{skill.name}</h4>
                <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-400/30">
                  {skill.level}
                </Badge>
              </div>
              
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                {skill.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {skill.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="border-white/20 text-gray-300">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>Responds in {user.responseTime}h</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center space-x-4 p-6 pt-0">
            <Button
              variant="outline"
              size="lg"
              onClick={onPass}
              className="w-16 h-16 rounded-full border-red-400/30 text-red-400 hover:bg-red-500/10 hover:border-red-400/50"
            >
              <X className="w-6 h-6" />
            </Button>
            <Button
              size="lg"
              onClick={onLike}
              className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg shadow-green-500/25"
            >
              <Heart className="w-6 h-6" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}