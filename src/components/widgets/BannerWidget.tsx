import apiRequest from '@/lib/apiRequest';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Select, { MultiValue } from 'react-select';
import { Button } from '../ui/button';
import { Label } from '../ui/label';

interface BannerListInterface {
  value: string;
  label: string;
}

interface BannerDataInterface {
  id: string;
  headline: string;
}

const BannerWidget = ({
  handleSubmit,
}: {
  handleSubmit: (
    params: MultiValue<{
      value: string;
      label: string;
    }>
  ) => void;
}) => {
  const [bannerList, setBannerList] = useState<BannerListInterface[]>([]);
  const [selectedBanner, setSelectedBanner] = useState<
    MultiValue<{ value: string; label: string }>
  >([]);

  const getBannerList = async () => {
    const res = await apiRequest('getBannerListDetails');
    if (res?.error) {
      toast.error(res.error?.message);
      return;
    }
    const bannerDataList = res?.data?.data;

    const bannerData = bannerDataList?.map((item: BannerDataInterface) => {
      return {
        value: item?.id,
        label: item?.headline,
      };
    });

    setBannerList(bannerData);
  };

  useEffect(() => {
    getBannerList();
  }, []);

  return (
    <div className='text-white'>
      <p className='text-center text-2xl '>Banner Widget</p>

      <div className='mt-3'>
        <div>
          <Label>Select Banner</Label>
          <Select
            isMulti
            options={bannerList}
            className='basic-multi-select text-black'
            classNamePrefix='select'
            onChange={(e: MultiValue<{ value: string; label: string }>) =>
              setSelectedBanner(e)
            }
          />
          <Button
            variant='secondary'
            className='mt-3'
            onClick={() => handleSubmit(selectedBanner)}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BannerWidget;
