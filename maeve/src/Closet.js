import React, { useState } from 'react';
import { Link } from "react-router-dom";
import shadow from './assets/shadow.png';
import bow from './assets/bow.png';
import bigpinkbutton from './assets/bigpinkbutton.png';
import deleteicon from './assets/delete.png';
import spotlight from './assets/spotlight.png';
import './Closet.css';
import Popup from './popup';
import { withAuthInfo, useLogoutFunction, useRedirectFunctions } from '@propelauth/react';

function Closet() {
    const categories = ['tops', 'bottoms', 'dresses', 'shoes'];
    const [files, setFiles] = useState({
        tops: [],
        bottoms: [],
        dresses: [],
        shoes: []
    });
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('tops'); // Set "tops" as the default selected category
    const [animate, setAnimate] = useState(false); // State for animation trigger
    const logoutFunction = useLogoutFunction();
    const [recentlyUploadedImage, setRecentlyUploadedImage] = useState(null);
    const [buttonPopup, setButtonPopup] = useState(false);

    // Handle file input change
    function handleChange(e) {
        const fileObj = e.target.files[0];
        if (fileObj) {
            const fileUrl = URL.createObjectURL(fileObj);
            setFiles((prevFiles) => ({
                ...prevFiles,
                [selectedCategory]: [...prevFiles[selectedCategory], fileUrl]
            })); // Add the new file URL to the selected category
            setRecentlyUploadedImage(fileUrl); // Set recentlyUploadedImage to the new file URL
        }
    }

    // Handle image click to select an image
    function handleImageClick(url) {
        setSelectedImage(url); // Store the clicked image URL
        setAnimate(true); // Trigger animation

        // Reset animation state after a brief moment
        setTimeout(() => {
            setAnimate(false);
        }, 300); // Match this duration with your CSS animation duration
    }

    // Handle the click on the custom "Add new" button
    function handleAddNewClick() {
        document.getElementById('fileInput').click();
        setButtonPopup(true); // Programmatically click the hidden file input
    }

    // Handle category selection
    function handleCategoryChange(category) {
        setSelectedCategory(category); // Update the selected category
    }

    // Handle deleting the selected image
    function handleDeleteImage() {
        if (selectedImage) {
            setFiles((prevFiles) => {
                const updatedCategoryFiles = prevFiles[selectedCategory].filter(file => file !== selectedImage);
                return {
                    ...prevFiles,
                    [selectedCategory]: updatedCategoryFiles
                };
            });
            setSelectedImage(null); // Clear selected image
        }
    }

    return (
        <div className="bg-[url('./assets/wall.png')] w-screen h-screen bg-cover bg-center flex items-center text-plat-white font-times italic animate-fade">
            {/* Back Button */}
            <Link to="/" className="absolute top-4 left-4">
                <img src={bow} alt="back" className="w-24 h-24 animate-wiggle hover:animate-wiggle-more"/>
            </Link>

            {/*logout button*/}
            <div className="top-12 left-32 pr-10 absolute font-times text-3xl text-plat-blue hover:text-plat-blue transition-transform duration-300 hover:scale-105 italic">
                <button className="italic" onClick={() => logoutFunction(true)}>logout</button>
            </div>

            {/* Left Section */}
            <div className="basis-3/6 box-border h-screen p-4 border-4">
                {selectedImage ? (
                    <div>
                        {/* Delete Button */}
                        <button onClick={handleDeleteImage} className="absolute self-end text-white p-4 bg-opacity-50">
                            <img src={deleteicon}
                                 className="absolute w-20 rounded hover:animate-jump cursor-pointer mt-24"
                                 alt="delete icon"/>
                        </button>
                        <img src={spotlight} className="absolute h-full -mt-20 ml-32 mix-blend-soft-light animate-infinite animate-alternate animate-duration-1000 animate-fade"/>
                        <div className={`flex flex-col items-center ${animate ? 'animate-fade-down' : ''}`}>
                            <img src={selectedImage} alt="selected" className="my-36 h-96 w-96 p-4"/>
                            <img src={shadow} className="w-64"/>
                        </div>
                        <Link to="/try" className="absolute left-0 bottom-4 -ml-8">
                            <div className={`relative ${animate ? 'animate-fade-right' : ''}`}>
                                <img src={bigpinkbutton} alt=""
                                     className="w-80 h-auto mix-blend-hard-light cursor-pointer hover:shadow-pink-glow"/>
                                <span
                                    className="absolute inset-0 flex items-center justify-center font-times italic text-5xl text-white transition-transform duration-300 hover:scale-105">try it on!</span>
                            </div>
                        </Link>
                    </div>
                ) : (
                    <p></p>
                )}
            </div>

            {/* Right Section */}
            <div className="basis-1/2 box-border h-screen p-12 bg-plat-white bg-opacity-40 flex flex-col shadow-glow">
                {/* Category Headers */}
                <div className="-ml-4 flex justify-around text-3xl italic mb-4">
                    {categories.map((category) => (
                        <div
                            key={category}
                            className={`cursor-pointer ${selectedCategory === category ? 'text-dark' : 'text-dark-plat-blue'}`}
                            onClick={() => handleCategoryChange(category)} // Change category on click
                        >
                            {category}
                        </div>
                    ))}
                </div>

                <div className="flex flex-wrap overflow-y-auto max-h-full">
                    {/* Display uploaded images for the selected category */}
                    {files[selectedCategory] && files[selectedCategory].map((url, index) => (
                        <img
                            key={index}
                            className={`box-border m-4 h-44 w-44 p-8 transition-transform duration-300 hover:scale-105
                            cursor-pointer bg-opacity-50 ${selectedImage === url ? 'bg-plat-pink shadow-pink-glow' : 'bg-plat-white shadow-glow'}`}
                            src={url}
                            alt={`uploaded ${selectedCategory} ${index + 1}`}
                            onClick={() => handleImageClick(url)} // On click, set the clicked image as selected
                        />
                    ))}

                    {/* "Add New" Block */}
                    <div
                        className="box-border m-4 h-48 w-44 p-8 flex justify-center items-center transition-transform duration-300 hover:scale-105
                        bg-plat-white cursor-pointer border-4 border-dashed text-7xl font-bold text-plat-white mix-blend-soft-light shadow-glow bg-opacity-10"
                        onClick={handleAddNewClick}
                    >
                        +
                    </div>
                    <Popup
                        trigger={buttonPopup}
                        setTrigger={setButtonPopup}
                        selectedImage={recentlyUploadedImage} // Pass the most recent upload
                    />
                </div>
                {/* Hidden file input */}
                <input
                    id="fileInput"
                    type="file"
                    className="hidden"
                    onChange={handleChange}
                    accept="image/*" // Optional: Accept only image files
                />
            </div>
        </div>
    );
}

export default Closet;
