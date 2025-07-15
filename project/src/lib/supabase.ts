
// import { createClient, type SupabaseClient } from '@supabase/supabase-js';


// const supabaseUrl = "https://aplkeyauhstpfemhjgtw.supabase.co";
// const supabaseAnonKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwbGtleWF1aHN0cGZlbWhqZ3R3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzMDIwNjcsImV4cCI6MjA2Nzg3ODA2N30.UJm3R5PhmwG8--U-9athzw3S_81RTpstUEq_E1wYT10";

// console.log("Supabase URL:", supabaseUrl);
// console.log("Supabase Key:", supabaseAnonKey);

// // ✅ Declare the Supabase client (real or dummy)
// let supabase: SupabaseClient;

// if (!supabaseUrl || !supabaseAnonKey) {
//   console.error('❌ Missing Supabase environment variables. Please connect to Supabase first.');

//   // @ts-ignore - fallback dummy client to avoid crash
//   supabase = {
//     auth: {
//       getSession: () => Promise.resolve({ data: { session: null }, error: null }),
//       onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
//       signUp: () => Promise.resolve({ data: null, error: { message: 'Supabase not connected' } }),
//       signInWithPassword: () => Promise.resolve({ data: null, error: { message: 'Supabase not connected' } }),
//       signOut: () => Promise.resolve({ error: null })
//     },
//     from: () => ({
//       select: () => ({ eq: () => ({ single: () => Promise.resolve({ data: null, error: { message: 'Supabase not connected' } }) }) }),
//       insert: () => ({ select: () => ({ single: () => Promise.resolve({ data: null, error: { message: 'Supabase not connected' } }) }) }),
//       update: () => ({ eq: () => Promise.resolve({ error: { message: 'Supabase not connected' } }) }),
//       delete: () => ({ eq: () => Promise.resolve({ error: { message: 'Supabase not connected' } }) })
//     })
//   };
// } else {
//   supabase = createClient(supabaseUrl, supabaseAnonKey);
// }

// export { supabase };


// // ✅ Database Interfaces

// export interface User {
//   id: string;
//   email: string;
//   name?: string;
//   location?: string;
//   profile_photo_url?: string;
//   availability: string[];
//   is_public: boolean;
//   created_at: string;
//   updated_at: string;
// }

// export interface SkillOffered {
//   id: string;
//   user_id: string;
//   skill_name: string;
//   created_at: string;
// }

// export interface SkillWanted {
//   id: string;
//   user_id: string;
//   skill_name: string;
//   created_at: string;
// }

// export interface SwapRequest {
//   id: string;
//   from_user_id: string;
//   to_user_id: string;
//   offered_skill: string;
//   requested_skill: string;
//   status: 'pending' | 'accepted' | 'rejected' | 'cancelled';
//   created_at: string;
//   updated_at: string;
// }

// export interface UserProfile extends User {
//   skills_offered: SkillOffered[];
//   skills_wanted: SkillWanted[];
// }
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// 🔐 Hardcoded Supabase credentials — safe to expose for public frontend usage
const supabaseUrl = "https://aplkeyauhstpfemhjgtw.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwbGtleWF1aHN0cGZlbWhqZ3R3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzMDIwNjcsImV4cCI6MjA2Nzg3ODA2N30.UJm3R5PhmwG8--U-9athzw3S_81RTpstUEq_E1wYT10";

// ✅ Reusable boolean flag for conditional rendering (e.g., auth screens)
export const SUPABASE_CONNECTED = Boolean(supabaseUrl && supabaseAnonKey);

// ✅ Create and export the Supabase client
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

// ✅ Database Interfaces (unchanged)

export interface User {
  id: string;
  email: string;
  name?: string;
  location?: string;
  profile_photo_url?: string;
  availability: string[];
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface SkillOffered {
  id: string;
  user_id: string;
  skill_name: string;
  created_at: string;
}

export interface SkillWanted {
  id: string;
  user_id: string;
  skill_name: string;
  created_at: string;
}

export interface SwapRequest {
  id: string;
  from_user_id: string;
  to_user_id: string;
  offered_skill: string;
  requested_skill: string;
  status: 'pending' | 'accepted' | 'rejected' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface UserProfile extends User {
  skills_offered: SkillOffered[];
  skills_wanted: SkillWanted[];
}
