import apiRequest from '@/lib/apiRequest';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Select, { MultiValue } from 'react-select';
import { Button } from '../ui/button';
import { Label } from '../ui/label';

interface ProductListInterface {
  value: string;
  label: string;
}

interface ProductDataInterface {
  id: string;
  name: string;
}

const ProductWidget = ({
  handleSubmit,
}: {
  handleSubmit: (
    params: MultiValue<{
      value: string;
      label: string;
    }>
  ) => void;
}) => {
  const [productList, setProductList] = useState<ProductListInterface[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<
    MultiValue<{ value: string; label: string }>
  >([]);

  const getProductList = async () => {
    const res = await apiRequest('getProductList');
    if (res?.error) {
      toast.error(res.error?.message);
      return;
    }
    const productDataList = res?.data?.data;

    const ProductData = productDataList?.map((item: ProductDataInterface) => {
      return {
        value: item?.id,
        label: item?.name,
      };
    });

    setProductList(ProductData);
  };

  useEffect(() => {
    getProductList();
  }, []);

  return (
    <div className='text-white'>
      <p className='text-center text-2xl '>Product Widget</p>

      <div className='mt-3'>
        <div>
          <Label>Select Product</Label>
          <Select
            isMulti
            options={productList}
            className='basic-multi-select text-black'
            classNamePrefix='select'
            onChange={(e: MultiValue<{ value: string; label: string }>) =>
              setSelectedProduct(e)
            }
          />
          <Button
            variant='secondary'
            className='mt-3'
            onClick={() => handleSubmit(selectedProduct)}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductWidget;
