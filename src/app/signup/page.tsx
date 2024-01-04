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
import { cn } from '@/lib/utils';
import {
  TSignUpCredentialsValidator,
  signUpCredentialsValidator,
} from '@/lib/validator/signup.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@radix-ui/react-label';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignUpCredentialsValidator>({
    resolver: zodResolver(signUpCredentialsValidator),
  });

  const onSubmit = ({ email, password, name }: TSignUpCredentialsValidator) => {
    console.log(email, password, name);
  };

  return (
    <div className=' h-screen flex items-center justify-center '>
      <Card className='w-[300px]'>
        <CardHeader>
          <CardTitle className='text-center'>Sign up</CardTitle>
          <CardDescription className='text-center'>
            Create your admin account
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
              <Label htmlFor='name'>Name</Label>
              <Input
                type='text'
                {...register('name')}
                placeholder='John Doe'
                className={cn({
                  'focus-visible:ring-red-500': errors.name,
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

            <Button className='w-full'>Sign up</Button>
          </form>
        </CardContent>
        <CardFooter>
          <Link href='/signin' className={buttonVariants({ variant: 'link' })}>
            Already have an account? Sign in
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
