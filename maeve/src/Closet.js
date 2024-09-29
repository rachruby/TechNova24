import React, { useState, useEffect } from 'react';
import './Closet.css';

function Closet() {
  var FileObj = [];
  var FileArray = [];
  const [File, setFile] = useState([]);

  
  function handleChange(e) {
    FileObj.push(e.target.files);
    FileArray.push(URL.createObjectURL(FileObj[0][0]));
    setFile([...File, FileArray]);
  };

  return (

    <div class="flex">
      <div class="basis-3/5 box-border h-screen p-4 border-4">01</div>
      <div class="basis-2/5 box-border h-screen p-4 border-4">
        <button> + </button>
        <input type="file" onChange={handleChange} />
        {File.map((url, index) => (
          <img key={index} class="box-border h-24 w-24 p-4 border-2" src={url} alt="uploaded item" />
        ))}
        

      </div>
    </div>
  );

}
export default Closet;