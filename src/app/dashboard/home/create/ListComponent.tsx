import { Plus } from 'lucide-react';
import React from 'react';

interface Widget {
  id: number;
  name: string;
  type: string;
}

interface Props {
  widgets: Widget;
  handleSelect: (data: Widget) => void;
}

const ListComponent = ({ widgets, handleSelect }: Props) => {
  return (
    <div
      className='p-2 text-black bg-white my-2 rounded-sm cursor-pointer flex'
      onClick={() => handleSelect(widgets)}
    >
      <div>
        {widgets?.name} - {widgets?.type}{' '}
      </div>{' '}
      <Plus className='ml-auto mr-2' />
    </div>
  );
};

export default ListComponent;
