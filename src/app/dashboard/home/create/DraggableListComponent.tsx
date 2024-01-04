import { Trash } from 'lucide-react';
import React from 'react';

interface Widget {
  id: number;
  name: string;
  type: string;
  index: number;
}

interface Props {
  widgets: Widget;
  provided: any;
  handleDelete: (id: number) => void;
}

const DraggableListComponent = ({ provided, widgets, handleDelete }: Props) => {
  return (
    <div
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
      className='p-2 text-black bg-white my-2 rounded-sm'
    >
      {
        <div>
          {widgets.name} - {widgets.type}
          <Trash
            className='float-right cursor-pointer'
            onClick={() => handleDelete(widgets.index)}
          />
        </div>
      }
    </div>
  );
};

export default DraggableListComponent;
