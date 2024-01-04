'use client';
import { DataTable } from '@/components/CustomTable';
import MaxWidthWrapper from '@/components/MaxWidth';
import { Button } from '@/components/ui/button';

import apiRequest from '@/lib/apiRequest';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface ProductDataInterface {
  id: number | null;
  name: string | null;
  bannerImage: string | null;
}

interface ProductDetailsInterface {
  id: number | null;
  name: string | null;
  stock: string | null;
  price: string | null;
  sold: string | null;
}

const Collection = () => {
  const [productData, setProductData] = useState<ProductDataInterface>({
    id: null,
    name: null,
    bannerImage: null,
  });
  const [productList, setProductList] = useState<ProductDetailsInterface[]>([]);
  const [collectionList, setCollectionList] = useState([]);
  const router = useRouter();

  const productHeader = [
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

  const handleCreateNewCollection = () => {
    router.push('/dashboard/collection/create');
  };

  const getCollectionList = async () => {
    const res = await apiRequest('getCollectionList');

    if (res.error) {
      toast.error(res?.error?.message);
      return;
    }

    setCollectionList(res.data?.data);
  };

  const getCollectionDetails = async (id: string) => {
    const params = new URLSearchParams();

    params.append('collectionId', id);

    const res = await apiRequest('getCollectionDetails', null, params);

    if (res.error) {
      toast.error(res?.error?.message);
      return;
    }
    setProductData(res.data?.data);

    const productIds = res.data?.data?.Products;

    const data = await Promise.all(
      productIds.map(
        async (productId: { id: number }) => await getProduct(productId?.id)
      )
    );

    setProductList(data);
  };

  const getProduct = async (id: number) => {
    const params = new URLSearchParams();
    params.append('id', id.toString());

    const res = await apiRequest('getProductDetailsAdmin', null, params);
    if (res.error) {
      toast.error(res?.error?.message);
      return {
        id: null,
        name: null,
        stock: null,
        price: null,
        sold: null,
      };
    }

    return res.data?.data;
  };

  const handleCollectionChange = (e: any) => {
    getCollectionDetails(e.target.value);
  };

  useEffect(() => {
    getCollectionList();
  }, []);

  return (
    <MaxWidthWrapper className='text-white'>
      <p className=' text-4xl text-center my-2 font-bold'>Collection</p>
      <div>
        <Button variant='secondary' onClick={handleCreateNewCollection}>
          {' '}
          <Plus /> Collection
        </Button>

        <div className='my-5'>
          <div>
            <select
              className='w-[220px] text-black p-2 rounded-lg'
              onChange={handleCollectionChange}
            >
              <option value=''>Select Collection </option>
              {collectionList?.map((data: { id: number; name: string }) => (
                <option value={data?.id}>{data?.name}</option>
              ))}
            </select>
          </div>

          <div className='my-5  h-[200px] rounded overflow-hidden'>
            {productData?.bannerImage ? (
              <img
                className='w-full h-full object-cover'
                src={productData?.bannerImage}
              />
            ) : (
              <p className='text-center text-2xl h-full'>No Image</p>
            )}
          </div>

          <div className='border mt-10 rounded w-full'>
            <DataTable columns={productHeader} data={productList} />
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Collection;
