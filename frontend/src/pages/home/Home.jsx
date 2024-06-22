import React from 'react';
import MyComponent from './MyComponent'; // Adjust the path if MyComponent is in a different directory

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <MyComponent />
      <img src={'./src/pics/logo.png'} alt="Logo" className="h-64 mb-[-15px]"/>
      <p className="font-satoshi text-[25px] text-center text-yellow">
        Your go-to platform for <span class="italic">generating</span> and <span class="italic">interpreting</span> contracts.
      </p>
    </div>
  )
}

export default Home;