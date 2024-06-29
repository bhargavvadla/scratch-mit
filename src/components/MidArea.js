import React from 'react';
import ToolBar from './Toolbar';
import WorkSpace from './WorkSpace';

export default function MidArea() {
  return (
    <div className='flex h-full overflow-auto bg-gray-100 w-full'>
      <ToolBar />
      <WorkSpace />
    </div>
  );
}
