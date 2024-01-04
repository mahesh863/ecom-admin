import React, { useState } from 'react';
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

import { ADMIN_ROLES } from '@/constants/roles';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  TAdminCredentialsValidator,
  adminCredentialsValidator,
} from '@/lib/validator/newAdmin.validator';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import apiRequest from '@/lib/apiRequest';
import toast from 'react-hot-toast';

const CreateNewCategory = () => {
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [newCategoryData, setNewCategoryData] = useState({
    name: '',
    categoryImage: undefined as File | undefined,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCategoryData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    setNewCategoryData((prevData) => ({ ...prevData, categoryImage: file }));
  };

  const createNewCategory = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append('name', newCategoryData.name);
    formDataToSend.append('categoryImage', newCategoryData.categoryImage || '');

    setIsSubmitLoading(true);
    const res = await apiRequest('createNewCategory', formDataToSend);
    setIsSubmitLoading(false);

    if (res.error) {
      toast.error(res.error?.message);
    } else {
      toast.success('Category created successfully');
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline' className='my-2'>
          {' '}
          <Plus /> New Category
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>New category</SheetTitle>
          <SheetDescription>Add new category to your store</SheetDescription>
        </SheetHeader>
        <div className='grid gap-4 py-4'>
          <form>
            <div className='grid grid-cols-4 items-center gap-4 my-1'>
              <Label htmlFor='name' className='text-right'>
                Name
              </Label>
              <Input
                id='name'
                name='name'
                onChange={handleInputChange}
                placeholder='John Doe'
                className='col-span-3'
              />
            </div>

            <div className='grid grid-cols-4 items-center gap-4 my-1'>
              <Label htmlFor='name' className='text-right'>
                Image
              </Label>
              <Input
                id='name'
                onChange={handleFileChange}
                placeholder='John Doe'
                type='file'
                className='col-span-3'
                accept='image/*'
              />
            </div>
          </form>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button
              className='float-right'
              type='submit'
              onClick={createNewCategory}
              disabled={isSubmitLoading}
            >
              Save changes
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CreateNewCategory;
