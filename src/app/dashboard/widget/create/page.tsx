'use client';
import MaxWidthWrapper from '@/components/MaxWidth';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import apiRequest from '@/lib/apiRequest';
import toast from 'react-hot-toast';
import BannerWidget from '@/components/widgets/BannerWidget';
import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/input';
import { MultiValue } from 'react-select';
import CategoryWidget from '@/components/widgets/CategoryWidget';
import ProductWidget from '@/components/widgets/ProductWidget';

interface WidgetTypeInterface {
  name: string;
  id: number;
}

const CreateWidget = () => {
  const [widgetType, setWidgetType] = useState<WidgetTypeInterface[]>([]);
  const [selectedWidget, setSelectedWidget] = useState<{
    name: string;
    id: number;
  }>();
  const [widgetName, setWidgetName] = useState<string>();

  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  const handleWidgetTypeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const parsedValue: { name: string; id: number } = JSON.parse(
      e.target.value
    );
    setSelectedWidget(parsedValue);
  };

  const handleSubmit = async (
    data: MultiValue<{ value: string; label: string }>
  ) => {
    if (!widgetName || data.length === 0 || !selectedWidget) {
      return toast.error('Please enter all fields');
    }

    const formattedData = data?.map((item) => {
      return {
        id: item.value,
      };
    });

    const body = {
      name: widgetName,
      type: selectedWidget?.id,
      widgetData: formattedData,
    };

    const res = await apiRequest('createNewWidget', body);

    if (res.error) {
      toast.error(res.error?.message);
    }

    toast.success('Widget created successfully');
    goBack();
  };

  const getWidgetTypes = async () => {
    const res = await apiRequest('getWidgetTypeList');

    if (res?.error) {
      toast.error(res.error?.message);
      return;
    }
    setWidgetType(res.data?.data);
  };

  useEffect(() => {
    getWidgetTypes();
  }, []);

  return (
    <MaxWidthWrapper className='text-white'>
      <p className=' text-4xl text-center my-2 font-bold'>Create Widget</p>
      <div>
        <Button variant='link' className='text-white' onClick={goBack}>
          {' '}
          <ArrowLeft className='mr-1' /> Widget
        </Button>
      </div>

      <div className='w-1/3'>
        <select
          className='text-black w-[200px] p-2 rounded-md mt-1'
          onChange={handleWidgetTypeSelect}
        >
          <option value=''>Select Widget Type</option>
          {widgetType.map((item) => (
            <option
              key={item.name}
              value={JSON.stringify({
                name: item.name,
                id: item?.id,
              })}
            >
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div className='my-5'>
        <Label>Name of the new widget</Label>
        <Input
          className='text-black'
          placeholder='Enter widget name'
          onChange={(e) => setWidgetName(e.target.value)}
          value={widgetName}
        />
      </div>

      <div className='mt-10'>
        {selectedWidget?.name === 'banner' && (
          <BannerWidget handleSubmit={handleSubmit} />
        )}

        {selectedWidget?.name === 'category' && (
          <CategoryWidget handleSubmit={handleSubmit} type='category' />
        )}

        {selectedWidget?.name === 'categoryGrid' && (
          <CategoryWidget handleSubmit={handleSubmit} type='categoryGrid' />
        )}

        {selectedWidget?.name === 'productSlider' && (
          <ProductWidget handleSubmit={handleSubmit} />
        )}
      </div>
    </MaxWidthWrapper>
  );
};

export default CreateWidget;
