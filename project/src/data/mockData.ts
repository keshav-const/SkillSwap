import { User, Skill, Exchange, Badge } from '@/types';

export const mockSkills: Skill[] = [
  {
    id: '1',
    name: 'Guitar Lessons',
    category: 'Music',
    level: 'Advanced',
    description: 'Classical and modern guitar techniques',
    tags: ['music', 'instrument', 'classical', 'rock']
  },
  {
    id: '2',
    name: 'Python Programming',
    category: 'Technology',
    level: 'Expert',
    description: 'Full-stack Python development and AI/ML',
    tags: ['programming', 'python', 'web', 'ai']
  },
  {
    id: '3',
    name: 'Digital Photography',
    category: 'Creative',
    level: 'Intermediate',
    description: 'Portrait and landscape photography',
    tags: ['photography', 'editing', 'portraits', 'nature']
  },
  {
    id: '4',
    name: 'Yoga Instruction',
    category: 'Wellness',
    level: 'Advanced',
    description: 'Hatha and Vinyasa yoga styles',
    tags: ['yoga', 'meditation', 'wellness', 'flexibility']
  },
  {
    id: '5',
    name: 'Spanish Tutoring',
    category: 'Language',
    level: 'Expert',
    description: 'Native Spanish speaker offering conversational practice',
    tags: ['spanish', 'language', 'conversation', 'culture']
  }
];

export const mockBadges: Badge[] = [
  {
    id: '1',
    name: 'First Exchange',
    description: 'Completed your first skill exchange',
    icon: '🎯',
    earnedAt: new Date('2024-01-15'),
    rarity: 'Common'
  },
  {
    id: '2',
    name: 'Quick Responder',
    description: 'Average response time under 2 hours',
    icon: '⚡',
    earnedAt: new Date('2024-02-01'),
    rarity: 'Rare'
  },
  {
    id: '3',
    name: 'Master Teacher',
    description: 'Completed 50+ teaching sessions',
    icon: '🎓',
    earnedAt: new Date('2024-03-10'),
    rarity: 'Epic'
  }
];

export const mockCurrentUser: User = {
  id: 'user-1',
  name: 'Alex Chen',
  email: 'alex@example.com',
  avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
  karma: 750,
  level: 8,
  badges: mockBadges,
  skillsOffered: [mockSkills[1], mockSkills[2]],
  skillsWanted: [mockSkills[0], mockSkills[3]],
  location: 'San Francisco, CA',
  timezone: 'America/Los_Angeles',
  rating: 4.8,
  sessionsCompleted: 47,
  responseTime: 1.5,
  joinedAt: new Date('2023-12-01')
};

export const mockUsers: User[] = [
  {
    id: 'user-2',
    name: 'Maria Rodriguez',
    email: 'maria@example.com',
    avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    karma: 620,
    level: 6,
    badges: [],
    skillsOffered: [mockSkills[0], mockSkills[4]],
    skillsWanted: [mockSkills[1]],
    location: 'Austin, TX',
    timezone: 'America/Chicago',
    rating: 4.6,
    sessionsCompleted: 32,
    responseTime: 2.1,
    joinedAt: new Date('2024-01-15')
  },
  {
    id: 'user-3',
    name: 'David Kim',
    email: 'david@example.com',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    karma: 890,
    level: 9,
    badges: mockBadges,
    skillsOffered: [mockSkills[2], mockSkills[3]],
    skillsWanted: [mockSkills[1]],
    location: 'Seattle, WA',
    timezone: 'America/Los_Angeles',
    rating: 4.9,
    sessionsCompleted: 68,
    responseTime: 0.8,
    joinedAt: new Date('2023-10-20')
  }
];

export const mockExchanges: Exchange[] = [
  {
    id: 'exchange-1',
    participants: ['user-1', 'user-2'],
    skillOffered: mockSkills[1],
    skillWanted: mockSkills[0],
    status: 'in-progress',
    scheduledSessions: [],
    messages: [],
    createdAt: new Date('2024-11-01'),
    updatedAt: new Date('2024-11-15')
  }
];