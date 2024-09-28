import React, { useState} from 'react';
import './Closet.css'; 

function Closet() {
    const [file, setFile] = useState();
    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }
  return (
    <div class="flex">
      <div class="basis-3/5 box-border h-screen p-4 border-4">01</div>
      <div class="basis-2/5 box-border h-screen p-4 border-4">
      <div><input type="file" onChange={handleChange} />
      {clothes(file)}</div>
      </div>
    </div>
  );

function clothes(top) {
    return (
      <div class="box-border h-24 w-24 p-4 border-2">
        <img src={top} alt="Top" />
      </div>
    );
  }
}
export default Closet;