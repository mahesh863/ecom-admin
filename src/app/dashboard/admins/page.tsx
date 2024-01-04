'use client';
import AdminOperations from '@/components/CreateNewAdmin';
import { Button } from '@/components/ui/button';
import MaxWidthWrapper from '@/components/MaxWidth';
import React, { use, useEffect, useState } from 'react';
import { DataTable } from '@/components/CustomTable';

import ChangeAdminPosition from '@/components/ChangeAdminPosition';
import apiRequest from '@/lib/apiRequest';
import toast from 'react-hot-toast';

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [adminData, setAdminData] = useState([]);

  const headers = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'role',
      header: 'Role',
    },
  ];

  const getAdminList = async () => {
    const res = await apiRequest('getAllAdminList');
    setIsLoading(false);

    if (res?.error) {
      toast.error(res.error?.error);
      return;
    }

    setAdminData(res.data?.data);
  };

  useEffect(() => {
    getAdminList();
  }, []);

  return (
    <MaxWidthWrapper>
      <p className='text-white text-4xl text-center my-2 font-bold'>Admins</p>

      <div className='my-4'>
        <AdminOperations />
        <ChangeAdminPosition />
      </div>

      <div className='text-white '>
        <DataTable columns={headers} data={adminData} />
      </div>
    </MaxWidthWrapper>
  );
};

export default Page;
