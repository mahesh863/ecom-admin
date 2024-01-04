'use client';
import MaxWidthWrapper from '@/components/MaxWidth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Select from 'react-select';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import apiRequest from '@/lib/apiRequest';
import toast from 'react-hot-toast';

const CreateBanner = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [redirectOptions, setRedirectOptions] = useState([]);
  const [formData, setFormData] = useState({
    headline: '',
    cta: '',
    redirectType: '',
    selectedRedirect: '',
    backgroundImage: undefined as File | undefined,
  });
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  const getRedirectTypeData = async (name: string) => {
    if (name) {
      let res;
      setIsLoading(true);
      if (name === 'collection') {
        res = await apiRequest('getCollectionList');
      } else {
        res = await apiRequest('getProductList');
      }
      setIsLoading(false);

      if (res?.error) {
        toast.error(res.error);
        return;
      }

      const redirectData = res?.data?.data;
      const options = redirectData.map((data: any) => ({
        value: data.id,
        label: data?.name,
      }));
      setRedirectOptions(options);
    }
  };

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (name === 'redirectType') {
      getRedirectTypeData(value);
    }
  };

  const handleSelectChange = (selectedOption: any) => {
    if (selectedOption) {
      setFormData((prevData) => ({
        ...prevData,
        selectedRedirect: selectedOption?.value,
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    setFormData((prevData) => ({ ...prevData, backgroundImage: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    const formDataToSend = new FormData();
    formDataToSend.append('headline', formData.headline);
    formDataToSend.append('cta', formData.cta);
    formDataToSend.append('redirectType', formData.redirectType);
    formDataToSend.append('redirectDataId', formData.selectedRedirect);
    formDataToSend.append('bannerImage', formData.backgroundImage || '');

    setIsSubmitLoading(true);
    const res = await apiRequest('createNewBanner', formDataToSend);
    setIsSubmitLoading(false);

    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success('Banner created successfully');
      goBack();
    }
  };

  return (
    <MaxWidthWrapper className='text-white'>
      <p className=' text-4xl text-center my-2 font-bold'>Create Banner</p>
      <div>
        <Button variant='link' className='text-white' onClick={goBack}>
          <ArrowLeft className='mr-1' /> Banner
        </Button>
      </div>

      <div className='flex flex-col items-center'>
        <div className='mt-5 w-1/3'>
          <div className='my-3'>
            <Label htmlFor='headline'>Headline</Label>
            <Input
              className='text-black'
              placeholder='Enter headline'
              type='text'
              name='headline'
              onChange={handleInputChange}
            />
          </div>

          <div className='my-3'>
            <Label htmlFor='cta'>Call to action</Label>
            <Input
              className='text-black'
              placeholder='Call to action'
              type='text'
              name='cta'
              onChange={handleInputChange}
            />
          </div>

          <div className='my-3'>
            <Label htmlFor='redirectType'>Redirect Type</Label>
            <select
              className='p-2 w-full rounded-md text-black'
              name='redirectType'
              onChange={(e) => handleInputChange(e)}
            >
              <option value=''>Select Redirect Type</option>
              <option value='collection'>Collection</option>
              <option value='product'>Product</option>
            </select>
          </div>

          <div className='my-3'>
            <Label htmlFor='cta'>Select redirect</Label>
            <Select
              className='basic-single text-black'
              classNamePrefix='select'
              isLoading={isLoading}
              isSearchable={true}
              name='select redirect'
              options={redirectOptions}
              onChange={(val) => handleSelectChange(val)}
            />
          </div>

          <div className='my-3'>
            <Label htmlFor='backgroundImage'>Background Image</Label>
            <Input
              className='text-black'
              placeholder='backgroundImage'
              type='file'
              name='cta'
              accept='image/*'
              onChange={handleFileChange}
            />
          </div>
          <Button
            disabled={isSubmitLoading}
            variant='secondary'
            className='w-full'
            onClick={handleSubmit}
          >
            Create
          </Button>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default CreateBanner;
