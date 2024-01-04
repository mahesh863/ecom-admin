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

import { Plus } from 'lucide-react';
import apiRequest from '@/lib/apiRequest';
import toast from 'react-hot-toast';

const CreateNewCompany = () => {
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [newCompanyData, setNewCompanyData] = useState({
    name: '',
    companyLogo: undefined as File | undefined,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCompanyData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    setNewCompanyData((prevData) => ({
      ...prevData,
      companyLogo: file,
    }));
  };

  const createNewCompany = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append('name', newCompanyData.name);
    formDataToSend.append('logo', newCompanyData.companyLogo || '');

    setIsSubmitLoading(true);
    const res = await apiRequest('createNewCompany', formDataToSend);
    setIsSubmitLoading(false);

    if (res.error) {
      toast.error(res.error?.message);
    } else {
      toast.success('Company created successfully');
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline' className='my-2'>
          {' '}
          <Plus /> New Company
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>New Company</SheetTitle>
          <SheetDescription>Add new Company to your store</SheetDescription>
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
              onClick={createNewCompany}
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

export default CreateNewCompany;
