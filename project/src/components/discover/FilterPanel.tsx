import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Filter, X } from 'lucide-react';

const categories = [
  'Music', 'Technology', 'Language', 'Creative', 'Wellness', 'Business', 'Sports', 'Cooking'
];

const levels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

export function FilterPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [responseTime, setResponseTime] = useState([24]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleLevel = (level: string) => {
    setSelectedLevels(prev => 
      prev.includes(level) 
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedLevels([]);
    setResponseTime([24]);
  };

  return (
    <>
      {/* Filter Toggle Button - Mobile */}
      <div className="lg:hidden mb-6">
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full border-white/20 text-white hover:bg-white/10"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filters
          {(selectedCategories.length > 0 || selectedLevels.length > 0) && (
            <Badge className="ml-2 bg-cyan-500/20 text-cyan-400">
              {selectedCategories.length + selectedLevels.length}
            </Badge>
          )}
        </Button>
      </div>

      {/* Filter Panel */}
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0
        }}
        className="lg:h-auto lg:opacity-100 overflow-hidden lg:overflow-visible"
      >
        <Card className="bg-black/30 backdrop-blur-sm border-white/10 mb-6">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-lg text-white">Filters</CardTitle>
            <div className="flex items-center space-x-2">
              {(selectedCategories.length > 0 || selectedLevels.length > 0) && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear All
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Categories */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Categories</h4>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <Badge
                    key={category}
                    variant={selectedCategories.includes(category) ? "default" : "outline"}
                    className={`cursor-pointer transition-colors ${
                      selectedCategories.includes(category)
                        ? 'bg-cyan-500/20 text-cyan-400 border-cyan-400/30'
                        : 'border-white/20 text-gray-300 hover:bg-white/10'
                    }`}
                    onClick={() => toggleCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Skill Level */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Skill Level</h4>
              <div className="space-y-2">
                {levels.map(level => (
                  <div key={level} className="flex items-center space-x-2">
                    <Checkbox
                      id={level}
                      checked={selectedLevels.includes(level)}
                      onCheckedChange={() => toggleLevel(level)}
                      className="border-white/20 data-[state=checked]:bg-cyan-500"
                    />
                    <label htmlFor={level} className="text-sm text-gray-300 cursor-pointer">
                      {level}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Response Time */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">
                Max Response Time: {responseTime[0]}h
              </h4>
              <Slider
                value={responseTime}
                onValueChange={setResponseTime}
                max={48}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>1h</span>
                <span>48h</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
}