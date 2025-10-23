// // src/app/login/page.tsx
// 'use client';
// import { useForm } from 'react-hook-form';
// import { useRouter } from 'next/navigation';
// import { useAuthStore } from '@/store/auth';
// import { loginUser } from '@/lib/api';
// import { Input } from '@/components/ui/Input';
// import { Button } from '@/components/ui/Button';
// import { LoginRequest } from '@/types/api';
// import { useMutation } from '@tanstack/react-query';

// export default function LoginPage() {
//   const router = useRouter();
//   const { login } = useAuthStore();
//   const { register, handleSubmit } = useForm<LoginRequest>();

//   const mutation = useMutation({
//     mutationFn: loginUser,
//     onSuccess: (data) => {
//       login(data);
//       router.push('/forms');
//     },
//     onError: (error: any) => {
//       alert(error.message || 'Login failed');
//     },
//   });

//   const onSubmit = (data: LoginRequest) => {
//     mutation.mutate(data);
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10">
//       <h1 className="text-2xl font-bold mb-6">Login</h1>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         <Input label="Email" type="email" {...register('email', { required: true })} />
//         <Input label="Password" type="password" {...register('password', { required: true })} />
//         <Button type="submit" disabled={mutation.isPending}>
//           {mutation.isPending ? 'Logging in...' : 'Login'}
//         </Button>
//       </form>
//     </div>
//   );
// }

'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import { loginUser } from '@/lib/api';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { LoginRequest } from '@/types/api';
import { useMutation } from '@tanstack/react-query';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const { register, handleSubmit } = useForm<LoginRequest>();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      login(data);
      router.push('/forms');
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : 'Login failed';
      alert(message);
    },
  });

  const onSubmit = (data: LoginRequest) => {
    mutation.mutate(data);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Email" type="email" {...register('email', { required: true })} />
        <Input label="Password" type="password" {...register('password', { required: true })} />
        <Button type="submit" disabled={mutation.status === 'pending'}>
          {mutation.status === 'pending' ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </div>
  );
}
