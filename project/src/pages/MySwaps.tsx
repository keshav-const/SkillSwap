import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { supabase, SwapRequest } from '@/lib/supabase';
import { toast } from 'sonner';
import { Check, X, Clock, RefreshCw, Send, Inbox } from 'lucide-react';
import { format } from 'date-fns';
import { SUPABASE_CONNECTED } from '../lib/supabase';
interface SwapRequestWithUsers extends SwapRequest {
  from_user: {
    id: string;
    name: string;
    email: string;
    profile_photo_url: string;
  };
  to_user: {
    id: string;
    name: string;
    email: string;
    profile_photo_url: string;
  };
}

export function MySwaps() {
  const { user } = useAuth();
  const [sentRequests, setSentRequests] = useState<SwapRequestWithUsers[]>([]);
  const [receivedRequests, setReceivedRequests] = useState<SwapRequestWithUsers[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSwapRequests();
  }, [user]);

  const loadSwapRequests = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      // Load sent requests
      const { data: sentData, error: sentError } = await supabase
        .from('swap_requests')
        .select(`
          *,
          to_user:users!swap_requests_to_user_id_fkey (
            id, name, email, profile_photo_url
          )
        `)
        .eq('from_user_id', user!.id)
        .order('created_at', { ascending: false });

      if (sentError) throw sentError;

      // Load received requests
      const { data: receivedData, error: receivedError } = await supabase
        .from('swap_requests')
        .select(`
          *,
          from_user:users!swap_requests_from_user_id_fkey (
            id, name, email, profile_photo_url
          )
        `)
        .eq('to_user_id', user!.id)
        .order('created_at', { ascending: false });

      if (receivedError) throw receivedError;

      setSentRequests(sentData || []);
      setReceivedRequests(receivedData || []);
    } catch (error: any) {
      console.error('Error loading swap requests:', error);
      toast.error('Error loading swap requests: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateRequestStatus = async (requestId: string, status: 'accepted' | 'rejected' | 'cancelled') => {
    try {
      const { error } = await supabase
        .from('swap_requests')
        .update({ status })
        .eq('id', requestId);

      if (error) throw error;

      // Reload requests
      await loadSwapRequests();
      
      const statusMessages = {
        accepted: 'Request accepted!',
        rejected: 'Request rejected',
        cancelled: 'Request cancelled'
      };
      
      toast.success(statusMessages[status]);
    } catch (error: any) {
      toast.error('Error updating request: ' + error.message);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30';
      case 'accepted':
        return 'bg-green-500/20 text-green-400 border-green-400/30';
      case 'rejected':
        return 'bg-red-500/20 text-red-400 border-red-400/30';
      case 'cancelled':
        return 'bg-gray-500/20 text-gray-400 border-gray-400/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-400/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'accepted':
        return <Check className="w-4 h-4" />;
      case 'rejected':
        return <X className="w-4 h-4" />;
      case 'cancelled':
        return <X className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-black pt-20 flex items-center justify-center">
        <div className="text-white">
          {!SUPABASE_CONNECTED ? 
            'Please connect to Supabase to view your swaps' : 
            'Loading swap requests...'
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
            My <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Swaps</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Manage your skill exchange requests and track your learning journey.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Tabs defaultValue="received" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-black/30 border-white/10">
              <TabsTrigger value="received" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
                <Inbox className="w-4 h-4 mr-2" />
                Received ({receivedRequests.length})
              </TabsTrigger>
              <TabsTrigger value="sent" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
                <Send className="w-4 h-4 mr-2" />
                Sent ({sentRequests.length})
              </TabsTrigger>
            </TabsList>

            {/* Received Requests */}
            <TabsContent value="received" className="space-y-4">
              {receivedRequests.length === 0 ? (
                <Card className="bg-black/30 backdrop-blur-sm border-white/10">
                  <CardContent className="p-8 text-center">
                    <div className="text-6xl mb-4">📥</div>
                    <h3 className="text-xl font-bold text-white mb-2">No requests received</h3>
                    <p className="text-gray-400">When others request to swap skills with you, they'll appear here.</p>
                  </CardContent>
                </Card>
              ) : (
                receivedRequests.map((request, index) => (
                  <motion.div
                    key={request.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="bg-black/30 backdrop-blur-sm border-white/10 hover:border-white/20 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4 flex-1">
                            <Avatar className="w-12 h-12 ring-2 ring-cyan-400/20">
                              <AvatarImage src={request.from_user.profile_photo_url} alt={request.from_user.name} />
                              <AvatarFallback>
                                {request.from_user.name?.charAt(0).toUpperCase() || request.from_user.email.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <h4 className="font-semibold text-white mb-1">
                                {request.from_user.name || 'Anonymous'} wants to swap skills
                              </h4>
                              <div className="flex items-center space-x-4 mb-3">
                                <div className="text-center">
                                  <div className="text-xs text-gray-400">They offer</div>
                                  <Badge className="bg-green-500/20 text-green-400 border-green-400/30">
                                    {request.offered_skill}
                                  </Badge>
                                </div>
                                <RefreshCw className="w-4 h-4 text-purple-400" />
                                <div className="text-center">
                                  <div className="text-xs text-gray-400">They want</div>
                                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-400/30">
                                    {request.requested_skill}
                                  </Badge>
                                </div>
                              </div>
                              <p className="text-xs text-gray-500">
                                {format(new Date(request.created_at), 'MMM d, yyyy at h:mm a')}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getStatusColor(request.status)}>
                              {getStatusIcon(request.status)}
                              <span className="ml-1 capitalize">{request.status}</span>
                            </Badge>
                          </div>
                        </div>
                        
                        {request.status === 'pending' && (
                          <div className="flex space-x-2 mt-4">
                            <Button
                              onClick={() => updateRequestStatus(request.id, 'accepted')}
                              className="flex-1 bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-400/30"
                            >
                              <Check className="w-4 h-4 mr-2" />
                              Accept
                            </Button>
                            <Button
                              onClick={() => updateRequestStatus(request.id, 'rejected')}
                              variant="outline"
                              className="flex-1 border-red-400/30 text-red-400 hover:bg-red-500/10"
                            >
                              <X className="w-4 h-4 mr-2" />
                              Reject
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </TabsContent>

            {/* Sent Requests */}
            <TabsContent value="sent" className="space-y-4">
              {sentRequests.length === 0 ? (
                <Card className="bg-black/30 backdrop-blur-sm border-white/10">
                  <CardContent className="p-8 text-center">
                    <div className="text-6xl mb-4">📤</div>
                    <h3 className="text-xl font-bold text-white mb-2">No requests sent</h3>
                    <p className="text-gray-400">Start browsing skills to send your first swap request!</p>
                  </CardContent>
                </Card>
              ) : (
                sentRequests.map((request, index) => (
                  <motion.div
                    key={request.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="bg-black/30 backdrop-blur-sm border-white/10 hover:border-white/20 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4 flex-1">
                            <Avatar className="w-12 h-12 ring-2 ring-purple-400/20">
                              <AvatarImage src={request.to_user.profile_photo_url} alt={request.to_user.name} />
                              <AvatarFallback>
                                {request.to_user.name?.charAt(0).toUpperCase() || request.to_user.email.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <h4 className="font-semibold text-white mb-1">
                                Request to {request.to_user.name || 'Anonymous'}
                              </h4>
                              <div className="flex items-center space-x-4 mb-3">
                                <div className="text-center">
                                  <div className="text-xs text-gray-400">You offer</div>
                                  <Badge className="bg-green-500/20 text-green-400 border-green-400/30">
                                    {request.offered_skill}
                                  </Badge>
                                </div>
                                <RefreshCw className="w-4 h-4 text-purple-400" />
                                <div className="text-center">
                                  <div className="text-xs text-gray-400">You want</div>
                                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-400/30">
                                    {request.requested_skill}
                                  </Badge>
                                </div>
                              </div>
                              <p className="text-xs text-gray-500">
                                {format(new Date(request.created_at), 'MMM d, yyyy at h:mm a')}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getStatusColor(request.status)}>
                              {getStatusIcon(request.status)}
                              <span className="ml-1 capitalize">{request.status}</span>
                            </Badge>
                          </div>
                        </div>
                        
                        {request.status === 'pending' && (
                          <div className="mt-4">
                            <Button
                              onClick={() => updateRequestStatus(request.id, 'cancelled')}
                              variant="outline"
                              className="border-red-400/30 text-red-400 hover:bg-red-500/10"
                            >
                              <X className="w-4 h-4 mr-2" />
                              Cancel Request
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}