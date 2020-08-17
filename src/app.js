import React from 'react'
import Slider from './slider.js'
import './app.scss'

const app = () => {
    const images = ['1.jpg','2.jpg','3.jpg','4.jpg'];
    const firstImage = images[0];
    const lastImage = images[images.length-1];
    const imagesLoop = [lastImage,...images,firstImage];


    return (
        <div className="slider-container">
            <Slider images={imagesLoop}/>
        </div>   
    )
}

export default app;
