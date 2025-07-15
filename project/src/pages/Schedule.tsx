import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, Video, MapPin } from 'lucide-react';
import { format, addDays, startOfWeek } from 'date-fns';

const upcomingSessions = [
  {
    id: 1,
    title: 'Python Fundamentals',
    partner: 'Maria Rodriguez',
    avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
    date: new Date(2024, 11, 20, 14, 0),
    duration: 60,
    type: 'online',
    status: 'upcoming'
  },
  {
    id: 2,
    title: 'Guitar Basics',
    partner: 'David Kim',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
    date: new Date(2024, 11, 21, 10, 30),
    duration: 90,
    type: 'in-person',
    status: 'upcoming'
  },
  {
    id: 3,
    title: 'Digital Photography',
    partner: 'Sarah Johnson',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
    date: new Date(2024, 11, 22, 16, 0),
    duration: 120,
    type: 'online',
    status: 'confirmed'
  }
];

export function Schedule() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const weekStart = startOfWeek(selectedDate);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const getSessionsForDate = (date: Date) => {
    return upcomingSessions.filter(session => 
      format(session.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-black pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Schedule</span>
          </h1>
          <p className="text-gray-400 text-lg">Manage your learning sessions and stay organized</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar View */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="bg-black/30 backdrop-blur-sm border-white/10 mb-6">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    This Week
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Week View */}
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {weekDays.map((day, index) => {
                      const sessions = getSessionsForDate(day);
                      const isToday = format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
                      const isSelected = format(day, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
                      
                      return (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`p-3 rounded-xl cursor-pointer transition-all ${
                            isSelected 
                              ? 'bg-cyan-500/20 border-2 border-cyan-400' 
                              : isToday 
                                ? 'bg-purple-500/20 border border-purple-400/50'
                                : 'bg-white/5 border border-white/10 hover:bg-white/10'
                          }`}
                          onClick={() => setSelectedDate(day)}
                        >
                          <div className="text-center">
                            <div className="text-xs text-gray-400 mb-1">
                              {format(day, 'EEE')}
                            </div>
                            <div className={`text-lg font-semibold ${isToday ? 'text-purple-400' : 'text-white'}`}>
                              {format(day, 'd')}
                            </div>
                            {sessions.length > 0 && (
                              <div className="w-2 h-2 bg-cyan-400 rounded-full mx-auto mt-1"></div>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Selected Date Sessions */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-white">
                      {format(selectedDate, 'EEEE, MMMM d')}
                    </h4>
                    {getSessionsForDate(selectedDate).length === 0 ? (
                      <p className="text-gray-400 text-sm py-4">No sessions scheduled for this day</p>
                    ) : (
                      getSessionsForDate(selectedDate).map(session => (
                        <motion.div
                          key={session.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="bg-white/5 rounded-lg p-4 border border-white/10"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <img
                                src={session.avatar}
                                alt={session.partner}
                                className="w-10 h-10 rounded-full"
                              />
                              <div>
                                <h5 className="font-medium text-white">{session.title}</h5>
                                <p className="text-sm text-gray-400">with {session.partner}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center text-sm text-gray-300 mb-1">
                                <Clock className="w-4 h-4 mr-1" />
                                {format(session.date, 'HH:mm')} ({session.duration}min)
                              </div>
                              <div className="flex items-center text-sm text-gray-400">
                                {session.type === 'online' ? (
                                  <>
                                    <Video className="w-4 h-4 mr-1" />
                                    Online
                                  </>
                                ) : (
                                  <>
                                    <MapPin className="w-4 h-4 mr-1" />
                                    In-person
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Upcoming Sessions Sidebar */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="bg-black/30 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Upcoming Sessions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingSessions.map((session, index) => (
                    <motion.div
                      key={session.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/5 rounded-lg p-4 border border-white/10"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <img
                            src={session.avatar}
                            alt={session.partner}
                            className="w-8 h-8 rounded-full"
                          />
                          <div>
                            <h5 className="font-medium text-white text-sm">{session.title}</h5>
                            <p className="text-xs text-gray-400">{session.partner}</p>
                          </div>
                        </div>
                        <Badge 
                          className={
                            session.status === 'confirmed' 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-yellow-500/20 text-yellow-400'
                          }
                        >
                          {session.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 text-xs text-gray-400">
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-2" />
                          {format(session.date, 'MMM d, yyyy')}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-2" />
                          {format(session.date, 'HH:mm')} ({session.duration}min)
                        </div>
                        <div className="flex items-center">
                          {session.type === 'online' ? (
                            <>
                              <Video className="w-3 h-3 mr-2" />
                              Online
                            </>
                          ) : (
                            <>
                              <MapPin className="w-3 h-3 mr-2" />
                              In-person
                            </>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 mt-3">
                        <Button size="sm" variant="outline" className="flex-1 text-xs border-white/20">
                          Reschedule
                        </Button>
                        <Button size="sm" className="flex-1 text-xs bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30">
                          Message
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}