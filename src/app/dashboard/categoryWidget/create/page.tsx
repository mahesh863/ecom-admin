'use client';
import MaxWidthWrapper from '@/components/MaxWidth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import redirectType from '@/constants/typeOptions';
import apiRequest from '@/lib/apiRequest';
import { Label } from '@radix-ui/react-label';
import { ArrowLeft, Plus } from 'lucide-react';
import { redirect, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

interface RedirectDataInterface {
  value: string;
  label: string;
}

const CreateCategoryWidget = () => {
  const [newWidgetData, setNewWidgetData] = useState({
    name: '',
    header: '',
    subHeader: '',
    cta: '',
    type: '',
    redirect: '',
    image: undefined as File | undefined,
  });
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [redirectData, setRedirectData] = useState<RedirectDataInterface[]>([]);
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  const handleDataChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewWidgetData({
      ...newWidgetData,
      [name]: value,
    });

    if (name === 'type') {
      getRedirectData(value);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    setNewWidgetData((prevData) => ({ ...prevData, image: file }));
  };

  const getRedirectData = async (name: string) => {
    let res;

    if (name === 'collection') {
      res = await apiRequest('getCollectionList');
    } else if (name === 'product') {
      res = await apiRequest('getProductList');
    }

    if (res?.error) {
      toast.error(res.error);
      setRedirectData([]);
      return;
    }

    if (res?.data?.data) {
      const formattedData = res.data.data.map(
        (val: { id: string; name: string }) => {
          return {
            value: val.id,
            label: val.name,
          };
        }
      );

      setRedirectData(formattedData);
    } else {
      setRedirectData([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    const formDataToSend = new FormData();
    formDataToSend.append('name', newWidgetData.name);
    formDataToSend.append('header', newWidgetData.header);
    formDataToSend.append('subHeader', newWidgetData.subHeader);
    formDataToSend.append('cta', newWidgetData.cta);
    formDataToSend.append('type', newWidgetData.type);
    formDataToSend.append('redirect', newWidgetData.redirect);
    formDataToSend.append('image', newWidgetData.image as Blob);

    setIsSubmitLoading(true);
    const res = await apiRequest('createNewCategoryWidget', formDataToSend);
    setIsSubmitLoading(false);

    if (res.error) {
      toast.error(res.error?.message);
    } else {
      toast.success(res.data?.message || 'Success');
      goBack();
    }
  };

  return (
    <MaxWidthWrapper className='text-white'>
      <p className=' text-4xl text-center my-2 font-bold'>Create Widget</p>
      <div>
        <Button variant='link' className='text-white' onClick={goBack}>
          {' '}
          <ArrowLeft className='mr-1' /> Back
        </Button>
      </div>

      <div className='flex flex-col items-center'>
        <div className='w-1/3 border p-2 rounded-md'>
          <div className='my-3'>
            <Label htmlFor='headline'>Name</Label>
            <Input
              className='text-black'
              placeholder='Enter name'
              type='text'
              name='name'
              onChange={handleDataChange}
            />
          </div>
          <div className='my-3'>
            <Label htmlFor='headline'>Header</Label>
            <Input
              className='text-black'
              placeholder='Enter Header'
              type='text'
              name='header'
              onChange={handleDataChange}
            />
          </div>

          <div className='my-3'>
            <Label htmlFor='headline'>Sub Header</Label>
            <Input
              className='text-black'
              placeholder='Enter Sub Header'
              type='text'
              name='subHeader'
              onChange={handleDataChange}
            />
          </div>

          <div className='my-3'>
            <Label htmlFor='headline'>CTA</Label>
            <Input
              className='text-black'
              placeholder='Enter CTA'
              type='text'
              name='cta'
              onChange={handleDataChange}
            />
          </div>

          <div className='my-3'>
            <Label htmlFor='headline'>Type</Label>
            <select
              className='w-full rounded-md h-10 text-black py-2'
              name='type'
              onChange={handleDataChange}
            >
              <option value=''>Select Type</option>
              {redirectType.map((val) => (
                <option key={val.value} value={val.value}>
                  {val.label}
                </option>
              ))}
            </select>
          </div>

          <div className='my-3'>
            <Label htmlFor='headline'>Redirect</Label>
            <select
              className='w-full rounded-md h-10 text-black py-2'
              name='redirect'
              onChange={handleDataChange}
            >
              <option value=''>Select Redirect</option>
              {redirectData.map((val) => (
                <option key={val.value} value={val.value}>
                  {val.label}
                </option>
              ))}
            </select>
          </div>

          <div className='my-3'>
            <Label htmlFor='headline'>Image</Label>
            <Input
              className='text-black'
              placeholder='Select Image'
              type='file'
              name='image'
              accept='image/*'
              onChange={handleFileChange}
            />
          </div>
          <div>
            <Button
              variant='secondary'
              className='w-full'
              onClick={handleSubmit}
              disabled={isSubmitLoading}
            >
              Create
            </Button>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default CreateCategoryWidget;
