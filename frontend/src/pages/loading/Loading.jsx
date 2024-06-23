import React from 'react';
import LoadComp from './LoadComp.jsx'; 

const Loading = () => {
    return (
        <div id="section1" className="flex flex-col justify-center items-center h-screen">
        <LoadComp />
            <div className="loading-container flex flex-col justify-center align-center">
                {/* <div className="spinner"></div> */}
                <p className="loading-text block text-white font-bold mb-2">Generating your contract...</p>
            </div>
        </div>
    );
};

export default Loading;
