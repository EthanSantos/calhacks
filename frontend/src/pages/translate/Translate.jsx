import React, { useState } from 'react';
import axios from 'axios';

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
    <div className="w-full h-screen p-5 bg-gray-100">
      <div className="max-w-md mx-auto">
        <input type="file" accept="application/pdf" onChange={handleFileChange} className="block w-full text-sm text-gray-700 border rounded-lg cursor-pointer focus:outline-none" />
        <button onClick={parsePDF} className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Submit
        </button>
      </div>
      {isLoading ? (
        <p className="text-center">Parsing your PDF and fetching sources...</p>
      ) : (
        contractDetails && Object.entries(contractDetails).map(([section, details]) => (
          <div key={section} className="mt-4 p-5 bg-white rounded-lg shadow grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg shadow">
              <h2 className="text-xl font-bold">{section}</h2>
              <p>{details.content}</p>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg shadow">
              {details.analysis && (
                <>
                  <h3 className="text-lg font-semibold">Analysis</h3>
                  <p>{details.analysis.answer}</p>
                  {details.analysis.search_results && details.analysis.search_results.slice(0, 3).map((result, index) => (
                    <div key={index}>
                      <a href={result.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline">{result.url}</a>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Translate;
