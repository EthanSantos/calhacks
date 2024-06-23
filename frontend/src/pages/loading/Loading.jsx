import React from 'react';

const Loading = () => {
    return (
        <div className="loading-container">
            <div className="spinner"></div>
            <p className="loading-text">Generating your contract...</p>
        </div>
    );
};

export default Loading;
