'use client';
import { DataTable } from '@/components/CustomTable';
import MaxWidthWrapper from '@/components/MaxWidth';
import { Button } from '@/components/ui/button';
import apiRequest from '@/lib/apiRequest';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const CategoryWidget = () => {
  const [categoryData, setCategoryData] = useState([]);
  const router = useRouter();
  const columns = [
    {
      header: 'Id',
      accessorKey: 'id',
    },
    {
      accessorKey: 'image',
      header: 'Image',
      cell: ({ row }: any) => {
        return (
          <img
            src={row?.original?.image}
            alt='banner'
            className='w-20 object-cover rounded-sm h-10'
          />
        );
      },
    },

    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Header',
      accessorKey: 'header',
    },
    {
      header: 'Sub Header',
      accessorKey: 'subHeader',
    },
    {
      header: 'CTA',
      accessorKey: 'cta',
    },
  ];

  const handleCreate = () => {
    router.push('/dashboard/categoryWidget/create');
  };

  const getCategoryWidgetData = async () => {
    const res = await apiRequest('getCategoryWidgetList');

    if (res.error) {
      toast.error(res.error?.message);
      setCategoryData([]);
      return;
    } else {
      setCategoryData(res.data?.data);
    }
  };

  useEffect(() => {
    getCategoryWidgetData();
  }, []);

  return (
    <MaxWidthWrapper className='text-white'>
      <p className=' text-4xl text-center my-2 font-bold'>Category Widget</p>
      <div>
        <Button variant='secondary' onClick={handleCreate}>
          <Plus /> Create
        </Button>
      </div>

      <div className='mt-10'>
        <DataTable columns={columns} data={categoryData} />
      </div>
    </MaxWidthWrapper>
  );
};

export default CategoryWidget;
