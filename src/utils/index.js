import { useDispatch } from 'react-redux';
import {
  moveFront,
  moveUp,
  rotateRight,
  rotateLeft,
  updateMsgInfo,
} from '../store/slices/GraphicsSlice';

export const useActionsMap = () => {
  const dispatch = useDispatch();
  return {
    moveFront: (step) => dispatch(moveFront(step)),
    moveUp: (step) => dispatch(moveUp(step)),
    rotateRight: (step) => dispatch(rotateRight(step)),
    rotateLeft: (step) => dispatch(rotateLeft(step)),
    changeX: (step) => dispatch(moveFront(step)),
    changeY: (step) => dispatch(moveUp(step)),
    changeXY: (coord) => {
      dispatch(moveFront(coord.x));
      dispatch(moveUp(coord.y));
    },
    sayHello: (info) => dispatch(updateMsgInfo(info)),
    thinkHello: (info) => dispatch(updateMsgInfo(info)),
    scheduleMessage: (info) => dispatch(updateMsgInfo(info)),
    scheduleThinkMsg: (info) => dispatch(updateMsgInfo(info)),
  };
};

export const sections = [
  { id: 'motion', label: 'Motion', color: 'bg-blue-500' },
  { id: 'looks', label: 'Looks', color: 'bg-violet' },
  { id: 'sound', label: 'Sound', color: 'bg-indigo-600' },
  { id: 'events', label: 'Events', color: 'bg-green-500' },
  { id: 'control', label: 'Control', color: 'bg-yellow-400' },
  { id: 'sensing', label: 'Sensing', color: 'bg-indigo-300' },
  { id: 'variables', label: 'Variables', color: 'bg-yellow-300' },
  { id: 'my-blocks', label: 'My Blocks', color: 'bg-pink-500' },
];
