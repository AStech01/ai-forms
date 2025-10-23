// // src/components/Navbar.tsx
// import Link from 'next/link';
// import { useAuthStore } from '@/store/auth';
// import { Button } from './ui/Button';
// import { LogOut, User } from 'lucide-react';

// export const Navbar = () => {
//   const { isAuthenticated, user, logout } = useAuthStore();

//   return (
//     <nav className="bg-white shadow-md p-4">
//       <div className="container mx-auto flex justify-between items-center">
//         <Link href="/" className="text-xl font-bold">
//           FormApp
//         </Link>
//         <div className="flex gap-4 items-center">
//           {isAuthenticated ? (
//             <>
//               <Link href="/forms" className="text-blue-600 hover:underline">
//                 My Forms
//               </Link>
//               <span className="flex items-center gap-2">
//                 <User size={20} />
//                 {user?.email}
//               </span>
//               <Button variant="danger" onClick={logout}>
//                 <LogOut size={16} className="mr-2" />
//                 Logout
//               </Button>
//             </>
//           ) : (
//             <>
//               <Link href="/login" className="text-blue-600 hover:underline">
//                 Login
//               </Link>
//               <Link href="/register">
//                 <Button>Register</Button>
//               </Link>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// src/components/Navbar.tsx
'use client';

import Link from 'next/link';
import { useAuthStore } from '@/store/auth';
import { useEffect } from 'react';
import { Button } from './ui/Button';
import { LogOut, User } from 'lucide-react';

export const Navbar = () => {
  const { isAuthenticated, user, logout, fetchUser } = useAuthStore();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUser();
    }
  }, [fetchUser]);

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          FormApp
        </Link>
        <div className="flex gap-4 items-center">
          {isAuthenticated ? (
            <>
              <Link href="/forms" className="text-blue-600 hover:underline">
                My Forms
              </Link>
              <span className="flex items-center gap-2">
                <User size={20} />
                {user?.email}
              </span>
              <Button variant="danger" onClick={logout}>
                <LogOut size={16} className="mr-2" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
              <Link href="/register">
                <Button>Register</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};