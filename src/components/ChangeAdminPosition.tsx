import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from './ui/dialog';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { ALL_ROLES } from '@/constants/roles';
import apiRequest from '@/lib/apiRequest';
import toast from 'react-hot-toast';

interface IChangeAdminPositionProps {
  id: number;
  role: number;
}

const ChangeAdminPosition = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [adminList, setAdminList] = useState([{ email: 'Mahesh', id: 123 }]);
  const [selectedData, setSelectedData] = useState<IChangeAdminPositionProps>({
    id: 0,
    role: 0,
  });

  const handleFormDataChange = (e: any) => {
    setSelectedData({
      ...selectedData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!selectedData.id || !selectedData.role) {
      toast.error('Please select admin and role');
    }

    setIsLoading(true);
    const res = await apiRequest('updateAdminData', selectedData);
    setIsLoading(false);

    if (res?.error) {
      toast.error(res.error);
      return;
    }

    toast.success(res.data?.message);
  };

  const getAdminList = async () => {
    const res = await apiRequest('getAllAdminList');
    setIsLoading(false);

    if (res?.error) {
      toast.error(res.error?.message);
      return;
    }

    setAdminList(res.data?.data);
  };

  useEffect(() => {
    getAdminList();
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='secondary' className='float-right'>
          Change Role
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Edit Role</DialogTitle>
          <DialogDescription>Make changes to the admin role</DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='name' className='text-right'>
              Email
            </Label>
            <select
              className='col-span-3 border p-2 rounded'
              name='id'
              onChange={handleFormDataChange}
            >
              <option value=''>Select Admin</option>
              {adminList.map((role) => (
                <option value={role.id} key={role.id}>
                  {role.email}
                </option>
              ))}
            </select>
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='role' className='text-right'>
              Role
            </Label>
            <select
              className='col-span-3 border p-2 rounded'
              name='role'
              onChange={handleFormDataChange}
            >
              <option value=''>Select Role</option>
              {ALL_ROLES.map((role) => (
                <option value={role.value} key={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type='submit' disabled={isLoading} onClick={handleSubmit}>
              {isLoading ? 'Loading...' : 'Save'}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeAdminPosition;
