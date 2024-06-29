import React from 'react';
import { sections } from '../utils/index';

export default function Sidebar() {
  return (
    <div className='flex-none h-full overflow-y-auto flex flex-col items-start border-r border-gray-200'>
      <div className='h-full'>
        {sections.map((section) => (
          <div
            key={section.id}
            className='flex flex-col items-center p-2 cursor-pointer mb-1'>
            <div className={`rounded-full ${section.color} w-6 h-6 mb-2`}></div>
            <p className='text-xs'>{section.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
