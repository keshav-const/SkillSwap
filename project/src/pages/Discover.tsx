import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SkillCard } from '@/components/discover/SkillCard';
import { FilterPanel } from '@/components/discover/FilterPanel';
import { mockUsers, mockSkills } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

export function Discover() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cards, setCards] = useState(
    mockUsers.map(user => ({
      ...user,
      skill: user.skillsOffered[0] || mockSkills[0]
    }))
  );

  const handleLike = () => {
    console.log('Liked:', cards[currentIndex]);
    nextCard();
  };

  const handlePass = () => {
    console.log('Passed:', cards[currentIndex]);
    nextCard();
  };

  const nextCard = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Reset or load more cards
      setCurrentIndex(0);
    }
  };

  const resetCards = () => {
    setCurrentIndex(0);
    // Shuffle cards or load new ones
    setCards([...cards].sort(() => Math.random() - 0.5));
  };

  const currentCard = cards[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-black pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Discover <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Skills</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Swipe through skills and find your perfect learning partner. Like what you see? Start a conversation!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden lg:block">
            <FilterPanel />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Mobile Filters */}
            <div className="lg:hidden">
              <FilterPanel />
            </div>

            {/* Card Stack */}
            <div className="flex flex-col items-center space-y-6">
              <div className="relative w-full max-w-sm mx-auto h-[600px]">
                <AnimatePresence mode="wait">
                  {currentCard && (
                    <motion.div
                      key={currentIndex}
                      className="absolute inset-0"
                      layout
                    >
                      <SkillCard
                        user={currentCard}
                        skill={currentCard.skill}
                        onLike={handleLike}
                        onPass={handlePass}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Next cards preview */}
                {cards[currentIndex + 1] && (
                  <motion.div
                    className="absolute inset-0 -z-10 scale-95 opacity-50"
                    initial={{ scale: 0.9, opacity: 0.3 }}
                    animate={{ scale: 0.95, opacity: 0.5 }}
                  >
                    <SkillCard
                      user={cards[currentIndex + 1]}
                      skill={cards[currentIndex + 1].skill}
                      onLike={() => {}}
                      onPass={() => {}}
                    />
                  </motion.div>
                )}
              </div>

              {/* Controls */}
              <div className="flex items-center space-x-4">
                <span className="text-gray-400 text-sm">
                  {currentIndex + 1} of {cards.length}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetCards}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Shuffle
                </Button>
              </div>

              {/* Instructions */}
              <div className="text-center text-gray-400 text-sm max-w-md">
                <p className="mb-2">💡 <strong>Pro tip:</strong> Use keyboard shortcuts</p>
                <div className="flex justify-center space-x-4">
                  <span>← Pass</span>
                  <span>→ Like</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}