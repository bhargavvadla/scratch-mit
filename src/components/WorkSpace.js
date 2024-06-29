import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  moveFront,
  moveUp,
  rotateLeft,
  rotateRight,
  setPosition,
  setRotation,
  updateMsgInfo,
} from '../store/slices/GraphicsSlice';
import { IoPlayCircle } from 'react-icons/io5';
import { MdOutlineReplayCircleFilled } from 'react-icons/md';

export default function WorkSpace() {
  const dispatch = useDispatch();
  const [actionStack, setActionStack] = useState([]);
  const [looksStack, setLooksStack] = useState([]);
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });

  const addActionToStack = (action, value, type) => {
    setActionStack((prevStack) => [...prevStack, { action, value, type }]);
  };

  const addLooksToStack = ({ action, message, isVisible, seconds }) => {
    setLooksStack((prevStack) => [
      ...prevStack,
      { action, message, isVisible, seconds },
    ]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const dataString = event.dataTransfer.getData('application/json');
    const data = JSON.parse(dataString);
    if (data.type === 'MOTION') {
      addActionToStack(data.action, data.value, data.type);
    } else if (data.type === 'LOOKS') {
      addLooksToStack({ action: data.action, ...data.info });
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    const previewArea = document.getElementById('preview-area');
    if (previewArea) {
      const centerX = Math.round(previewArea.offsetWidth / 2);
      const centerY = Math.round(previewArea.offsetHeight / 2);
      setInitialPosition({ x: centerX - 30, y: centerY - 30 });
      dispatch(setPosition({ x: centerX - 30, y: centerY - 30 }));
    }
  }, [dispatch]);

  const executeActions = (index) => {
    if (index >= actionStack.length) return;

    const { action, value } = actionStack[index];
    const stepIncrement = 1;
    let currentStep = 0;

    const actionsMap = {
      moveFront: (step) => dispatch(moveFront(step)),
      moveUp: (step) => dispatch(moveUp(step)),
      rotateRight: (step) => dispatch(rotateRight(step)),
      rotateLeft: (step) => dispatch(rotateLeft(step)),
      changeX: (step) => dispatch(moveFront(step)),
      changeY: (step) => dispatch(moveUp(step)),
      changeXY: (step) => {
        dispatch(moveFront(step.x));
        dispatch(moveUp(step.y));
      },
    };

    const performStep = () => {
      if (action === 'changeXY') {
        const xStep = Math.min(stepIncrement, value.x - currentStep);
        const yStep = Math.min(stepIncrement, value.y - currentStep);

        if (currentStep < value.x || currentStep < value.y) {
          currentStep += stepIncrement;
          actionsMap[action]({ x: xStep, y: yStep });
          requestAnimationFrame(performStep);
        } else {
          executeActions(index + 1);
        }
      } else {
        if (currentStep < value) {
          currentStep += stepIncrement;
          actionsMap[action](stepIncrement);
          requestAnimationFrame(performStep);
        } else {
          executeActions(index + 1);
        }
      }
    };

    performStep();
  };

  const executeLooks = (index = 0) => {
    if (index >= looksStack.length) return;

    const { message, isVisible, seconds } = looksStack[index];
    dispatch(updateMsgInfo({ message, isVisible: isVisible, seconds }));

    if (seconds > 0) {
      setTimeout(() => {
        dispatch(updateMsgInfo({ isVisible: false }));
        executeLooks(index + 1);
      }, seconds * 1000);
    } else {
      dispatch(updateMsgInfo({ isVisible: true }));
      executeLooks(index + 1);
    }
  };

  const handlePlay = () => {
    executeActions(0);
    executeLooks();
  };

  const handleReplay = () => {
    dispatch(setPosition(initialPosition));
    dispatch(setRotation(0));
    dispatch(updateMsgInfo({ message: '', isVisible: false }));
    setTimeout(() => {
      executeActions(0);
      executeLooks();
    }, 2000);
  };

  const renderActionItem = (item, index) => {
    const actionDescriptions = {
      moveFront: `Move ${item.value} steps`,
      moveUp: `Move ${item.value} steps up`,
      rotateRight: `Turn ${item.value} degrees front`,
      rotateLeft: `Turn ${item.value} degrees back`,
      changeX: `Change X by ${item.value}`,
      changeY: `Change Y by ${item.value}`,
      changeXY: `Change X by ${item.value.x} and Y by ${item.value.y}`,
    };

    return (
      <div
        key={index}
        className={`code-block ${
          item.type === 'MOTION' ? 'bg-blue' : 'bg-violet'
        }`}>
        {actionDescriptions[item.action] || ''}
      </div>
    );
  };

  const renderLooksItem = (item, index) => {
    const looksDescriptions = {
      sayHello: 'Say Hello',
      thinkHello: 'Think Hmm',
      scheduleMessage: `Say ${item.message} for ${item.seconds} seconds`,
      scheduleThinkMsg: `Say ${item.message} for ${item.seconds} seconds`,
    };

    return (
      <div key={index} className='code-block bg-violet'>
        {looksDescriptions[item.action] || ''}
      </div>
    );
  };

  const renderWorkspaceBtns = () => {
    return (
      <div className='absolute top-4 right-4 flex gap-4'>
        <button
          onClick={handlePlay}
          type='button'
          className='play-btn rounded-full p-0'>
          <IoPlayCircle />
        </button>
        <button onClick={handleReplay} type='button' className='replay-btn'>
          <MdOutlineReplayCircleFilled />
        </button>
      </div>
    );
  };

  return (
    <div
      className='w-full bg-white relative h-screen p-5'
      onDrop={handleDrop}
      onDragOver={handleDragOver}>
      <div className='absolute left-10 top-10 h-full'>
        {actionStack.map(renderActionItem)}
        {looksStack.map(renderLooksItem)}
      </div>
      {renderWorkspaceBtns()}
    </div>
  );
}
