import React, { useEffect, useState } from 'react';

const Contract = ({ contractData }) => {
  const [parsedContractData, setParsedContractData] = useState([]);

  useEffect(() => {
    if (contractData && contractData.length > 0) {
      const parsedData = contractData
        .filter(section => section) 
        .map(section => {
          try {
            return JSON.parse(section);
          } catch (error) {
            console.error('Invalid JSON:', section);
            return null;
          }
        })
        .filter(section => section);

      setParsedContractData(parsedData);
    } else {
      setParsedContractData([]);
    }
  }, [contractData]);

  if (parsedContractData.length === 0) {
    return <p>No contract data available.</p>
  }

  return (
    <div className="bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Contract Details</h1>
        
        {parsedContractData.map((section, index) => (
          <div key={index} className="mb-6">
            {Object.keys(section).map((key, subIndex) => (
              <div key={subIndex} className="mb-4">
                <h2 className="text-xl font-semibold mb-2">{key}</h2>
                {typeof section[key] === 'string' ? (
                  <p className="bg-gray-200 p-2 rounded whitespace-pre-wrap">{section[key]}</p>
                ) : Array.isArray(section[key]) ? (
                  <ul className="bg-gray-200 p-2 rounded list-disc list-inside">
                    {section[key].map((item, itemIndex) => (
                      <li key={itemIndex}>
                        {Object.entries(item).map(([itemKey, itemValue]) => (
                          <p key={itemKey}><strong>{itemKey}:</strong> {itemValue}</p>
                        ))}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="bg-gray-200 p-2 rounded">
                    {Object.entries(section[key]).map(([itemKey, itemValue]) => (
                      <p key={itemKey}><strong>{itemKey}:</strong> {itemValue}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contract;
