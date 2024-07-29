// Add this to your React component
import React from 'react';

const Button = (props) => {
  return (
<button
onClick={props.onClick}
type={props.type}
  className="relative  px-6 py-2 rounded-md bg-white isolation-auto z-10 border-2 border-red-700 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full hover:text-white before:-right-full before:hover:right-0 before:rounded-full before:bg-[#A12347] before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700 inline-flex items-center justify-center text-sm font-semibold text-black  shadow-sm gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
>
  {props.children}
</button>
  
  );
};

export default Button;
