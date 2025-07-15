export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  karma: number;
  level: number;
  badges: Badge[];
  skillsOffered: Skill[];
  skillsWanted: Skill[];
  location: string;
  timezone: string;
  rating: number;
  sessionsCompleted: number;
  responseTime: number; // in hours
  joinedAt: Date;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  description: string;
  tags: string[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: Date;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
}

export interface Exchange {
  id: string;
  participants: [string, string]; // user IDs
  skillOffered: Skill;
  skillWanted: Skill;
  status: 'pending' | 'accepted' | 'in-progress' | 'completed' | 'cancelled';
  scheduledSessions: Session[];
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
  id: string;
  exchangeId: string;
  scheduledAt: Date;
  duration: number; // in minutes
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  location: 'online' | 'in-person';
  notes?: string;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  read: boolean;
  type: 'text' | 'system' | 'schedule';
}

export interface KarmaTransaction {
  id: string;
  userId: string;
  amount: number;
  reason: string;
  timestamp: Date;
  relatedExchangeId?: string;
}