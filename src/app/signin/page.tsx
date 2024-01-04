'use client';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import apiRequest from '@/lib/apiRequest';
import { cn } from '@/lib/utils';
import {
  TSignInCredentialsValidator,
  signInCredentialsValidator,
} from '@/lib/validator/signin.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@radix-ui/react-label';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const SignIn = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignInCredentialsValidator>({
    resolver: zodResolver(signInCredentialsValidator),
  });

  const onSubmit = async ({ email, password }: TSignInCredentialsValidator) => {
    const signinBody = {
      email,
      password,
    };
    const res = await apiRequest('signin', signinBody);

    if (res.error) {
      toast.error(res.error?.message);
    } else {
      toast.success('Sign in successful');
      router.push('/dashboard');
    }
  };

  return (
    <div className='h-screen flex items-center justify-center '>
      <Card className='w-[300px]'>
        <CardHeader>
          <CardTitle className='text-center'>Sign in</CardTitle>
          <CardDescription className='text-center'>
            Sign in to your admin account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='py-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                type='email'
                {...register('email')}
                placeholder='a@example.com'
                className={cn({
                  'focus-visible:ring-red-500': errors.email,
                })}
              />
            </div>

            <div className='py-2'>
              <Label htmlFor='password'>Password</Label>
              <Input
                type='password'
                {...register('password')}
                placeholder='Password here'
                className={cn({
                  'focus-visible:ring-red-500': errors.password,
                })}
              />
            </div>

            <Button className='w-full'>Sign in</Button>
          </form>
        </CardContent>
        <CardFooter>
          <Link href='/signup' className={buttonVariants({ variant: 'link' })}>
            Don't have an account? Sign up
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignIn;
