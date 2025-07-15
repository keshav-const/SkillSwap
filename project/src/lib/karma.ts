import { User, Exchange } from '@/types';

export interface KarmaCalculation {
  completionRate: number;
  reviewScore: number;
  responseTime: number;
  totalKarma: number;
  level: number;
}

export function calculateKarma(user: User, exchanges: Exchange[]): KarmaCalculation {
  const userExchanges = exchanges.filter(ex => 
    ex.participants.includes(user.id)
  );

  // Session completion rate (50% weight)
  const completedSessions = userExchanges.filter(ex => ex.status === 'completed').length;
  const totalSessions = userExchanges.length;
  const completionRate = totalSessions > 0 ? completedSessions / totalSessions : 0;
  const completionScore = completionRate * 500; // max 500 points

  // User reviews (30% weight) - using rating out of 5
  const reviewScore = (user.rating / 5) * 300; // max 300 points

  // Response time (20% weight) - lower is better
  const maxResponseTime = 24; // 24 hours max for full points
  const responseTimeScore = Math.max(0, (maxResponseTime - user.responseTime) / maxResponseTime) * 200; // max 200 points

  const totalKarma = Math.round(completionScore + reviewScore + responseTimeScore);
  
  // Calculate level based on karma (every 100 karma = 1 level)
  const level = Math.floor(totalKarma / 100) + 1;

  return {
    completionRate,
    reviewScore: user.rating,
    responseTime: user.responseTime,
    totalKarma,
    level
  };
}

export function getKarmaColor(karma: number): string {
  if (karma >= 800) return 'text-purple-400';
  if (karma >= 600) return 'text-cyan-400';
  if (karma >= 400) return 'text-green-400';
  if (karma >= 200) return 'text-yellow-400';
  return 'text-gray-400';
}

export function getKarmaBadge(karma: number): string {
  if (karma >= 800) return 'Master';
  if (karma >= 600) return 'Expert';
  if (karma >= 400) return 'Skilled';
  if (karma >= 200) return 'Learning';
  return 'Newcomer';
}