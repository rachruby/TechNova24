import React, { useState } from 'react';
import './popup.css';

function Popup(props) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const handleNameChange = (event) => {
        setName(event.target.value);// Update state with input field value
        console.log(name);
    };
    const handleDescriptionChange = (event) => {

        setDescription(event.target.value); // Update state with input field value
        console.log(description);
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the form from reloading the page
        console.log('Submitted value:', name, description);
        const csvContent = `data:text/csv;charset=utf-8,Name,Description\n${name},${description}`;
        const encodedUri = encodeURI(csvContent);
        alert("Name and Description Submitted Successfully!");
        {/*// Create an anchor element to download the CSV file
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'data.csv');
        document.body.appendChild(link); // Required for Firefox
        link.click();
        document.body.removeChild(link); // Clean up the link element*/}

        // Reset form inputs after submission
        setName('');
        setDescription('');
        props.setTrigger(false);
    };

    const handleClose = () => {
        setName('');
        setDescription('');
        props.setTrigger(false); 
    };

    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <div><form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                        />
                    </label>
                    <label>
                        Description:
                        <input
                            type="text"
                            value={description}
                            onChange={handleDescriptionChange}
                        />
                    </label>
                    <button type="submit" className="submit-btn" >Submit</button>
                    
                </form></div>
                <button className="close-btn" onClick={handleClose}>Close</button>
                {props.children}
            </div>


        </div>
    ) : "";
}

export default Popup;