// // // src/app/layout.tsx

// // import './globals.css';
// // import { useAuthStore } from '@/store/auth';
// // // import { useEffect } from 'react';
// // import { Navbar } from '@/components/Navbar';
// // import { useEffect } from 'react';

// // export default function RootLayout({ children }: { children: React.ReactNode }) {
// //   const fetchUser = useAuthStore((state) => state.fetchUser);

// //   useEffect(() => {
// //     const token = localStorage.getItem('token');
// //     if (token) {
// //       fetchUser();
// //     }
// //   }, [fetchUser]);

// //   return (
// //     <html lang="en">
// //       <body className="min-h-screen bg-gray-50">
// //         <Navbar />
// //         <main className="container mx-auto p-4">{children}</main>
// //       </body>
// //     </html>
// //   );
// // }

// // src/app/layout.tsx

// // import './globals.css';
// // import { Navbar } from '@/components/Navbar';

// // export default function RootLayout({ children }: { children: React.ReactNode }) {
// //   return (
// //     <html lang="en">
// //       <body className="min-h-screen bg-gray-50">
// //         <Navbar />
// //         <main className="container mx-auto p-4">{children}</main>
// //       </body>
// //     </html>
// //   );
// // }

// // src/app/layout.tsx
// 'use client';

// import './globals.css';
// import { useAuthStore } from '@/store/auth';
// import { useEffect } from 'react';
// import { Navbar } from '@/components/Navbar';

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   const fetchUser = useAuthStore((state) => state.fetchUser);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       fetchUser();
//     }
//   }, [fetchUser]);

//   return (
//     <html lang="en">
//       <body className="min-h-screen bg-gray-50">
//         <Navbar />
//         <main className="container mx-auto p-4">{children}</main>
//       </body>
//     </html>
//   );
// }
// 'use client';

// import './globals.css';
// import { useAuthStore } from '@/store/auth';
// import { useEffect } from 'react';
// import { Navbar } from '@/components/Navbar';
// import Providers from './providers'; // 👈 Import the provider

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   const fetchUser = useAuthStore((state) => state.fetchUser);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       fetchUser();
//     }
//   }, [fetchUser]);

//   return (
//     <html lang="en">
//       <body className="min-h-screen bg-gray-50">
//         <Providers>
//           <Navbar />
//           <main className="container mx-auto p-4">{children}</main>
//         </Providers>
//       </body>
//     </html>
//   );
// }
// 'use client';

// import './globals.css';
// import { useAuthStore } from '@/store/auth';
// import { useEffect } from 'react';
// import { Navbar } from '@/components/Navbar';
// import Providers from './providers';
// import { setAuthToken } from '@/lib/api';  // Import this

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   const fetchUser = useAuthStore((state) => state.fetchUser);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       setAuthToken(token);  // Set token in Axios headers
//       fetchUser();          // Now fetch user with token attached
//     }
//   }, [fetchUser]);

//   return (
//     <html lang="en">
//       <body className="min-h-screen bg-gray-50">
//         <Providers>
//           <Navbar />
//           <main className="container mx-auto p-4">{children}</main>
//         </Providers>
//       </body>
//     </html>
//   );
// }

'use client';

import './globals.css';
import { useAuthStore } from '@/store/auth';
import { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import Providers from './providers';
import { setAuthToken } from '@/lib/api';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fetchUser = useAuthStore((state) => state.fetchUser);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      fetchUser();
    }
  }, [fetchUser]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <Providers>
          <Navbar />
          <main className="container mx-auto p-4">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
