import React, { useEffect, useRef } from 'react';

const AutoGrowInput = ({ value, onChange }) => {
  const widthMachineRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const updateWidth = () => {
      if (widthMachineRef.current && inputRef.current) {
        widthMachineRef.current.textContent = value || ' ';
        const newWidth = widthMachineRef.current.offsetWidth;
        inputRef.current.style.width = newWidth + 'px';
      }
    };
    updateWidth();
  }, [value]);

  return (
    <span className='input-wrap'>
      <span className='width-machine' ref={widthMachineRef} aria-hidden='true'>
        {value}
      </span>
      <input
        className='input'
        value={value}
        onChange={onChange}
        ref={inputRef}
      />
    </span>
  );
};

export default AutoGrowInput;
