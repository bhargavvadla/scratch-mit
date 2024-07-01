import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  xCoord: 0,
  yCoord: 0,
  rotation: 0,
  messageInfo: {
    message: 'Hello',
    isVisible: false,
    seconds: 0,
  },
  labels: {
    x: false,
    y: false,
    direction: false,
  },
};

const graphicsSlice = createSlice({
  name: 'graphics',
  initialState,
  reducers: {
    moveFront(state, action) {
      state.xCoord += action.payload;
    },
    moveUp(state, action) {
      state.yCoord -= action.payload;
    },
    rotateRight(state, action) {
      state.rotation += action.payload;
    },
    rotateLeft(state, action) {
      state.rotation -= action.payload;
    },
    setRotation(state, action) {
      state.rotation = action.payload;
    },
    setPosition(state, action) {
      state.xCoord = action.payload.x;
      state.yCoord = action.payload.y;
    },
    updateLabels(state, action) {
      state.labels = {
        ...state.labels,
        ...action.payload,
      };
    },
    updateMsgInfo(state, action) {
      state.messageInfo = {
        ...state.messageInfo,
        ...action.payload,
      };
    },
    resetState() {
      return initialState;
    },
  },
});

export const {
  moveFront,
  moveUp,
  rotateRight,
  rotateLeft,
  updateLabels,
  setRotation,
  setPosition,
  updateMsgInfo,
  resetState,
} = graphicsSlice.actions;
export default graphicsSlice.reducer;
