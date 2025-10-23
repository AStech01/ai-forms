// src/app/register/page.tsx
'use client';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/lib/api';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { RegisterRequest } from '@/types/api';
import { useMutation } from '@tanstack/react-query';

export default function RegisterPage() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<RegisterRequest>();

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      router.push('/login');
    },
    onError: (error: any) => {
      alert(error.message || 'Registration failed');
    },
  });

  const onSubmit = (data: RegisterRequest) => {
    mutation.mutate(data);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Register</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Name" {...register('name')} />
        <Input label="Email" type="email" {...register('email', { required: true })} />
        <Input label="Password" type="password" {...register('password', { required: true })} />
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? 'Registering...' : 'Register'}
        </Button>
      </form>
    </div>
  );
}