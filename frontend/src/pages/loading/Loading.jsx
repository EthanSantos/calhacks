import React from 'react';

const Loading = () => {
    return (
        <div className="loading-container flex flex-column justify-center align-center">
            {/* <div className="spinner"></div> */}
            <p className="loading-text block text-white font-bold mb-2">Generating your contract...</p>
        </div>
    );
};

export default Loading;
