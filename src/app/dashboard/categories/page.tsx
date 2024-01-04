'use client';
import CreateNewCategory from '@/components/CreateNewCategory';
import { DataTable } from '@/components/CustomTable';
import MaxWidthWrapper from '@/components/MaxWidth';
import { Button } from '@/components/ui/button';
import apiRequest from '@/lib/apiRequest';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const Category = () => {
  const [categoryDataInactive, setCategoryDataInactive] = useState([]);
  const [categoryDataActive, setCategoryDataActive] = useState([]);

  const activeHeaders = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'image',
      header: 'Image',
      cell: ({ row }: any) => {
        return (
          <>
            {row?.original?.image ? (
              <img
                src={row?.original?.image}
                alt={row.name}
                className='w-10 h-10 rounded-full'
              />
            ) : (
              <div className=''> No Image</div>
            )}
          </>
        );
      },
    },

    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'action',
      header: 'Action',
      cell: ({ row }: any) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem
                onClick={() => {
                  toggleCategoryVisibility(row.original?.id, false);
                }}
              >
                Make it Private
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  const inActiveHeaders = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'image',
      header: 'Image',
      cell: ({ row }: any) => {
        return (
          <>
            {row?.original?.image ? (
              <img
                src={row?.original?.image}
                alt={row.name}
                className='w-10 h-10 rounded-full'
              />
            ) : (
              <div className=''> No Image</div>
            )}
          </>
        );
      },
    },

    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'action',
      header: 'Action',
      cell: ({ row }: any) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem
                onClick={() => {
                  toggleCategoryVisibility(row.original?.id, true);
                }}
              >
                Make it Public
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const toggleCategoryVisibility = async (id: number, isPublic: boolean) => {
    const body = {
      categoryIds: [id],
      visibility: isPublic,
    };

    const res = await apiRequest('toggleCategoryVisibility', body);

    if (res.error) {
      toast.error(res.error?.message);
      return;
    }

    toast.success(res.data?.message);
    getCategoryData();
  };

  const getCategoryData = async () => {
    const res = await apiRequest('getAllCategory');

    if (res.error) {
      toast.error(res.error?.message);
      return;
    }

    if (res.data) {
      const activeCategory = res.data?.categories?.filter(
        (category: any) => category?.isPublic === true
      );
      const inactiveCategory = res.data?.categories?.filter(
        (category: any) => category?.isPublic === false
      );

      console.log();

      setCategoryDataActive(activeCategory);
      setCategoryDataInactive(inactiveCategory);
    }
  };

  useEffect(() => {
    getCategoryData();
  }, []);

  return (
    <MaxWidthWrapper>
      <p className='text-white text-4xl text-center my-2 font-bold'>
        Categories
      </p>
      <CreateNewCategory />

      <div className='text-white mt-2'>
        <p className='text-2xl my-3'>Inactive Categories</p>
        <DataTable columns={inActiveHeaders} data={categoryDataInactive} />
      </div>

      <div className='text-white mt-2'>
        <p className='text-2xl my-3'>Active Categories</p>
        <DataTable columns={activeHeaders} data={categoryDataActive} />
      </div>
    </MaxWidthWrapper>
  );
};

export default Category;
