'use client';
import MaxWidthWrapper from '@/components/MaxWidth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Select from 'react-select';
import { Label } from '@radix-ui/react-label';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import apiRequest from '@/lib/apiRequest';
import toast from 'react-hot-toast';

const CreateCollection = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [collectionName, setCollectionName] = useState('');
  const [bannerImage, setBannerImage] = useState(undefined as File | undefined);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleProductSelect = (e: any) => {
    setSelectedProducts(e);
  };

  const handleSubmit = async () => {
    if (!collectionName || selectedProducts.length === 0) {
      toast.error('Please fill all the fields');
      return;
    }

    const productIds = selectedProducts.map(
      (product: { value: number }) => product?.value
    );

    setIsLoading(true);
    const bannerFormData = new FormData();

    bannerFormData.append('name', collectionName);
    bannerFormData.append('productIds', productIds.toString());
    bannerFormData.append('bannerImage', bannerImage || '');

    const res = await apiRequest('createCollection', bannerFormData);
    setIsLoading(false);

    if (res.error) {
      toast.error(res.error.message);
      return;
    }

    toast.success('Collection created successfully');
    goBack();
  };

  const goBack = () => {
    router.back();
  };

  const getProductList = async () => {
    const res = await apiRequest('getPublicProducts');

    if (res.error) {
      toast.error(res?.error?.message);
      return;
    }

    const products = res?.data?.data?.map((product: any) => {
      return {
        value: product.id,
        label: product.name,
      };
    });

    setProducts(products);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    setBannerImage(file);
  };

  useEffect(() => {
    getProductList();
  }, []);

  return (
    <MaxWidthWrapper className='text-white'>
      <p className=' text-4xl text-center my-2 font-bold'>Create Collection</p>
      <div>
        <Button variant='link' className='text-white' onClick={goBack}>
          {' '}
          <ArrowLeft className='mr-1' /> Create Collection
        </Button>
      </div>

      <div className='flex flex-col items-center'>
        <div className='w-1/3 mt-5 border p-2 rounded-lg'>
          <form>
            <div className='my-1'>
              <Label htmlFor='name'>Banner Image</Label>
              <Input
                className='text-black'
                name='bannerImage'
                type='file'
                accept='image/*'
                onChange={handleFileChange}
              />
            </div>
            <div className='my-1'>
              <Label htmlFor='name'>Name</Label>
              <Input
                className='text-black'
                name='collectionName'
                value={collectionName}
                onChange={(e) => setCollectionName(e.target.value)}
              />
            </div>
            <div className='my-1  '>
              <Label htmlFor='name'>Select Products</Label>
              <Select
                isMulti
                name='colors'
                options={products}
                className='basic-multi-select text-black'
                classNamePrefix='select'
                onChange={handleProductSelect}
              />
            </div>
          </form>
          <Button
            variant='secondary'
            type='submit'
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? 'Creating...' : 'Create'}
          </Button>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default CreateCollection;
