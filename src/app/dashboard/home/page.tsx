'use client';
import MaxWidthWrapper from '@/components/MaxWidth';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

const Home = () => {
  const router = useRouter();

  const handleManageHome = () => {
    router.push('/dashboard/home/create');
  };
  return (
    <MaxWidthWrapper className='text-white'>
      <p className=' text-4xl text-center my-2 font-bold'>Home</p>
      <div>
        <Button variant='secondary' onClick={handleManageHome}>
          {' '}
          <Plus /> Home
        </Button>
      </div>
    </MaxWidthWrapper>
  );
};

export default Home;
