import React, { useState } from 'react';
import axios from 'axios';
import TransComp from './TransComp.jsx';
import Navbar from '../../navbar/Navbar.jsx';

const Translate = () => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [contractDetails, setContractDetails] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const parsePDF = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await axios.post('http://localhost:8000/api/parse-text', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setContractDetails(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error parsing PDF:', error);
    }
    setIsLoading(false);
  };

  return (
    <div id="section1" className="flex flex-col items-center h-screen overflow-y-auto">
      <TransComp/>
      <div className="w-full max-w-[1400px] mx-auto mt-[300px] mb-20 px-4 sm:px-6 lg:px-8">
        <Navbar />
        {!contractDetails && !isLoading && (
          <>
            <p className="font-satoshi font-medium text-[50px] text-transparent bg-clip-text bg-gradient-to-r from-blue to-darkblue mt-[-60px] mb-8 text-center">
              Let's translate your contract
            </p>
            <div className="max-w-md mx-auto mt-8">
              <div className="bg-brown p-6 rounded-[50px] border-4 border-white mb-4">
                <label htmlFor="fileUpload" className="block cursor-pointer">
                  <img src={'./src/pics/upload.png'} alt="Upload" className="mx-auto transition-transform duration-300 transform hover:scale-110" />
                </label>
                <input id="fileUpload" type="file" accept="application/pdf" onChange={handleFileChange} className="hidden"/>
              </div>
              <button onClick={parsePDF} className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                Submit
              </button>
            </div>
          </>
        )}
        {isLoading && (
          <div className="loading-container2 flex flex-col justify-center align-center">
            {/* <div className="spinner"></div> */}
            <p className="loading-text block text-white font-bold mb-2">Translating your contract...</p>
          </div>
        )}
        {contractDetails && (
          Object.entries(contractDetails).map(([section, details]) => (
            <div key={section} className="mt-8 bg-white rounded-lg shadow overflow-hidden">
              <h2 className="text-xl font-bold bg-gray-800 text-white p-4">{section}</h2>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 p-6">
                <div className="bg-gray-50 rounded-lg shadow p-5">
                  <h3 className="text-lg font-semibold mb-3">Content</h3>
                  <p className="text-gray-700">{details.content}</p>
                </div>
                <div className="bg-gray-100 rounded-lg shadow p-5">
                  {details.analysis && (
                    <>
                      <h3 className="text-lg font-semibold mb-3">Analysis</h3>
                      <p className="mb-4 text-gray-700">{details.analysis.answer}</p>
                      {details.analysis.search_results && details.analysis.search_results.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-2">Sources:</h4>
                          {details.analysis.search_results.slice(0, 3).map((result, index) => (
                            <div key={index} className="mb-1">
                              <a href={result.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline">{result.url}</a>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Translate;