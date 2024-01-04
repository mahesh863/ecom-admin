'use client';
import { DataTable } from '@/components/CustomTable';
import MaxWidthWrapper from '@/components/MaxWidth';
import { Button } from '@/components/ui/button';
import apiRequest from '@/lib/apiRequest';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const Banner = () => {
  const [bannerList, setBannerList] = useState([]);
  const router = useRouter();

  const headers = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'imageUrl',
      header: 'Image',
      cell: ({ row }: any) => {
        console.log(row, 'row');

        return (
          <img
            src={row?.original?.imageUrl}
            alt='banner'
            className='w-20 object-cover rounded-sm h-10'
          />
        );
      },
    },

    {
      accessorKey: 'headline',
      header: 'Headline',
    },
    {
      accessorKey: 'cta',
      header: 'CTA',
    },
    {
      accessorKey: 'redirectType',
      header: 'Redirect Type',
    },
    {
      accessorKey: 'redirectDataId',
      header: 'Redirect Data Id',
    },
  ];

  const handleCreateBanner = () => {
    router.push('/dashboard/banner/create');
  };

  const getBannerList = async () => {
    const res = await apiRequest('getBannerListDetails');
    if (res?.error) {
      toast.error(res.error);
      return;
    }
    const bannerList = res?.data?.data;
    setBannerList(bannerList);
  };

  useEffect(() => {
    getBannerList();
  }, []);
  return (
    <MaxWidthWrapper className='text-white'>
      <p className=' text-4xl text-center my-2 font-bold'>Banner</p>
      <div>
        <Button variant='secondary' onClick={handleCreateBanner}>
          <Plus /> Banner
        </Button>
      </div>

      <div className='text-white my-5'>
        <DataTable columns={headers} data={bannerList} />
      </div>
    </MaxWidthWrapper>
  );
};

export default Banner;
