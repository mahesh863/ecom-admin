import React, { useState } from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { Button } from './ui/button';
import { Label } from '@radix-ui/react-label';
import { Input } from './ui/input';

import { ADMIN_ROLES } from '@/constants/roles';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  TAdminCredentialsValidator,
  adminCredentialsValidator,
} from '@/lib/validator/newAdmin.validator';
import { cn } from '@/lib/utils';
import apiRequest from '@/lib/apiRequest';
import toast from 'react-hot-toast';

const CreateNewAdmin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TAdminCredentialsValidator>({
    resolver: zodResolver(adminCredentialsValidator),
  });

  const onSubmit = async (fromData: TAdminCredentialsValidator) => {
    setIsLoading(true);
    const reqBody = fromData;

    const res = await apiRequest('createAdminAccount', reqBody);
    setIsLoading(false);

    if (res?.error) {
      toast.error(res.error?.message);
      return;
    }

    reset();
    toast.success(res.data?.message || 'Admin created successfully');
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline'>Create admin</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>New admin</SheetTitle>
          <SheetDescription>
            Create new admin to manage your store
          </SheetDescription>
        </SheetHeader>
        <div className='grid gap-4 py-4'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='name' className='text-right'>
                Name
              </Label>
              <Input
                id='name'
                placeholder='John Doe'
                {...register('name')}
                className={
                  (cn({
                    'focus-visible:ring-red-500': errors.name,
                  }),
                  'col-span-3')
                }
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4 my-1'>
              <Label htmlFor='username' className='text-right'>
                Email
              </Label>
              <Input
                id='email'
                type='email'
                placeholder='admin@test.com'
                {...register('email')}
                className={
                  (cn({
                    'focus-visible:ring-red-500': errors.email,
                  }),
                  'col-span-3')
                }
              />
            </div>

            <div className='grid grid-cols-4 items-center gap-4 my-1'>
              <Label htmlFor='username' className='text-right'>
                Admin
              </Label>
              <select
                {...register('role')}
                className={
                  (cn({
                    'focus-visible:ring-red-500': errors.role,
                  }),
                  'col-span-3 border  rounded-sm  h-10')
                }
              >
                <option value=''>Select Admin Category</option>
                {ADMIN_ROLES.map((role) => {
                  return (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className='grid grid-cols-4 items-center gap-4 my-1'>
              <Label htmlFor='password' className='text-right'>
                Password
              </Label>
              <Input
                id='password'
                type='password'
                placeholder='Generate Password'
                {...register('password')}
                className={
                  (cn({
                    'focus-visible:ring-red-500': errors.password,
                  }),
                  'col-span-3')
                }
              />
            </div>

            <Button className='float-right' type='submit' disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create'}
            </Button>
          </form>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant='outline'>Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CreateNewAdmin;
