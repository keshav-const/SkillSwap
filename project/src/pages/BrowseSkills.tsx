import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/useAuth';
import { supabase, UserProfile } from '@/lib/supabase';
import { SwapRequestModal } from '@/components/SwapRequestModal';
import { toast } from 'sonner';
import { Search, MapPin, Clock, RefreshCw, Users } from 'lucide-react';
import { SUPABASE_CONNECTED } from '../lib/supabase'
export function BrowseSkills() {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProfile, setSelectedProfile] = useState<UserProfile | null>(null);
  const [showRequestModal, setShowRequestModal] = useState(false);

  useEffect(() => {
    loadProfiles();
  }, [user]);

  useEffect(() => {
    filterProfiles();
  }, [profiles, searchQuery]);

  const loadProfiles = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('users')
        .select(`
          *,
          skills_offered (*),
          skills_wanted (*)
        `)
        .eq('is_public', true)
        .neq('id', user!.id);

      if (error) throw error;
      setProfiles(data || []);
    } catch (error: any) {
      console.error('Error loading profiles:', error);
      toast.error('Error loading profiles: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const filterProfiles = () => {
    if (!searchQuery.trim()) {
      setFilteredProfiles(profiles);
      return;
    }

    const filtered = profiles.filter(profile =>
      profile.skills_offered.some(skill =>
        skill.skill_name.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      profile.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.location?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredProfiles(filtered);
  };

  const handleRequestSwap = (profile: UserProfile) => {
    setSelectedProfile(profile);
    setShowRequestModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-black pt-20 flex items-center justify-center">
        <div className="text-white">
          {!SUPABASE_CONNECTED ? 
            'Please connect to Supabase to browse skills' : 
            'Loading profiles...'
          }
        </div>
      </div>
    );
  }

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
          <h1 className="text-3xl font-bold text-white mb-4">
            Browse <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Skills</span>
          </h1>
          <p className="text-gray-400 text-lg mb-6">
            Discover amazing skills from our community and find your perfect learning partner.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search skills, names, or locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
            />
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8"
        >
          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-cyan-400" />
              <span className="text-white font-semibold">{profiles.length} Profiles</span>
            </div>
          </div>
          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <div className="flex items-center space-x-2">
              <RefreshCw className="w-5 h-5 text-green-400" />
              <span className="text-white font-semibold">{filteredProfiles.length} Matches</span>
            </div>
          </div>
        </motion.div>

        {/* Profiles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfiles.map((profile, index) => (
            <motion.div
              key={profile.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-black/30 backdrop-blur-sm border-white/10 hover:border-white/20 transition-all duration-300 h-full">
                <CardContent className="p-6">
                  {/* Profile Header */}
                  <div className="flex items-center space-x-4 mb-4">
                    <Avatar className="w-16 h-16 ring-2 ring-cyan-400/20">
                      <AvatarImage src={profile.profile_photo_url || ''} alt={profile.name || ''} />
                      <AvatarFallback>
                        {profile.name?.charAt(0).toUpperCase() || profile.email.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white">{profile.name || 'Anonymous'}</h3>
                      {profile.location && (
                        <div className="flex items-center space-x-1 text-sm text-gray-400">
                          <MapPin className="w-3 h-3" />
                          <span>{profile.location}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Availability */}
                  {profile.availability.length > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center space-x-1 mb-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-400">Available:</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {profile.availability.map((time, idx) => (
                          <Badge key={idx} variant="outline" className="border-white/20 text-gray-300 text-xs">
                            {time}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Skills Offered */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-white mb-2">Skills Offered:</h4>
                    <div className="flex flex-wrap gap-1">
                      {profile.skills_offered.map((skill) => (
                        <Badge key={skill.id} className="bg-green-500/20 text-green-400 border-green-400/30 text-xs">
                          {skill.skill_name}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Skills Wanted */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-white mb-2">Skills Wanted:</h4>
                    <div className="flex flex-wrap gap-1">
                      {profile.skills_wanted.map((skill) => (
                        <Badge key={skill.id} className="bg-blue-500/20 text-blue-400 border-blue-400/30 text-xs">
                          {skill.skill_name}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Request Swap Button */}
                  <Button
                    onClick={() => handleRequestSwap(profile)}
                    className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700"
                    disabled={profile.skills_offered.length === 0 || profile.skills_wanted.length === 0}
                  >
                    Request Swap
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProfiles.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-white mb-2">No profiles found</h3>
            <p className="text-gray-400">
              {searchQuery ? 'Try adjusting your search terms' : 'No public profiles available yet'}
            </p>
          </motion.div>
        )}

        {/* Swap Request Modal */}
        {selectedProfile && (
          <SwapRequestModal
            isOpen={showRequestModal}
            onClose={() => {
              setShowRequestModal(false);
              setSelectedProfile(null);
            }}
            targetProfile={selectedProfile}
          />
        )}
      </div>
    </div>
  );
}