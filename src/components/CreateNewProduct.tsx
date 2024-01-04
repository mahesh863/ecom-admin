import React, { useEffect, useState } from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { Button } from './ui/button';
import { Label } from '@radix-ui/react-label';
import { Input } from './ui/input';

import { Plus } from 'lucide-react';
import { Textarea } from './ui/textarea';
import apiRequest from '@/lib/apiRequest';
import toast from 'react-hot-toast';
import { set } from 'zod';

const CreateNewProduct = () => {
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [companyOptions, setCompanyOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    stock: '',
    price: '',
    company: '',
    category: '',
    image1: undefined as File | undefined,
    image2: undefined as File | undefined,
    image3: undefined as File | undefined,
  });

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const file = e.target?.files?.[0];
    setFormData((prevData) => ({ ...prevData, [name]: file }));
  };

  const handleSubmit = async () => {
    if (
      !formData.name ||
      !formData.description ||
      !formData.stock ||
      !formData.price ||
      !formData.company ||
      !formData.category ||
      !formData.image1 ||
      !formData.image2 ||
      !formData.image3
    ) {
      toast.error('Please fill all the fields');
      return;
    }

    setIsLoading(true);
    const submitData = new FormData();

    submitData.append('name', formData.name);
    submitData.append('description', formData.description);
    submitData.append('stock', formData.stock);
    submitData.append('price', formData.price);
    submitData.append('company', formData.company);
    submitData.append('category', formData.category);
    submitData.append('image1', formData?.image1 || '');
    submitData.append('image2', formData?.image2 || '');
    submitData.append('image3', formData?.image3 || '');

    const res = await apiRequest('createNewProduct', submitData);
    setIsLoading(false);

    if (res?.error) {
      toast.error(res.error?.message);
      return;
    }

    toast.success(res.data?.message);
    window.location.reload();
  };

  const getCategoryData = async () => {
    const res = await apiRequest('getAllCategoryPublic');

    if (res?.error) {
      setCategoryOptions([]);
      toast.error(res.error?.message);
      return;
    }

    setCategoryOptions(res.data?.categories);
  };
  const getCompanyData = async () => {
    const res = await apiRequest('getAllCompanyPublic');

    if (res?.error) {
      setCompanyOptions([]);
      toast.error(res.error?.message);
      return;
    }
    setCompanyOptions(res.data?.data);
  };

  useEffect(() => {
    getCategoryData();
    getCompanyData();
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline' className='my-2 '>
          {' '}
          <Plus /> New Product
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>New product</SheetTitle>
          <SheetDescription>Create new product for your store</SheetDescription>
        </SheetHeader>
        <div className='grid gap-4 py-4'>
          <form>
            <div className='grid grid-cols-4 items-center gap-4 text-black'>
              <Label htmlFor='name' className='text-right'>
                Name
              </Label>
              <Input
                id='name'
                name='name'
                onChange={handleInputChange}
                className={'col-span-3'}
              />
            </div>

            <div className='grid grid-cols-4 items-center gap-4 my-1'>
              <Label htmlFor='description' className='text-right'>
                Description
              </Label>
              <Textarea
                id='description'
                placeholder=''
                className='col-span-3 resize-none'
                name='description'
                onChange={handleInputChange}
              />
            </div>

            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='name' className='text-right'>
                Stock
              </Label>
              <Input
                id='stock'
                className='col-span-3'
                type='number'
                name='stock'
                onChange={handleInputChange}
              />
            </div>

            <div className='grid grid-cols-4 items-center gap-4 my-1'>
              <Label htmlFor='name' className='text-right'>
                Price
              </Label>
              <Input
                id='stock'
                placeholder='Name'
                className='col-span-3'
                type='text'
                name='price'
                onChange={handleInputChange}
              />
            </div>

            <div className='grid grid-cols-4 items-center gap-4 my-1'>
              <Label htmlFor='name' className='text-right'>
                Company
              </Label>
              <select
                className='border p-3 col-span-3 rounded-lg'
                name='company'
                onChange={handleInputChange}
              >
                <option value=''>Select Company</option>
                {companyOptions.map((company: { id: number; name: string }) => (
                  <option key={company?.id} value={company?.id}>
                    {company?.name}
                  </option>
                ))}
              </select>
            </div>

            <div className='grid grid-cols-4 items-center gap-4 my-1'>
              <Label htmlFor='name' className='text-right'>
                Category
              </Label>
              <select
                className='border p-3 col-span-3 rounded-lg'
                name='category'
                onChange={handleInputChange}
              >
                <option value=''>Select Category</option>
                {categoryOptions &&
                  categoryOptions.map(
                    (category: { id: number; name: string }) => (
                      <option key={category?.id} value={category?.id}>
                        {category?.name}
                      </option>
                    )
                  )}
              </select>
            </div>

            <div className='grid grid-cols-4 items-center gap-4 my-1'>
              <Label htmlFor='name' className='text-right'>
                Image 1
              </Label>
              <Input
                type='file'
                className='col-span-3'
                name='image1'
                onChange={handleFileChange}
              />
            </div>

            <div className='grid grid-cols-4 items-center gap-4 my-1'>
              <Label htmlFor='name' className='text-right'>
                Image 2
              </Label>
              <Input
                type='file'
                className='col-span-3'
                name='image2'
                onChange={handleFileChange}
              />
            </div>

            <div className='grid grid-cols-4 items-center gap-4 my-1'>
              <Label htmlFor='name' className='text-right'>
                Image 3
              </Label>
              <Input
                type='file'
                className='col-span-3'
                name='image3'
                onChange={handleFileChange}
              />
            </div>
          </form>
        </div>
        <SheetFooter>
          <Button onClick={handleSubmit} className='float-right' type='submit'>
            {isLoading ? 'Loading...' : 'Save changes'}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CreateNewProduct;
