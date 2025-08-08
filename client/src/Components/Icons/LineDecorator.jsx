import React from 'react'

const LineDecorator = ({ flipped = false }) => {
  const pathData = "M 0 10 L 0 5 L 100 5";
  
  return (
    <svg 
      className="flex-grow h-3 text-gray-400 dark:text-gray-300 " 
      viewBox="0 0 100 10" 
      preserveAspectRatio="none"
      style={{ transform: flipped ? 'scaleX(-1)' : 'none' }}
    >
      <path 
        d={pathData} 
        stroke="currentColor" 
        className='stroke-1 dark:stroke-[0.25]' 
        fill="none" 
      />
    </svg>
  );
}
export default LineDecorator