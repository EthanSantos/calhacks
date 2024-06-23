import React, { useState } from 'react';
import pdfToText from 'react-pdftotext'; // Assuming this is the correct library

const Translate = () => {
  const [file, setFile] = useState(null);
  const [contract, setContract] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [answer, setAnswer] = useState('')

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
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
    <div style={{ width: '100%', height: '800px' }}>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button onClick={extractText}>Submit</button>
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
  );
};

export default Translate;
