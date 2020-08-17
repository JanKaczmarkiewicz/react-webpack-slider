import React, {useState,useEffect} from 'react'

const Slider = ({images}) => {
    
    const [sliderWidth,setSliderWidth] = useState(null);
    const [slideWidth,setSlideWidth] = useState(null);
    const [sliderTransform,setsliderTransform] = useState(null);
    const [sliderTransition,setsliderTransition] = useState('transform 1s ease-in-out');
    const [count, setCount] = useState(1);
    const buttons  = [];
    
    
    const handleCount = currentCount => {
        setCount(currentCount);
    }

    
    const handleWindow = () => {
        setSliderWidth(window.innerWidth * images.length);
        setSlideWidth(window.innerWidth);
        setsliderTransform('translateX('+(-window.innerWidth*count)+'px)');
    }

    window.addEventListener("resize",handleWindow);
    
    useEffect(() => {
        handleWindow();  
        // const timer = setInterval(nextSlide,4000);
        return () => {
            // clearInterval(timer);
        }
    });

    

    const transitionEnd = () => {
        if(count === images.length-1){
            setsliderTransition("none");
            handleCount(1);
            setsliderTransform('translateX('+(-slideWidth*count)+'px)');  
        }
        if(count === 0){
            setsliderTransition("none");
            handleCount(images.length-2);
            setsliderTransform('translateX('+(-slideWidth*count)+'px)');
        }
    }

    const prevSlide = () => {
        setsliderTransition('transform 1s ease-in-out');
        if(count>0){
            handleCount(count-1);
        }else {
            handleCount(images.length-2);
        }
    }

    const nextSlide = () => { 
        setsliderTransition('transform 1s ease-in-out');
        if(count<images.length-1){
            handleCount(count+1);
        } else {
            handleCount(1);
        }
    }

    

    for(let i =1, key =0; i < images.length-1;i++,key++){
        buttons.push(<input type="radio" id={i} onChange={() => handleCount(i)} name="image" key={key} checked={
            i === count ? true:false
        }/>);
    }


    return (
        <>
        <div 
        className="slider" 
        onTransitionEnd={transitionEnd}
        style={{
            width:sliderWidth,
            transform:sliderTransform,
            transition:sliderTransition
            }}>
         {images && images.map( (img,id) => {
                return <img src={require(`./images/${img}`)} key={id} alt={id} style={{width:slideWidth}}/>
            })} 
        </div>
        <div className="prev" onTouchStart={prevSlide} onClick={prevSlide}>
            P
        </div>
        <div className="next" onTouchStart={nextSlide} onClick={nextSlide}>
            N
        </div>
        <div className="dots">
            {buttons}
        </div>
        </>
    )
}
export default Slider;