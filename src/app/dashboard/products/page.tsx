'use client';
import CreateNewProduct from '@/components/CreateNewProduct';
import { DataTable } from '@/components/CustomTable';
import MaxWidthWrapper from '@/components/MaxWidth';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import apiRequest from '@/lib/apiRequest';
import { MoreHorizontal } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const Product = () => {
  const [productDataActive, setProductDataActive] = useState([]);
  const [productDataInactive, setProductDataInactive] = useState([]);

  const baseHeader = [
    {
      accessorKey: 'id',
      header: 'ID',
    },

    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'stock',
      header: 'Stock',
    },
    {
      accessorKey: 'price',
      header: 'Price',
    },
    {
      accessorKey: 'sold',
      header: 'Sold',
    },
  ];

  const activeHeaders = [
    ...baseHeader,
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
                  toggleProductVisibility(row.original?.id, false);
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
    ...baseHeader,
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
                  toggleProductVisibility(row.original?.id, true);
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

  const toggleProductVisibility = async (id: number, isPublic: boolean) => {
    const body = {
      productIds: [id],
      visibility: isPublic,
    };

    const res = await apiRequest('toggleProductVisibility', body);

    if (res.error) {
      toast.error(res.error?.message);
      return;
    }

    toast.success(res.data?.message);
    getProductDetails();
  };

  const getProductDetails = async () => {
    const res = await apiRequest('getAdminProductData');

    if (res?.error) {
      toast.error(res.error?.message);
      return;
    }

    const activeProducts = res.data?.data?.filter(
      (product: any) => product?.isPublic === true
    );
    const inActiveData = res.data?.data?.filter(
      (product: any) => product?.isPublic === false
    );

    setProductDataActive(activeProducts);
    setProductDataInactive(inActiveData);
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  return (
    <MaxWidthWrapper>
      <p className='text-white text-4xl text-center my-2 font-bold'>Products</p>

      <CreateNewProduct />

      <div className='text-white mt-2'>
        <p className='text-2xl my-3'>Active Products</p>
        <DataTable columns={activeHeaders} data={productDataActive} />
      </div>

      <div className='text-white mt-2'>
        <p className='text-2xl my-3'>Inactive Products</p>
        <DataTable columns={inActiveHeaders} data={productDataInactive} />
      </div>
    </MaxWidthWrapper>
  );
};

export default Product;
