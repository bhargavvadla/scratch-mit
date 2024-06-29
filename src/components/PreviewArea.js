import React, { useEffect, useState } from 'react';
import CatSprite from './CatSprite';
import { useSelector, useDispatch } from 'react-redux';
import { moveFront, moveUp, setPosition } from '../store/slices/GraphicsSlice';
import { FaEye, FaRegEye } from 'react-icons/fa6';
import { BiMessage } from 'react-icons/bi';
import { FaArrowsAltH, FaArrowsAltV } from 'react-icons/fa';

export default function PreviewArea() {
  const dispatch = useDispatch();
  const [showCat, setShowCat] = useState(true);
  const [size, setSize] = useState(90);
  const { xCoord, yCoord, rotation, messageInfo, labels } = useSelector(
    (state) => state.graphics
  );

  useEffect(() => {
    const previewArea = document.getElementById('preview-area');
    if (previewArea) {
      const centerX = Math.round(previewArea.offsetWidth / 2);
      const centerY = Math.round(previewArea.offsetHeight / 2);
      dispatch(setPosition({ x: centerX, y: centerY }));
    }
  }, [dispatch]);

  return (
    <div id='preview-cont' className='flex flex-col h-full w-full'>
      <div
        id='preview-area'
        className='h-1/5 w-full bg-white border-t border-l mb-4 border-gray-200 rounded-lg relative'>
        {showCat && (
          <div
            className='absolute'
            style={{
              left: `${xCoord - 30}px`,
              top: `${yCoord - 30}px`,
              transform: `rotate(${rotation}deg)`,
              transition: 'all 0.3s ease',
            }}>
            {messageInfo.isVisible && (
              <div className='callout-container'>
                <BiMessage className='callout-icon' />
                <p> {messageInfo.message}</p>
              </div>
            )}
            <CatSprite size={size} />
          </div>
        )}
        <div id='labels' className='flex flex-col p-2 absolute top-2 left-2'>
          {labels.x && (
            <div className='bg-blue-100 border-2 border-gray-200 p-1 text-xs px-2 rounded-lg w-fit mb-2'>
              Sprite: X Position :
              <span className='bg-blue-600 text-white px-1 rounded-lg text-xs ml-2'>
                {xCoord}
              </span>
            </div>
          )}
          {labels.y && (
            <div className='bg-blue-100 border-2 border-gray-200 p-1 text-xs px-2 rounded-lg w-fit mb-2'>
              Sprite: Y Poistion :
              <span className='bg-blue-600 text-white px-1 rounded-lg text-xs ml-2'>
                {yCoord}
              </span>
            </div>
          )}
          {labels.direction && (
            <div className='bg-blue-100 border-2 border-gray-200 p-1 text-xs px-2 rounded-lg w-fit mb-2'>
              Sprite: Direction :
              <span className='bg-blue-600 text-white px-1 rounded-lg text-xs ml-2'>
                {rotation}
              </span>
            </div>
          )}
        </div>
      </div>
      <div
        id='properties-cont'
        className='bg-white border-t border-l border-gray-200 rounded-lg h-1/4 p-4'>
        <div className='flex '>
          <div className='flex items-center mr-4'>
            <p className='mr-2'>Show</p>
            <div className='flex border-2 border-gray-200 rounded-lg p-2'>
              <FaEye
                onClick={() => setShowCat(true)}
                className='area-icon mr-2 cursor-pointer'
              />
              <FaRegEye
                onClick={() => setShowCat(false)}
                className='area-icon cursor-pointer'
              />
            </div>
          </div>
          <div className='flex items-center mr-4'>
            <div className='flex border-2 border-gray-200 rounded-lg p-2'>
              <FaArrowsAltH className='area-icon' />
            </div>
            <p className='mx-2'>X</p>
            <input
              defaultValue={0}
              onChange={(e) => dispatch(moveFront(parseInt(e.target.value)))}
              className='w-12 border-2 border-gray-300 rounded-xl bg py-1 pl-4'
            />
          </div>
          <div className='flex items-center'>
            <div className='flex border-2 border-gray-200 rounded-lg p-2'>
              <FaArrowsAltV className='area-icon ' />
            </div>
            <p className='mx-2'>Y</p>
            <input
              defaultValue={0}
              onChange={(e) => dispatch(moveUp(parseInt(e.target.value)))}
              className='w-12 border-2 border-gray-300 rounded-xl bg py-1 pl-4'
            />
          </div>
        </div>
        <div className='flex items-center mt-2'>
          <p className='mx-2'>Size</p>
          <input
            defaultValue={90}
            onChange={(e) => setSize(parseInt(e.target.value))}
            className='w-12 border-2 border-gray-300 rounded-xl bg py-1 pl-4'
          />
        </div>
      </div>
    </div>
  );
}
