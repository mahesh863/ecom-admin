'use client';
import CreateNewCompany from '@/components/CreateNewCompany';
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

const Page = () => {
  const [companyDataInactive, setCompanyDataInactive] = useState([]);
  const [companyDataActive, setCompanyDataActive] = useState([]);

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
                  toggleCompanyVisibility(row.original?.id, false);
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
                  toggleCompanyVisibility(row.original?.id, true);
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

  const toggleCompanyVisibility = async (id: number, isPublic: boolean) => {
    const body = {
      companyIds: [id],
      visibility: isPublic,
    };

    const res = await apiRequest('toggleCompanyVisibility', body);

    if (res.error) {
      toast.error(res.error?.message);
      return;
    }

    toast.success(res.data?.message);
    getCompanyData();
  };

  const getCompanyData = async () => {
    const res = await apiRequest('getAllCompany');

    if (res.error) {
      toast.error(res.error?.message);
      return;
    }

    if (res.data) {
      const activeCompany = res.data?.data?.filter(
        (Company: any) => Company?.isPublic === true
      );
      const inactiveCompany = res.data?.data?.filter(
        (Company: any) => Company?.isPublic === false
      );

      console.log();

      setCompanyDataActive(activeCompany);
      setCompanyDataInactive(inactiveCompany);
    }
  };

  useEffect(() => {
    getCompanyData();
  }, []);

  return (
    <MaxWidthWrapper>
      <p className='text-white text-4xl text-center my-2 font-bold'>
        Companies
      </p>

      <CreateNewCompany />

      <div className='text-white mt-2'>
        <p className='text-2xl my-3'>Inactive Companies</p>
        <DataTable columns={inActiveHeaders} data={companyDataInactive} />
      </div>

      <div className='text-white mt-2'>
        <p className='text-2xl my-3'>Active Companies</p>
        <DataTable columns={activeHeaders} data={companyDataActive} />
      </div>
    </MaxWidthWrapper>
  );
};

export default Page;
