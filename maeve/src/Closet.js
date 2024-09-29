import React, { useState, useEffect } from 'react';
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
    const [selectedCategory, setSelectedCategory] = useState('tops');
    const [animate, setAnimate] = useState(false);
    const logoutFunction = useLogoutFunction();
    const [recentlyUploadedImage, setRecentlyUploadedImage] = useState(null);
    const [buttonPopup, setButtonPopup] = useState(false);
    const [averageColor, setAverageColor] = useState(null); // State for average color
    const [season, setSeason] = useState(""); // State for season

    // Handle file input change
    function handleChange(e) {
        const fileObj = e.target.files[0];
        if (fileObj) {
            const fileUrl = URL.createObjectURL(fileObj);
            setFiles((prevFiles) => ({
                ...prevFiles,
                [selectedCategory]: [...prevFiles[selectedCategory], fileUrl]
            }));
            setRecentlyUploadedImage(fileUrl);
        }
    }

    // Handle image click to select an image and calculate average color
    function handleImageClick(url) {
        setSelectedImage(url);
        setAnimate(true);

        // Calculate the average color when an image is selected
        const imageElement = new Image();
        imageElement.src = url;
        imageElement.onload = () => {
            const { R, G, B } = getAverageColor(imageElement, 100);
            setAverageColor(`rgb(${R}, ${G}, ${B})`); // Set the average color
            setSeason(determineSeason(R, G, B)); // Determine the season
        };

        setTimeout(() => {
            setAnimate(false);
        }, 300);
    }

    // Function to calculate the average color of an image
    function getAverageColor(imageElement, ratio) {
        const canvas = document.createElement("canvas");
        // Optionally, resize the canvas to improve performance
        const MAX_DIMENSION = 500;
        let { naturalWidth: width, naturalHeight: height } = imageElement;
        if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
            const scale = Math.min(MAX_DIMENSION / width, MAX_DIMENSION / height);
            width = Math.floor(width * scale);
            height = Math.floor(height * scale);
        }
        canvas.width = width;
        canvas.height = height;

        const context = canvas.getContext("2d");
        context.drawImage(imageElement, 0, 0, width, height);

        let data;
        try {
            data = context.getImageData(0, 0, width, height);
        } catch (err) {
            console.error(err);
            return { R: 0, G: 0, B: 0 };
        }

        let R = 0, G = 0, B = 0;
        let count = 0;

        for (let i = 0; i < data.data.length; i += 4 * ratio) {
            const alpha = data.data[i + 3];
            // Ignore fully transparent pixels
            if (alpha === 0) continue;

            // Optionally, weight by alpha (semi-transparent pixels)
            const weight = alpha / 255;

            R += data.data[i] * weight;
            G += data.data[i + 1] * weight;
            B += data.data[i + 2] * weight;
            count += weight;
        }

        if (count === 0) return { R: 0, G: 0, B: 0 };

        R = Math.round(R / count);
        G = Math.round(G / count);
        B = Math.round(B / count);

        return { R, G, B };
    }

    // Function to determine the season based on the average color
    function determineSeason(R, G, B) {
        const brightness = (R + G + B) / 3;

        if (R > G && R > B) {
            if (brightness > 180) {
                return "summer"; // Warm colors
            } else {
                return "fall"; // Dark neutrals
            }
        } else if (G > R && G > B) {
            return "spring"; // Bright neutrals
        } else {
            return "winter"; // Cool colors
        }
    }

    // Handle the click on the custom "Add new" button
    function handleAddNewClick() {
        document.getElementById('fileInput').click();
        setButtonPopup(true);
    }

    // Handle category selection
    function handleCategoryChange(category) {
        setSelectedCategory(category);
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
            setSelectedImage(null);
            setAverageColor(null); // Reset average color
            setSeason(""); // Reset season
        }
    }

    return (
        <div className="bg-[url('./assets/wall.png')] w-screen h-screen bg-cover bg-center flex items-center text-plat-white font-times italic animate-fade">
            {/* Back Button */}
            <Link to="/" className="absolute top-4 left-4">
                <img src={bow} alt="back" className="w-24 h-24 animate-wiggle hover:animate-wiggle-more" />
            </Link>

            {/* Logout Button */}
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
                                alt="delete icon" />
                        </button>
                        <img src={spotlight} className="absolute h-full -mt-20 ml-32 mix-blend-soft-light animate-infinite animate-alternate animate-duration-1000 animate-fade" />
                        <div className={`flex flex-col items-center ${animate ? 'animate-fade-down' : ''}`}>
                            <img src={selectedImage} alt="selected" className="my-36 h-96 w-96 p-4" />
                            <img src={shadow} className="w-64" />
                        </div>

                        {/* Display average color */}
                        {averageColor && (
                            <div className="absolute left-4 bottom-56 w-24 h-14 rounded-lg" style={{ backgroundColor: averageColor }}>
                                <p className="mt-4 font-times italic text-2xl text-center text-white">{season}</p>
                            </div>
                        )}
                        <Link to="/try" className="absolute left-0 bottom-4 -ml-8">
                            <div className={`relative ${animate ? 'animate-fade-right' : ''}`}>
                                <img src={bigpinkbutton} alt=""
                                    className="w-80 h-auto mix-blend-hard-light cursor-pointer hover:shadow-pink-glow" />
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
                            onClick={() => handleCategoryChange(category)}
                        >
                            {category}
                        </div>
                    ))}
                </div>

                <Link to="http://localhost:8501" target="_blank">bg remove please</Link>
                <div className="flex flex-wrap overflow-y-auto max-h-full">
                    {/* Display uploaded images for the selected category */}
                    {files[selectedCategory] && files[selectedCategory].map((url, index) => (
                        <img
                            key={index}
                            className={`box-border m-4 h-44 w-44 p-8 transition-transform duration-300 hover:scale-105
                            cursor-pointer bg-opacity-50 ${selectedImage === url ? 'bg-plat-pink shadow-pink-glow' : 'bg-plat-white shadow-glow'}`}
                            src={url}
                            alt={`uploaded ${selectedCategory} ${index + 1}`}
                            onClick={() => handleImageClick(url)}
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
                        selectedImage={recentlyUploadedImage}
                    />
                </div>

                {/* Hidden file input */}
                <input
                    id="fileInput"
                    type="file"
                    className="hidden"
                    onChange={handleChange}
                    accept="image/*"
                />
            </div>
        </div>
    );
}

export default Closet;
