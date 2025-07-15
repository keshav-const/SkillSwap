import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/useAuth';
import { supabase, User as DBUser, SkillOffered, SkillWanted } from '@/lib/supabase';
import { toast } from 'sonner';
import { Plus, X, MapPin, Clock, Globe, Lock } from 'lucide-react';
import { SUPABASE_CONNECTED } from '../lib/supabase'
const availabilityOptions = ['Weekdays', 'Weekends', 'Evenings', 'Mornings', 'Flexible'];

export function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<DBUser | null>(null);
  const [skillsOffered, setSkillsOffered] = useState<SkillOffered[]>([]);
  const [skillsWanted, setSkillsWanted] = useState<SkillWanted[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newOfferedSkill, setNewOfferedSkill] = useState('');
  const [newWantedSkill, setNewWantedSkill] = useState('');

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      // Load user profile
      const { data: profileData, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user!.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        throw profileError;
      }

      if (!profileData) {
        // Create initial profile
        const { data: newProfile, error: createError } = await supabase
          .from('users')
          .insert({
            id: user!.id,
            email: user!.email!,
            name: user!.user_metadata?.full_name || '',
            availability: [],
            is_public: true,
          })
          .select()
          .single();

        if (createError) throw createError;
        setProfile(newProfile);
      } else {
        setProfile(profileData);
      }

      // Load skills offered
      const { data: offeredData, error: offeredError } = await supabase
        .from('skills_offered')
        .select('*')
        .eq('user_id', user!.id);

      if (offeredError) throw offeredError;
      setSkillsOffered(offeredData || []);

      // Load skills wanted
      const { data: wantedData, error: wantedError } = await supabase
        .from('skills_wanted')
        .select('*')
        .eq('user_id', user!.id);

      if (wantedError) throw wantedError;
      setSkillsWanted(wantedData || []);
    } catch (error: any) {
      console.error('Error loading profile:', error);
      toast.error('Error loading profile: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = async () => {
    if (!profile) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('users')
        .update({
          name: profile.name,
          location: profile.location,
          profile_photo_url: profile.profile_photo_url,
          availability: profile.availability,
          is_public: profile.is_public,
        })
        .eq('id', user!.id);

      if (error) throw error;
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      toast.error('Error updating profile: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const addSkillOffered = async () => {
    if (!newOfferedSkill.trim()) return;

    try {
      const { data, error } = await supabase
        .from('skills_offered')
        .insert({
          user_id: user!.id,
          skill_name: newOfferedSkill.trim(),
        })
        .select()
        .single();

      if (error) throw error;
      setSkillsOffered([...skillsOffered, data]);
      setNewOfferedSkill('');
      toast.success('Skill added!');
    } catch (error: any) {
      toast.error('Error adding skill: ' + error.message);
    }
  };

  const removeSkillOffered = async (skillId: string) => {
    try {
      const { error } = await supabase
        .from('skills_offered')
        .delete()
        .eq('id', skillId);

      if (error) throw error;
      setSkillsOffered(skillsOffered.filter(skill => skill.id !== skillId));
      toast.success('Skill removed!');
    } catch (error: any) {
      toast.error('Error removing skill: ' + error.message);
    }
  };

  const addSkillWanted = async () => {
    if (!newWantedSkill.trim()) return;

    try {
      const { data, error } = await supabase
        .from('skills_wanted')
        .insert({
          user_id: user!.id,
          skill_name: newWantedSkill.trim(),
        })
        .select()
        .single();

      if (error) throw error;
      setSkillsWanted([...skillsWanted, data]);
      setNewWantedSkill('');
      toast.success('Skill added!');
    } catch (error: any) {
      toast.error('Error adding skill: ' + error.message);
    }
  };

  const removeSkillWanted = async (skillId: string) => {
    try {
      const { error } = await supabase
        .from('skills_wanted')
        .delete()
        .eq('id', skillId);

      if (error) throw error;
      setSkillsWanted(skillsWanted.filter(skill => skill.id !== skillId));
      toast.success('Skill removed!');
    } catch (error: any) {
      toast.error('Error removing skill: ' + error.message);
    }
  };

  const toggleAvailability = (option: string) => {
    if (!profile) return;
    
    const newAvailability = profile.availability.includes(option)
      ? profile.availability.filter(a => a !== option)
      : [...profile.availability, option];
    
    setProfile({ ...profile, availability: newAvailability });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-black pt-20 flex items-center justify-center">
        <div className="text-white">
          {!SUPABASE_CONNECTED ? 
            'Please connect to Supabase to access your profile' : 
            'Loading profile...'
          }
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-black pt-20 flex items-center justify-center">
        <div className="text-white">Error loading profile</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-black pt-20">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-3xl font-bold text-white mb-8">My Profile</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Info */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-black/30 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={profile.profile_photo_url || ''} alt={profile.name || ''} />
                      <AvatarFallback className="text-2xl">
                        {profile.name?.charAt(0).toUpperCase() || profile.email.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Label htmlFor="photo-url" className="text-white">Profile Photo URL</Label>
                      <Input
                        id="photo-url"
                        value={profile.profile_photo_url || ''}
                        onChange={(e) => setProfile({ ...profile, profile_photo_url: e.target.value })}
                        placeholder="https://example.com/photo.jpg"
                        className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="name" className="text-white">Name</Label>
                    <Input
                      id="name"
                      value={profile.name || ''}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      placeholder="Your full name"
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                    />
                  </div>

                  <div>
                    <Label htmlFor="location" className="text-white">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="location"
                        value={profile.location || ''}
                        onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                        placeholder="City, Country"
                        className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-white mb-3 block">Availability</Label>
                    <div className="flex flex-wrap gap-2">
                      {availabilityOptions.map((option) => (
                        <Badge
                          key={option}
                          variant={profile.availability.includes(option) ? "default" : "outline"}
                          className={`cursor-pointer transition-colors ${
                            profile.availability.includes(option)
                              ? 'bg-cyan-500/20 text-cyan-400 border-cyan-400/30'
                              : 'border-white/20 text-gray-300 hover:bg-white/10'
                          }`}
                          onClick={() => toggleAvailability(option)}
                        >
                          <Clock className="w-3 h-3 mr-1" />
                          {option}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Profile Visibility</Label>
                      <p className="text-sm text-gray-400">
                        {profile.is_public ? 'Your profile is public and visible to others' : 'Your profile is private'}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {profile.is_public ? <Globe className="w-4 h-4 text-green-400" /> : <Lock className="w-4 h-4 text-red-400" />}
                      <Switch
                        checked={profile.is_public}
                        onCheckedChange={(checked) => setProfile({ ...profile, is_public: checked })}
                      />
                    </div>
                  </div>

                  <Button
                    onClick={saveProfile}
                    disabled={saving}
                    className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700"
                  >
                    {saving ? 'Saving...' : 'Save Profile'}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Skills Section */}
            <div className="space-y-6">
              {/* Skills Offered */}
              <Card className="bg-black/30 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Skills I Offer</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex space-x-2">
                    <Input
                      value={newOfferedSkill}
                      onChange={(e) => setNewOfferedSkill(e.target.value)}
                      placeholder="Add a skill you can teach"
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                      onKeyPress={(e) => e.key === 'Enter' && addSkillOffered()}
                    />
                    <Button
                      onClick={addSkillOffered}
                      size="icon"
                      className="bg-green-500/20 text-green-400 hover:bg-green-500/30"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {skillsOffered.map((skill) => (
                      <div key={skill.id} className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                        <span className="text-white">{skill.skill_name}</span>
                        <Button
                          onClick={() => removeSkillOffered(skill.id)}
                          size="icon"
                          variant="ghost"
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Skills Wanted */}
              <Card className="bg-black/30 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Skills I Want</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex space-x-2">
                    <Input
                      value={newWantedSkill}
                      onChange={(e) => setNewWantedSkill(e.target.value)}
                      placeholder="Add a skill you want to learn"
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                      onKeyPress={(e) => e.key === 'Enter' && addSkillWanted()}
                    />
                    <Button
                      onClick={addSkillWanted}
                      size="icon"
                      className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {skillsWanted.map((skill) => (
                      <div key={skill.id} className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                        <span className="text-white">{skill.skill_name}</span>
                        <Button
                          onClick={() => removeSkillWanted(skill.id)}
                          size="icon"
                          variant="ghost"
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}