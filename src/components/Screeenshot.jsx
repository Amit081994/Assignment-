import React, { useState } from 'react'
import html2canvas from "html2canvas";
const Screeenshot = () => {
    const [first, setfirst] = useState()

    const handleCaptureClick = async () => {
        const canvas = await html2canvas(document.body);
        const dataURL = canvas.toBlob('image/png');
        setfirst(dataURL)
        
    };

    return (
        <>
            <button onClick={handleCaptureClick} >Click</button>
            <img src={first} alt='' />
        </>

    )
}

export default Screeenshot