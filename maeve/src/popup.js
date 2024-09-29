import React, { useState } from 'react';
import './popup.css';
import bigpinkbutton from "./assets/bigpinkbutton.png";
import {Link} from "react-router-dom";

function Popup(props) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value); // Update state with input field value
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value); // Update state with input field value
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the form from reloading the page
        console.log('Submitted value:', name, description);
        alert(name + " description submitted successfully!");

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

    return props.trigger ? (
        <div className="popup fixed inset-0 flex flex-col items-center justify-center bg-opacity-60 bg-dark-plat-blue">
            {props.selectedImage && (
                <div className="mt-4 flex justify-center">
                    <img
                        src={props.selectedImage}
                        alt="Selected"
                        className="w-64 h-auto mx-auto -my-8"
                    />
                </div>
            )}
            <div className="relative w-2/3 h-1/2 bg-dark-plat-blue shadow-glow rounded-lg p-8 bg-opacity-80 mix-blend-soft-light">
                <button className="absolute top-4 right-4 text-plat-blue text-2xl font-bold" onClick={handleClose}>
                    ✕
                </button>
                <div className="flex flex-col space-y-4 italic text-plat-blue text-lg font-times">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <label className="block">
                            <span className="text-2xl text-dark">name*</span>
                            <input
                                className="w-full mt-2 p-2 bg-opacity-30 bg-plat-blue"
                                type="text"
                                value={name}
                                onChange={handleNameChange}
                                required
                            />
                        </label>
                        <label className="block">
                            <span className="text-2xl text-dark">description <span className="text-plat-blue">(optional)</span></span>
                            <input
                                className="w-full min-h-40 mt-2 p-2 bg-opacity-30 bg-plat-blue"
                                type="text"
                                value={description}
                                onChange={handleDescriptionChange}
                            />
                        </label>
                        <div className="relative">
                            {/* This div controls the positioning of the button */}
                            <button
                                type="submit"
                                className="hover:bg-opacity-80 transition duration-200 absolute -right-28 -top-36"
                                style={{transform: 'translateX(50%)'}} // This offsets half of the button width
                            >
                                <div className="relative transition-transform duration-300 hover:scale-105">
                                    <img src={bigpinkbutton} alt="" className="w-40 h-auto mix-blend-hard-light"/>
                                    <span
                                        className="absolute inset-0 flex items-center justify-center text-4xl font-times italic text-white">create</span>
                                </div>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    ) : null;
}

export default Popup;
