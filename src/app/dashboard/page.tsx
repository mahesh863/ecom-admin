'use client';
import MaxWidthWrapper from '@/components/MaxWidth';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import React, { Fragment, useEffect, useState } from 'react';

const Page = () => {
  const [orderWidgets, setOrderWidgets] = useState<{
    total: number;
    pending: number;
    completed: number;
    [key: string]: number;
  }>({
    total: 0,
    pending: 0,
    completed: 0,
  });

  const [adminWidgets, setAdminWidgets] = useState<{
    subAdmin: number;
    admin: number;
    superAdmin: number;
    [key: string]: number;
  }>({
    subAdmin: 2,
    admin: 12,
    superAdmin: 1,
  });

  useEffect(() => {
    setOrderWidgets({
      total: 30,
      pending: 20,
      completed: 10,
    });

    setAdminWidgets({
      subAdmin: 3,
      admin: 2,
      superAdmin: 1,
    });
  }, []);

  return (
    <MaxWidthWrapper>
      <div className='text-white'>
        <div>
          <h3 className='text-5xl my-2 '>Orders</h3>
          <div className='grid grid-cols-6 gap-2  h-[200px] '>
            {Object.keys(orderWidgets).map((val) => {
              return (
                <div className='h-full w-full col-span-2' key={val}>
                  <Card className='h-full bg-dark text-white'>
                    <CardTitle className='text-center mt-2 capitalize'>
                      {val}
                    </CardTitle>
                    <CardContent className='w-full h-full flex items-center justify-center'>
                      <p className='text-6xl text-center font-extrabold'>
                        {orderWidgets[val]}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className='text-5xl my-2 '>Admins</h3>
          <div className='grid grid-cols-6 gap-2  h-[200px] '>
            {Object.keys(adminWidgets).map((val) => {
              return (
                <div className='h-full w-full col-span-2' key={val}>
                  <Card className='h-full bg-dark text-white'>
                    <CardTitle className='text-center mt-2 capitalize'>
                      {val}
                    </CardTitle>
                    <CardContent className='w-full h-full flex items-center justify-center'>
                      <p className='text-6xl text-center font-extrabold'>
                        {adminWidgets[val]}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Page;
