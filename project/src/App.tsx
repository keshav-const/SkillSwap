// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { ThemeProvider } from '@/components/theme-provider';
// import { Toaster } from '@/components/ui/sonner';
// import { Navigation } from '@/components/layout/Navigation';
// import { AuthForm } from '@/components/auth/AuthForm';
// import { Home } from '@/pages/Home';
// import { Profile } from '@/pages/Profile';
// import { BrowseSkills } from '@/pages/BrowseSkills';
// import { MySwaps } from '@/pages/MySwaps';
// import { useAuth } from '@/hooks/useAuth';
// import { SUPABASE_CONNECTED } from '@/lib/supabase';
// function App() {
//   const { user, loading } = useAuth();

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-black flex items-center justify-center">
//         <div className="text-white">
//           {!SUPABASE_CONNECTED ? 
//             'Please connect to Supabase to continue' : 
//             'Loading...'
//           }
//         </div>
//       </div>
//     );
//   }

//   if (!user) {
//     return (
//       <ThemeProvider defaultTheme="dark" storageKey="skillswap-theme">
//         <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-black flex items-center justify-center">
//           {!SUPABASE_CONNECTED ? (
//             <div className="text-center">
//               <h1 className="text-2xl font-bold text-white mb-4">Welcome to SkillSwap</h1>
//               <p className="text-gray-400 mb-6">Please connect to Supabase to get started</p>
//               <div className="bg-yellow-500/20 border border-yellow-400/30 rounded-lg p-4 max-w-md">
//                 <p className="text-yellow-400 text-sm">
//                   Click the "Connect to Supabase" button in the top right corner to set up your database connection.
//                 </p>
//               </div>
//             </div>
//           ) : (
//             <AuthForm />
//           )}
//         </div>
//         <Toaster />
//       </ThemeProvider>
//     );
//   }

//   return (
//     <ThemeProvider defaultTheme="dark" storageKey="skillswap-theme">
//       <Router>
//         <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-black">
//           <Navigation />
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/profile" element={<Profile />} />
//             <Route path="/browse" element={<BrowseSkills />} />
//             <Route path="/swaps" element={<MySwaps />} />
//           </Routes>
//           <Toaster />
//         </div>
//       </Router>
//     </ThemeProvider>
//   );
// }

// export default App;
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { Navigation } from '@/components/layout/Navigation';
import { AuthForm } from '@/components/auth/AuthForm';
import { Home } from '@/pages/Home';
import { Profile } from '@/pages/Profile';
import { BrowseSkills } from '@/pages/BrowseSkills';
import { MySwaps } from '@/pages/MySwaps';
import { useAuth } from '@/hooks/useAuth';
import { SUPABASE_CONNECTED } from '@/lib/supabase';

function App() {
  const { user, loading } = useAuth();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="skillswap-theme">
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-purple-900/20 to-black text-white outline outline-red-500">

      <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-purple-900/20 to-black text-white">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            {!SUPABASE_CONNECTED ? 'Please connect to Supabase to continue' : 'Loading...'}
          </div>
        ) : !user ? (
          <div className="flex items-center justify-center h-full">
            {!SUPABASE_CONNECTED ? (
              <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Welcome to SkillSwap</h1>
                <p className="text-gray-400 mb-6">Please connect to Supabase to get started</p>
                <div className="bg-yellow-500/20 border border-yellow-400/30 rounded-lg p-4 max-w-md">
                  <p className="text-yellow-400 text-sm">
                    Click the "Connect to Supabase" button in the top right corner to set up your database connection.
                  </p>
                </div>
              </div>
            ) : (
              <AuthForm />
            )}
          </div>
        ) : (
          <Router>
            <Navigation />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/browse" element={<BrowseSkills />} />
              <Route path="/swaps" element={<MySwaps />} />
            </Routes>
          </Router>
        )}
        <Toaster />
      </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
