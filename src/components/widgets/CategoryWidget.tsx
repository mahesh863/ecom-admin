import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import Select, { MultiValue } from 'react-select';
import { Label } from '../ui/label';
import apiRequest from '@/lib/apiRequest';
import toast from 'react-hot-toast';

const CategoryWidget = ({
  handleSubmit,
  type,
}: {
  handleSubmit: (
    params: MultiValue<{
      value: string;
      label: string;
    }>
  ) => void;
  type: string;
}) => {
  const [widgetData, setWidgetData] = useState([]);
  const [selectedCategoryWidget, setSelectedCategoryWidget] = useState<
    MultiValue<{ value: string; label: string }>
  >([]);

  const getWidgetData = async () => {
    const res = await apiRequest('getCategoryWidgetList');

    if (res.error) {
      toast.error(res.error?.message || 'Failed to fetch widget data');
    } else {
      const formattedData = res.data?.data.map(
        (item: { id: number; name: string }) => {
          return {
            value: item.id,
            label: item.name,
          };
        }
      );

      setWidgetData(formattedData);
    }
  };

  const handleSelect = (e: MultiValue<{ value: string; label: string }>) => {
    let maxLen = 0;

    if (type === 'categoryGrid') {
      maxLen = 4;
    } else {
      maxLen = 3;
    }

    if (e.length <= maxLen) {
      setSelectedCategoryWidget(e);
    } else {
      toast.error(`Max ${maxLen} items can be selected`);
    }
  };

  const handleDataSubmit = () => {
    handleSubmit(selectedCategoryWidget);
  };

  useEffect(() => {
    getWidgetData();
  }, []);

  return (
    <div className='text-white'>
      {type === 'category' && (
        <p className='text-center text-2xl '>Category Widget</p>
      )}

      {type === 'categoryGrid' && (
        <p className='text-center text-2xl '>Category Grid Widget</p>
      )}

      <div className='mt-3'>
        <div>
          <Label>Select</Label>
          <Select
            isMulti
            name='colors'
            options={widgetData}
            className='basic-multi-select text-black'
            classNamePrefix='select'
            onChange={(e: MultiValue<{ value: string; label: string }>) =>
              handleSelect(e)
            }
            value={selectedCategoryWidget}
          />
          <Button
            variant='secondary'
            className='mt-3'
            onClick={handleDataSubmit}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CategoryWidget;
