import React from 'react';
import MyComponent from './MyComponent.jsx'; // Adjust the path if MyComponent is in a different directory
import Navbar from '../../navbar/Navbar.jsx';

const Home = () => {
  return (
    <>
      <div id="section1" className="flex flex-col justify-center items-center h-screen mt-[-20px]">
        <MyComponent />
        <Navbar />
        <img src={'./src/pics/logo.png'} alt="Logo" className="h-64 mb-[-15px]" />
        
        <div className="typewriter-container">
          <p className="font-satoshi text-[25px] text-center text-yellow typewriter">
            Focus on business, <span className="italic">we'll handle the law!</span> 
          </p>
        </div>

      <img src={'./src/pics/homeTri.png'} alt="Bottom" className="h-[65%] absolute bottom-0 right-0" />

        <a
          href="#section2"
          className="font-satoshi text-lg absolute bottom-6 cursor-pointer text-yellow opacity-50 hover:opacity-100 transition-opacity hover:text-yellow"
          style={{ textDecoration: 'none' }}
        >
          Learn more
        </a>
      </div>

      <div id="section2" className="flex flex-col justify-center items-center bg-[#272019] pt-20">
        <div id="section2b" className="flex flex-col justify-center items-center h-[600px] w-[80%] max-w-[1200px] bg-[#E7D9BE] rounded-xl">
          <p className="font-satoshi" style={{ color: '#272019', fontSize: '60px', fontWeight: 'bold'}}>
            <span className="red-underline">TRANSLATE</span> your Contracts
          </p>

          <div id="section2c" className="flex justify-center items-center">
            <div id="section2d" className="flex flex-col justify-center items-center p-10">
              <img src={'./src/pics/step1.png'} className="p-5"/>
              <p className="font-satoshi" style={{fontSize: '20px', fontWeight: 'regular'}}>File Upload</p>
              <p className="font-satoshi" style={{fontSize: '25px', fontWeight: 'bold'}}>Transcribe with GPT</p>
            </div>
            
            <img src={''} className="p-5"/>

            <div id="section2d" className="flex flex-col justify-center items-center p-10">
              <img src={'./src/pics/step2.png'} className="p-5"/>
              <p className="font-satoshi" style={{fontSize: '20px', fontWeight: 'regular'}}>Hume AI Conversations</p>
              <p className="font-satoshi" style={{fontSize: '25px', fontWeight: 'bold'}}>Understanding your contract</p>
            </div>
          </div>
        </div>

        <p className="font-satoshi" style={{ color: '#E7D9BE', fontSize: '60px', fontWeight: 'bold', paddingTop: '100px'}}>
          1 Step to <span className="blue-underline">BUILD</span> your contract
        </p>

        <div id="section2e" className="flex justify-center items-center">
            <div id="section2f" className="flex flex-col justify-center items-center p-10">
              <img src={'./src/pics/step1a.png'} className="p-5"/>
              <p className="font-satoshi" style={{color:'#E7D9BE', fontSize: '20px', fontWeight: 'regular'}}>File Upload</p>
              <p className="font-satoshi" style={{color:'#E7D9BE', fontSize: '25px', fontWeight: 'bold'}}>Transcribe with GPT</p>
            </div>

            <img src={'./src/pics/arrow.png'} className="p-5"/>
            
            <div id="section2f" className="flex flex-col justify-center items-center p-10">
              <img src={'./src/pics/step2a.png'} className="p-5"/>
              <p className="font-satoshi" style={{color:'#E7D9BE', fontSize: '20px', fontWeight: 'regular'}}>Hume AI Conversations</p>
              <p className="font-satoshi" style={{color:'#E7D9BE', fontSize: '25px', fontWeight: 'bold'}}>Understanding your contract</p>
            </div>
          </div>

          <p className="font-satoshi pt-10" style={{color:'#E7D9BE', fontSize: '15px', fontWeight: 'regular'}}> © 2024 LegalEase. All Rights Reserved. </p>
      </div>
    </>
  )
}

export default Home;