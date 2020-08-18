import React, {useState,useEffect} from 'react'
import './app.scss'

const app = () => {
    const contents = [
        <img src={require(`./images/1.jpg`)} />,
        <h2 style={{textAlign:'center'}}> This is Text content :) </h2>,
        <img src={require(`./images/2.jpg`)} />,
        <img src={require(`./images/3.jpg`)} />,
        <h2> This one also text element </h2>,
        <img src={require(`./images/4.jpg`)} />
    ];
    const firstContent = contents[0];
    const lastContent = contents[contents.length-1];
    const contentsLoop = [lastContent,...contents,firstContent];

    const [sliderWidth,setSliderWidth] = useState(null);
    const [slideWidth,setSlideWidth] = useState(null);
    const [sliderTransform,setsliderTransform] = useState(null);
    const [sliderTransition,setsliderTransition] = useState('transform 1s ease-in-out');
    const [count, setCount] = useState(1);
    const [firstX,setFirstX] = useState(null);
    const [lastX,setLastX] = useState(null);

    

    const handleWindow = () => {
        setSliderWidth(window.innerWidth * contentsLoop.length);
        setSlideWidth(window.innerWidth);
        setsliderTransform('translateX('+(-window.innerWidth*count)+'px)');
    }

    window.addEventListener("resize",handleWindow);
    
    useEffect(() => {
        handleWindow();  
        const timer = setInterval(nextSlide,4000);
        return () => {
            clearInterval(timer);
        }
    });

    

    const transitionEnd = () => {
        if(count === contentsLoop.length-1){
            setsliderTransition("none");
            setCount(1);
            setsliderTransform('translateX('+(-slideWidth*count)+'px)');  
        }
        if(count === 0){
            setsliderTransition("none");
            setCount(contentsLoop.length-2);
            setsliderTransform('translateX('+(-slideWidth*count)+'px)');
        }
    }

    const prevSlide = () => {
        setsliderTransition('transform 1s ease-in-out');
        if(count>0){
            setCount(count-1);
        }else {
            setCount(contentsLoop.length-2);
        }
    }

    const nextSlide = () => { 
        setsliderTransition('transform 1s ease-in-out');
        if(count<contentsLoop.length-1){
            setCount(count+1);
        } else {
            setCount(1);
        }
    }

    const swipe = () => {
        if(firstX > lastX){
            nextSlide();
        }
        if(lastX > firstX){
            prevSlide();
        }
    }

    return (
        <div className="slider-container">
            <div 
            className="slider" 
            onTransitionEnd={transitionEnd}
            onTouchStart={(e)=>{
                setFirstX(e.changedTouches[0].screenX);
            }}
            onTouchMove={(e)=>{
                setLastX(e.changedTouches[0].screenX);
                swipe();
            }}
            style={{
                width:sliderWidth,
                transform:sliderTransform,
                transition:sliderTransition
                }}>
                {contentsLoop && contentsLoop.map( (content,key) => {
                        return <div 
                        className="slide" 
                        key={key} 
                        style={{width:slideWidth}}>
                            {content}
                        </div>
                    })} 
            </div>
            <div className="prev" onTouchStart={prevSlide} onClick={prevSlide}>
                Prev
            </div>
            <div className="next" onTouchStart={nextSlide} onClick={nextSlide}>
                Next
            </div>
            <div className="dots">
            {contentsLoop && contentsLoop.map((content,key) => {
                if(key>0 && key < contentsLoop.length-1){
                return <input 
                type="radio" 
                id={key} 
                onChange={() => setCount(key)} 
                name="content" 
                key={key} 
                checked={key === count ? true:false}/>
                }
            })}
            </div>
        </div>
    )
}

export default app;
