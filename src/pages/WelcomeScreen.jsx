import React from 'react';
import logo from '../assets/logo/logo.png';
import illustration from '../assets/images/illustration.png';
import RightSidePanel from './RightImagePanel';

const WelcomeScreen = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row h-screen font-sans">
  {/* Left Panel */}
  <div className="flex flex-col items-center justify-center w-full md:w-1/2 bg-white px-4 py-8">
    <img src={logo} alt="VedaLearn Logo" className="w-32 md:w-42 h-auto mb-4 p-2 rounded" />
    <p className="text-center text-lg font-medium mb-6">“Master The arts of learning”</p>
    <div className="flex flex-col md:flex-row gap-4">
      <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">
        Login as Learners
      </button>
      <button className="border border-gray-400 text-black px-6 py-2 rounded-full hover:bg-gray-100 transition">
        Login as Tutors
      </button>
    </div>
  </div>

  {/* Right Panel */}
  {/* <div className="flex flex-col items-center justify-center w-full md:w-1/2 bg-blue-500 text-white px-6 py-8 text-center rounded-t-3xl md:rounded-none">
    <img src={illustration} alt="Illustration" className="w-64 h-auto mb-6" />
    <h2 className="text-3xl font-bold mb-2">Hi, John!</h2>
    <p className="text-lg">What local language would you like to learn?</p>
  </div> */}
  <RightSidePanel/>
</div>

  );
};

export default WelcomeScreen;
