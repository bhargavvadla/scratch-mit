import React, { useState } from 'react';
import { FaArrowRotateLeft, FaArrowRotateRight, FaHand } from 'react-icons/fa6';
import { IoMdArrowRoundForward, IoMdArrowRoundUp } from 'react-icons/io';
import AutoGrowInput from './AutoGrowInput';
import { updateLabels } from '../store/slices/GraphicsSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function ToolBar() {
  const [xStepsFront, setXStepsFront] = useState(10);
  const [yStepsUp, setYStepsUp] = useState(10);
  const dispatch = useDispatch();
  const [rotateRight, setRotateRight] = useState(15);
  const [rotateLeft, setRotateLeft] = useState(15);
  const [changeX, setChangeX] = useState(10);
  const [changeY, setChangeY] = useState(10);
  const [coord, setCoord] = useState({ x: 10, y: 10 });
  const { labels } = useSelector((state) => state.graphics);
  const [msgInfo, setMsgInfo] = useState({ message: 'Hello!', seconds: 2 });
  const [thinkMsgInfo, setThinkMsgInfo] = useState({
    message: 'Hmm..',
    seconds: 2,
  });

  const getActionValue = (action) => {
    switch (action) {
      case 'moveFront':
        return xStepsFront;
      case 'moveUp':
        return yStepsUp;
      case 'changeX':
        return changeX;
      case 'changeY':
        return changeY;
      case 'changeXY':
        return coord;
      case 'rotateRight':
        return rotateRight;
      case 'rotateLeft':
        return rotateLeft;
      case 'sayHello':
        return 'Hello';
      default:
        return 0;
    }
  };

  const getLooksInfo = (action) => {
    switch (action) {
      case 'sayHello':
      case 'thinkHello':
        return {
          message: action === 'sayHello' ? 'Hello!' : 'Hmm..',
          isVisible: true,
          seconds: 2,
        };
      case 'scheduleMessage':
        return {
          message: msgInfo.message,
          isVisible: true,
          seconds: msgInfo.seconds,
        };
      case 'scheduleThinkMsg':
        return {
          message: thinkMsgInfo.message,
          isVisible: true,
          seconds: thinkMsgInfo.seconds,
        };
      default:
        return { message: 'Hello', isVisible: true, seconds: 0 };
    }
  };

  const handleDragStart = (event, action, type) => {
    let data = {};
    if (type === 'MOTION') {
      data = {
        action: action,
        value: getActionValue(action),
        type: type,
      };
    } else if (type === 'LOOKS') {
      data = {
        action: action,
        info: getLooksInfo(action),
        type: type,
      };
    }

    event.dataTransfer.setData('application/json', JSON.stringify(data));
    const cloneDiv = event.target.cloneNode(true);
    event.dataTransfer.setDragImage(cloneDiv, 0, 0);
  };

  const handleRotateRight = (event) => {
    setRotateRight(event.target.value);
  };

  const handleRotateLeft = (event) => {
    setRotateLeft(event.target.value);
  };

  const handleMsgInfo = (key, value) => {
    setMsgInfo((prev) => ({ ...prev, [key]: value }));
  };

  const handleThinkMsgInfo = (key, value) => {
    setThinkMsgInfo((prev) => ({ ...prev, [key]: value }));
  };

  const handleUpdateLabels = (label, value) => {
    dispatch(updateLabels({ [label]: value }));
  };

  return (
    <div className='w-96 p-4 overflow-y-scroll'>
      <div id='motion'>
        <h1 className='text-md font-bold mb-2'>Motion</h1>
        <div
          id='moveFront'
          className='flex flex-row flex-wrap code-block bg-blue mb-4 items-center cursor-pointer'
          draggable={true}
          onDragStart={(e) => handleDragStart(e, 'moveFront', 'MOTION')}>
          {'Move '}
          <AutoGrowInput
            value={xStepsFront}
            onChange={(e) => setXStepsFront(e.target.value)}
          />
          {' steps '}
          <IoMdArrowRoundForward className='code-block-icon' />
        </div>
        <div
          id='moveUp'
          className='flex flex-row flex-wrap code-block bg-blue mb-4 items-center cursor-pointer'
          draggable={true}
          onDragStart={(e) => handleDragStart(e, 'moveUp', 'MOTION')}>
          {'Move '}
          <AutoGrowInput
            value={yStepsUp}
            onChange={(e) => setYStepsUp(e.target.value)}
          />
          {' steps up'}
          <IoMdArrowRoundUp className='code-block-icon' />
        </div>
        <div
          id='rotateRight'
          className='flex flex-row flex-wrap code-block bg-blue mb-4 items-center cursor-pointer'
          draggable={true}
          onDragStart={(e) => handleDragStart(e, 'rotateRight', 'MOTION')}>
          {'Turn '}
          <FaArrowRotateRight className='code-block-icon' />
          <AutoGrowInput value={rotateRight} onChange={handleRotateRight} />
          {' degrees front'}
        </div>
        <div
          id='rotateLeft'
          className='flex flex-row flex-wrap code-block bg-blue mb-4 items-center cursor-pointer'
          draggable={true}
          onDragStart={(e) => handleDragStart(e, 'rotateLeft', 'MOTION')}>
          {'Turn '}
          <FaArrowRotateLeft className='code-block-icon' />
          <AutoGrowInput value={rotateLeft} onChange={handleRotateLeft} />
          {' degrees back'}
        </div>
        <br />
        <div
          className='flex flex-row flex-wrap code-block bg-blue mb-4 items-center cursor-pointer'
          draggable={true}
          onDragStart={(e) => handleDragStart(e, 'changeX', 'MOTION')}>
          {'Change X by '}
          <AutoGrowInput
            value={changeX}
            onChange={(e) => setChangeX(e.target.value)}
          />
          <IoMdArrowRoundForward className='code-block-icon' />
        </div>
        <div
          className='flex flex-row flex-wrap code-block bg-blue mb-4 items-center cursor-pointer'
          draggable={true}
          onDragStart={(e) => handleDragStart(e, 'changeY', 'MOTION')}>
          {'Change Y by '}
          <AutoGrowInput
            value={changeY}
            onChange={(e) => setChangeY(e.targte.value)}
          />
          <IoMdArrowRoundUp className='code-block-icon' />
        </div>
        <div
          className='flex flex-row flex-wrap code-block bg-blue mb-4 items-center cursor-pointer'
          draggable={true}
          onDragStart={(e) => handleDragStart(e, 'changeXY', 'MOTION')}>
          {'Go to X '}
          <AutoGrowInput
            value={coord.x}
            onChange={(e) =>
              setCoord((prev) => ({ ...prev, x: parseInt(e.target.value) }))
            }
          />
          {'Y by '}
          <AutoGrowInput
            value={coord.y}
            onChange={(e) =>
              setCoord((prev) => ({ ...prev, y: parseInt(e.target.value) }))
            }
          />
          <IoMdArrowRoundUp className='code-block-icon' />
        </div>
        <br />
        <div class='flex items-center mb-4'>
          <input
            id='showX'
            type='checkbox'
            value=''
            onChange={(e) => handleUpdateLabels('x', e.target.checked)}
            checked={labels.x}
            class='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mr-4'
          />
          <label
            for='showX'
            class='bg-blue-500 ms-2 text-sm font-medium rounded-2xl p-2 text-white'>
            X Poistion {`${labels.x}`}
          </label>
        </div>
        <div class='flex items-center mb-4'>
          <input
            id='showY'
            type='checkbox'
            value=''
            onChange={(e) => handleUpdateLabels('y', e.target.checked)}
            checked={labels.y}
            class='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mr-4'
          />
          <label
            for='showY'
            class='bg-blue-500 ms-2 text-sm font-medium rounded-2xl p-2 text-white'>
            Y Poistion
          </label>
        </div>
        <div class='flex items-center mb-4'>
          <input
            id='showDirection'
            type='checkbox'
            value=''
            checked={labels.direction}
            onChange={(e) => handleUpdateLabels('direction', e.target.checked)}
            class='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mr-4'
          />
          <label
            for='showDirection'
            class='bg-blue-500 ms-2 text-sm font-medium rounded-2xl p-2 text-white'>
            Direction
          </label>
        </div>
      </div>
      <div id='looks'>
        <h1 className='text-md font-bold mb-2'>Looks</h1>
        <div
          id='sayHello'
          className='flex flex-row flex-wrap code-block bg-violet mb-4 items-center'
          draggable={true}
          onDragStart={(e) => handleDragStart(e, 'sayHello', 'LOOKS')}>
          {'Say Hello!'}
          <FaHand className='code-block-icon' />
        </div>
        <div
          id='scheduleMessage'
          className='flex flex-row flex-wrap code-block bg-violet mb-4 items-center'
          draggable={true}
          onDragStart={(e) => handleDragStart(e, 'scheduleMessage', 'LOOKS')}>
          {'Say '}
          <AutoGrowInput
            value={msgInfo.message}
            onChange={(e) => handleMsgInfo('message', e.target.value)}
          />
          {' for '}
          <AutoGrowInput
            value={msgInfo.seconds}
            onChange={(e) => handleMsgInfo('seconds', e.target.value)}
          />
          {' seconds'}
          <FaHand className='code-block-icon' />
        </div>
        <div
          id='thinkHello'
          className='flex flex-row flex-wrap code-block bg-violet mb-4 items-center'
          draggable={true}
          onDragStart={(e) => handleDragStart(e, 'thinkHello', 'LOOKS')}>
          {'Think Hello'}
          <FaHand className='code-block-icon' />
        </div>
        <div
          id='scheduleThinkMsg'
          className='flex flex-row flex-wrap code-block bg-violet mb-4 items-center'
          draggable={true}
          onDragStart={(e) => handleDragStart(e, 'scheduleThinkMsg', 'LOOKS')}>
          {'Think '}
          <AutoGrowInput
            value={thinkMsgInfo.message}
            onChange={(e) => handleThinkMsgInfo('message', e.target.value)}
          />
          {' for '}
          <AutoGrowInput
            value={thinkMsgInfo.seconds}
            onChange={(e) => handleThinkMsgInfo('seconds', e.target.value)}
          />
          {' seconds'}
          <FaHand className='code-block-icon' />
        </div>
      </div>
    </div>
  );
}
