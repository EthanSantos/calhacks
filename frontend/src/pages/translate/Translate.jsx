import React, { useState } from 'react';
import axios from 'axios';
import pdfToText from 'react-pdftotext'; // Assuming this is the correct library
import TransComp from './TransComp.jsx'; // Adjust the path if MyComponent is in a different directory
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
  const extractText = () => {
    setIsSubmitted(true)
    if (file) {
      pdfToText(file)
        .then(text => {
          console.log(text);
          setContract(text);
        })
        .catch(error => console.error("Failed to extract text from pdf", error));
    }
  };

  const searchYou = async () => {
    const options = {
        method: 'POST',
        headers: {
            'X-API-Key': '65c95fb3-7f81-4a01-9419-b6f150340e56<__>1PTsFeETU8N2v5f4qmtDZVGS',
            'Content-Type': 'application/json'
        },
        body: '{"query":"What does UCLA stand for?","chat_id":"3c90c3cc-0d44-4b50-8888-8dd25736052a"}'
      };
      
      fetch('https://chat-api.you.com/smart', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
  }
  

  return (
    <div id="section1" className="flex flex-col justify-center items-center h-screen mt-[260px] mb-6">
      <TransComp/>
      <Navbar/>
      <div className="w-full h-[800px] justify-center align-center text-center">
        <p className="font-satoshi font-medium text-[50px] text-transparent bg-clip-text bg-gradient-to-r from-blue to-darkblue mt-[-60px]">Let's translate your contract</p>
        <div className="flex flex-col w-[60%] h-[50%] bg-brown mx-auto p-6 mt-8 relative border-4 border-white border-solid rounded-[50px] ">
          <label htmlFor="fileUpload" className="absolute inset-0 flex flex-col justify-center items-center cursor-pointer">
            <img src={'./src/pics/upload.png'} alt="Upload" className="mx-auto mt-11 mb-[-20px] transition-transform duration-300 transform hover:scale-110" />
          </label>
          <input id="fileUpload" type="file" accept="application/pdf" onChange={handleFileChange} className="hidden"/>
          <button className="flex items-center mx-auto my-2 text-[30px] text-white" onClick={extractText}>
            <span className="font-bold">Choose a file </span>
            <span className="mx-1">or click</span>
            <span className="underline">here</span>
          </button>
          {/* {contract && (
            <div>
              <h2>Extracted Text:</h2>
              <pre>{contract}</pre>
            </div>
          )} */}
          {isSubmitted && (
            <object data={URL.createObjectURL(file)} type="application/pdf" width="100%" height="600px">
              <p>Alternative text - include a link <a href={URL.createObjectURL(file)}>to the PDF!</a></p>
            </object>
          )}
        </div>
      </div>
    </div>
  );
};

export default Translate;