import React, { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';

const Contract = ({ headers, contractData }) => {
  const [parsedContractData, setParsedContractData] = useState([]);

  useEffect(() => {
    if (contractData && contractData.length > 0) {
      const parsedData = contractData
        .filter(section => section)
        .map(section => {
          try {
            return JSON.parse(section);
          } catch (error) {
            console.error('Invalid JSON:', error);
            return null;
          }
        })
        .filter(section => section);

      setParsedContractData(parsedData);
    } else {
      setParsedContractData([]);
    }
  }, [contractData]);

  const generatePdf = () => {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Set initial y position for text
    let y = 10;

    // Add title
    doc.setFontSize(20);
    doc.text('Contract Details', 105, y, { align: 'center' });
    y += 10;

    // Add contract sections
    parsedContractData.forEach((section, index) => {
      // Add section title
      if (headers[index]) {
        if (y + 10 > doc.internal.pageSize.height) {
          doc.addPage();
          y = 10;
        }
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text(headers[index], 15, y);
        doc.setFont('helvetica', 'normal');
        y += 10;
      }

      Object.keys(section).forEach(key => {
        let content = '';

        if (typeof section[key] === 'string') {
          content = section[key];
        } else if (Array.isArray(section[key])) {
          content = section[key]
            .map(item => Object.entries(item).map(([k, v]) => `${k}: ${v}`).join('\n'))
            .join('\n\n');
        } else {
          content = Object.entries(section[key])
            .map(([k, v]) => `${k}: ${v}`)
            .join('\n\n');
        }

        // Split content into paragraphs to fit the page width
        const paragraphs = doc.splitTextToSize(content, 180); // Adjust width as needed

        // Add paragraphs to the document
        paragraphs.forEach((paragraph, i) => {
          const lineHeight = 7; // Line height
          const paragraphHeight = paragraph.split('\n').length * lineHeight;
          if (y + paragraphHeight > doc.internal.pageSize.height) {
            doc.addPage();
            y = 10;
          }
          doc.setFontSize(12);
          doc.text(paragraph, 15, y);
          y += paragraphHeight;
        });

        y += 10; // Spacing between sections
      });

      y += 10; // Spacing between sections
    });

    // Save the PDF
    doc.save('contract_details.pdf');
  };

  if (parsedContractData.length === 0) {
    return <p>No contract data available.</p>;
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
        
        {/* <button onClick={generatePdf} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
          Generate PDF
        </button> */}

          <div className="relative group mt-10">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-red to-blue rounded-lg blur opacity-75"></div>
              <button onClick={generatePdf} className="relative w-full bg-black text-white text-2xl font-bold py-4 rounded-md
              group-hover:bg-blue group-hover:text-black transition-colors duration-300 ease-in-out">
                  Generate PDF
              </button>
          </div>

      </div>
    </div>
  );
};

export default Contract;
