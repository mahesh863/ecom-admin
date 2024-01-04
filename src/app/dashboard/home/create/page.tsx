'use client';
import React, { useEffect, useMemo, useState } from 'react';
import MaxWidthWrapper from '@/components/MaxWidth';
import { Button } from '@/components/ui/button';
import { ArrowLeft, List } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import DraggableListComponent from './DraggableListComponent';
import ListComponent from './ListComponent';
import apiRequest from '@/lib/apiRequest';
import toast from 'react-hot-toast';

interface Widget {
  id: number;
  name: string;
  type: string;
}
interface HomeWidget extends Widget {
  index: number;
}

const CreateHome = () => {
  const [homeWidgets, setHomeWidgets] = useState<HomeWidget[]>([]);
  const [widgetList, setWidgetList] = useState<Widget[]>([]);
  const router = useRouter();

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(homeWidgets);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setHomeWidgets(items);
  };

  const handleWidgetSelect = (data: Widget) => {
    setHomeWidgets((prev) => [...prev, { ...data, index: prev.length }]);
  };

  const goBack = () => {
    router.back();
  };

  const getWidgetList = async () => {
    const res = await apiRequest('getWidgetList');

    if (res.error) {
      setWidgetList([]);
      toast.error(res.error?.message);
      return;
    }

    const formattedData: Widget[] = res.data?.data?.map(
      (widget: any): Widget => {
        return {
          id: widget.id,
          name: widget.name,
          type: widget?.WidgetType?.name,
        };
      }
    );

    setWidgetList(formattedData);
  };

  const handleDeleteWidget = (id: number) => {
    const newHomeWidgets = homeWidgets.filter((widget) => widget.index !== id);
    setHomeWidgets(newHomeWidgets);
  };

  const handleHomeUpdate = async () => {
    const homeBody = homeWidgets.map((widget: HomeWidget, index) => {
      return {
        widget: widget.id,
        position: index,
      };
    });

    const res = await apiRequest('createAndUpdateHome', homeBody);

    if (res.error) {
      toast.error(res.error?.message);
      return;
    }

    toast.success(res.data?.message || 'Home updated successfully');
    goBack();
  };

  useEffect(() => {
    getWidgetList();
  }, []);

  useEffect(() => {
    console.log(homeWidgets);
  }, [homeWidgets]);

  return (
    <MaxWidthWrapper className='text-white'>
      <p className=' text-4xl text-center my-2 font-bold'>Create Home</p>
      <div>
        <Button variant='link' className='text-white' onClick={goBack}>
          {' '}
          <ArrowLeft className='mr-1' /> Back
        </Button>
      </div>

      <div className='float-right flex flex-col gap-2 w-1/6'>
        <Button variant='destructive' onClick={handleHomeUpdate}>
          Update Home
        </Button>
        <span className='text-xs text-center'>
          Click on the button only when you know the consequences
        </span>
      </div>

      <div className='flex gap-10'>
        <div className='w-1/3 mt-10'>
          <p className='text-xl'>Home</p>
          <p className='text-xs mt-2'>
            This widgets will be displayed as it is in your home page
          </p>{' '}
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='tasks'>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {homeWidgets.map((task, index) => (
                    <Draggable
                      key={task.index}
                      draggableId={task.index.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <DraggableListComponent
                          provided={provided}
                          widgets={task}
                          handleDelete={handleDeleteWidget}
                        />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>

        <div className='w-1/3 mt-10'>
          <p className='text-xl'>Widgets</p>
          <p className='text-xs mt-2'>Click to add widgets</p>

          <div>
            {widgetList?.map((widgets, index) => (
              <ListComponent
                widgets={widgets}
                handleSelect={handleWidgetSelect}
              />
            ))}
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default CreateHome;
