import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Search, MoreVertical, Calendar, Phone, Video } from 'lucide-react';
import { format } from 'date-fns';

const conversations = [
  {
    id: 1,
    partner: {
      name: 'Maria Rodriguez',
      avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
      online: true
    },
    lastMessage: 'Sounds great! Looking forward to our Python session tomorrow.',
    timestamp: new Date(2024, 11, 19, 15, 30),
    unread: 2,
    skill: 'Python Programming'
  },
  {
    id: 2,
    partner: {
      name: 'David Kim',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
      online: false
    },
    lastMessage: 'Thanks for the guitar tips! Can we schedule another session?',
    timestamp: new Date(2024, 11, 19, 12, 15),
    unread: 0,
    skill: 'Guitar Lessons'
  },
  {
    id: 3,
    partner: {
      name: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
      online: true
    },
    lastMessage: 'The lighting techniques you shared were amazing!',
    timestamp: new Date(2024, 11, 18, 18, 45),
    unread: 1,
    skill: 'Photography'
  }
];

const currentMessages = [
  {
    id: 1,
    sender: 'Maria Rodriguez',
    content: 'Hi Alex! I saw your Python programming offer. I\'d love to exchange it for guitar lessons.',
    timestamp: new Date(2024, 11, 19, 14, 0),
    isMe: false
  },
  {
    id: 2,
    sender: 'You',
    content: 'That sounds perfect! I\'ve been wanting to learn guitar for years. What\'s your experience level with Python?',
    timestamp: new Date(2024, 11, 19, 14, 5),
    isMe: true
  },
  {
    id: 3,
    sender: 'Maria Rodriguez',
    content: 'I\'m a complete beginner. I want to learn the basics and maybe build a simple web app eventually.',
    timestamp: new Date(2024, 11, 19, 14, 10),
    isMe: false
  },
  {
    id: 4,
    sender: 'You',
    content: 'Perfect! That\'s exactly where I love to start with new students. And I\'m excited to learn from scratch with the guitar too.',
    timestamp: new Date(2024, 11, 19, 14, 15),
    isMe: true
  },
  {
    id: 5,
    sender: 'Maria Rodriguez',
    content: 'Sounds great! Looking forward to our Python session tomorrow.',
    timestamp: new Date(2024, 11, 19, 15, 30),
    isMe: false
  }
];

export function Messages() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.skill.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Messages</span>
          </h1>
          <p className="text-gray-400 text-lg">Connect with your learning partners</p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
          {/* Conversations List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <Card className="bg-black/30 backdrop-blur-sm border-white/10 h-full flex flex-col">
              <CardHeader className="pb-4">
                <CardTitle className="text-white text-lg">Conversations</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
                  />
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto space-y-2">
                {filteredConversations.map((conversation) => (
                  <motion.div
                    key={conversation.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-4 rounded-lg cursor-pointer transition-all ${
                      selectedConversation.id === conversation.id
                        ? 'bg-cyan-500/20 border border-cyan-400/30'
                        : 'bg-white/5 hover:bg-white/10 border border-transparent'
                    }`}
                    onClick={() => setSelectedConversation(conversation)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={conversation.partner.avatar} alt={conversation.partner.name} />
                          <AvatarFallback>{conversation.partner.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        {conversation.partner.online && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-black"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-white text-sm truncate">{conversation.partner.name}</h4>
                          {conversation.unread > 0 && (
                            <Badge className="bg-cyan-500 text-white text-xs h-5 w-5 rounded-full p-0 flex items-center justify-center">
                              {conversation.unread}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-400 mb-1">{conversation.skill}</p>
                        <p className="text-xs text-gray-300 truncate">{conversation.lastMessage}</p>
                        <p className="text-xs text-gray-500 mt-1">{format(conversation.timestamp, 'HH:mm')}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Chat Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <Card className="bg-black/30 backdrop-blur-sm border-white/10 h-full flex flex-col">
              {/* Chat Header */}
              <CardHeader className="border-b border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={selectedConversation.partner.avatar} alt={selectedConversation.partner.name} />
                        <AvatarFallback>{selectedConversation.partner.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      {selectedConversation.partner.online && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-black"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{selectedConversation.partner.name}</h3>
                      <p className="text-sm text-gray-400">{selectedConversation.skill}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                      <Phone className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                      <Video className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                      <Calendar className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                      <MoreVertical className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
                {currentMessages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                      message.isMe
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                        : 'bg-white/10 text-white border border-white/20'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${message.isMe ? 'text-cyan-100' : 'text-gray-400'}`}>
                        {format(message.timestamp, 'HH:mm')}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>

              {/* Message Input */}
              <div className="border-t border-white/10 p-4">
                <div className="flex items-center space-x-4">
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-cyan-400"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 disabled:opacity-50"
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}