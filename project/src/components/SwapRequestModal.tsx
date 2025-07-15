import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuth } from '@/hooks/useAuth';
import { supabase, UserProfile, SkillOffered, SkillWanted } from '@/lib/supabase';
import { toast } from 'sonner';
import { RefreshCw } from 'lucide-react';

interface SwapRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetProfile: UserProfile;
}

export function SwapRequestModal({ isOpen, onClose, targetProfile }: SwapRequestModalProps) {
  const { user } = useAuth();
  const [mySkills, setMySkills] = useState<SkillOffered[]>([]);
  const [selectedMySkill, setSelectedMySkill] = useState<string>('');
  const [selectedTargetSkill, setSelectedTargetSkill] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen && user) {
      loadMySkills();
    }
  }, [isOpen, user]);

  const loadMySkills = async () => {
    if (!user) {
      toast.error('User not authenticated');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('skills_offered')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      setMySkills(data || []);
    } catch (error: any) {
      toast.error('Error loading your skills: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      toast.error('User not authenticated');
      return;
    }

    if (!selectedMySkill || !selectedTargetSkill) {
      toast.error('Please select both skills');
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('swap_requests')
        .insert({
          from_user_id: user.id,
          to_user_id: targetProfile.id,
          offered_skill: selectedMySkill,
          requested_skill: selectedTargetSkill,
          status: 'pending',
        });

      if (error) throw error;
      toast.success('Swap request sent successfully!');
      onClose();
    } catch (error: any) {
      toast.error('Error sending request: ' + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Don't render the modal if user is not authenticated
  if (!user) {
    return null;
  }
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black/90 backdrop-blur-xl border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Request Skill Swap with {targetProfile.name || 'Anonymous'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* My Skills */}
          <div>
            <Label className="text-white mb-2 block">I will teach:</Label>
            <Select value={selectedMySkill} onValueChange={setSelectedMySkill}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Select a skill you offer" />
              </SelectTrigger>
              <SelectContent className="bg-black/90 backdrop-blur-xl border-white/10">
                {mySkills.map((skill) => (
                  <SelectItem key={skill.id} value={skill.skill_name} className="text-white focus:bg-white/10">
                    {skill.skill_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {mySkills.length === 0 && !loading && (
              <p className="text-sm text-gray-400 mt-1">
                You haven't added any skills yet. Go to your profile to add skills.
              </p>
            )}
            {loading && (
              <p className="text-sm text-gray-400 mt-1">
                Loading your skills...
              </p>
            )}
          </div>

          {/* Target Skills */}
          <div>
            <Label className="text-white mb-2 block">I want to learn:</Label>
            <Select value={selectedTargetSkill} onValueChange={setSelectedTargetSkill}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Select a skill they offer" />
              </SelectTrigger>
              <SelectContent className="bg-black/90 backdrop-blur-xl border-white/10">
                {targetProfile.skills_offered.map((skill) => (
                  <SelectItem key={skill.id} value={skill.skill_name} className="text-white focus:bg-white/10">
                    {skill.skill_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Preview */}
          {selectedMySkill && selectedTargetSkill && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg p-4 border border-cyan-400/30"
            >
              <div className="flex items-center justify-center space-x-4">
                <div className="text-center">
                  <div className="text-sm text-gray-400">You teach</div>
                  <div className="font-semibold text-cyan-400">{selectedMySkill}</div>
                </div>
                <RefreshCw className="w-5 h-5 text-purple-400" />
                <div className="text-center">
                  <div className="text-sm text-gray-400">You learn</div>
                  <div className="font-semibold text-purple-400">{selectedTargetSkill}</div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Actions */}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-white/20 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!selectedMySkill || !selectedTargetSkill || submitting}
              className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700"
            >
              {submitting ? 'Sending...' : 'Send Request'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}