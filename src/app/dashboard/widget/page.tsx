'use client';
import MaxWidthWrapper from '@/components/MaxWidth';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DataTable } from '@/components/CustomTable';
import apiRequest from '@/lib/apiRequest';
import toast from 'react-hot-toast';

interface WidgetDataInterface {
  id: number;
  name: string;
  type: string;
  total: number;
}

interface AllWidgetResponseInterface {
  id: number;
  name: string;
  WidgetType: {
    id: number;
    name: string;
  };
  widgetData: {
    id: number;
  }[];
}

const Widget = () => {
  const [widgetData, setWidgetData] = useState<WidgetDataInterface[]>([]);
  const router = useRouter();

  const columns = [
    {
      header: 'Id',
      accessorKey: 'id',
    },
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Type',
      accessorKey: 'type',
    },
    {
      header: 'Total Items',
      accessorKey: 'total',
    },
  ];

  const handleCreateNewWidget = () => {
    router.push('/dashboard/widget/create');
  };

  const getWidgetDataList = async () => {
    const res = await apiRequest('getWidgetList');

    if (res.error) {
      toast.error(res?.error?.message);
    }

    const data: WidgetDataInterface[] = res?.data?.data?.map(
      (val: AllWidgetResponseInterface) => {
        return {
          id: val.id,
          name: val.name,
          type: val.WidgetType.name,
          total: val.widgetData.length,
        };
      }
    );

    setWidgetData(data);
  };

  useEffect(() => {
    getWidgetDataList();
  }, []);

  return (
    <MaxWidthWrapper className='text-white'>
      <p className=' text-4xl text-center my-2 font-bold'>Widget</p>
      <div>
        <Button variant='secondary' onClick={handleCreateNewWidget}>
          <Plus /> Widget
        </Button>
      </div>

      <div className='mt-10'>
        <DataTable columns={columns} data={widgetData} />
      </div>
    </MaxWidthWrapper>
  );
};

export default Widget;
