import React from 'react';
import illustration from '../assets/images/illustration.png'; // Adjust the path as necessary
import top from '../assets/images/top.png'; // Adjust the path as necessary

const RightSidePanel = ({ title = "Hi, John!", subtitle = "What local language would you like to learn?" }) => {
  return (
    <div className="relative flex flex-col items-center justify-center w-full md:w-1/2 h-screen text-white px-6 py-8 text-center overflow-hidden ">
      <div className="absolute inset-0 bg-blue-500 z-0" style={{
        clipPath: 'ellipse(100% 75% at 100% 50%)'
      }}>
      </div>
      <img src={top} className='absolute top-0 right-0 max-w-[200px] object-cover object-center'/>
      <div className="z-10 flex flex-col items-center jusify-center lg:max-w-[480px] xl:max-w-[500px]">
        <div className='w-full '>
        <img src={illustration} alt="Illustration" className="w-full object-cover object-center" />
        </div>
        <div className="w-full">
        <h2 className="text-3xl font-bold mb-2">{title}</h2>
        <p className="text-lg">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};
export default RightSidePanel;
