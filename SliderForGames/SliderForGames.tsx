import { useEffect, useRef, useState } from 'react';
import styles from './SliderForGames.module.scss';
import gamePick from '../../img/tbg_crash.webp';
import PlayingCardds from '../../SVG/PlayingCardds/PlayingCardds';
import Arrow from '../../SVG/Arrow/Arrow';


export default function SliderForGames() {
    const wrap = useRef<HTMLDivElement | null>(null);
    const container = useRef<HTMLDivElement | null>(null);
    const content = useRef<HTMLDivElement | null>(null);
    const hiden = useRef<HTMLDivElement | null>(null);

    const games = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11,12,13,14,15];

    const [boxWidth, setBoxWidth] = useState<number>(165); 

    const [sliderContainer, setSliderContainer] = useState<number | null>(null);
    const [step, setStep] = useState<number>(0);
    const [firstClick, setFirstClick] = useState<boolean>(false); 
    const [widthDisplay, setWidthDisplay] = useState(window.innerWidth);
    const [widthSlider,setWidthSlider] = useState(0)
    const [clickCount, setClickCount] = useState<number>(0); 
    const [maxClicks, setMaxClicks] = useState<number>(0); 
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    const [test ,setTest] = useState(0)

  

    useEffect(() => {
       
        if (container.current) {
         
            const width = container.current.offsetWidth;

            const gap = parseFloat(getComputedStyle(container.current).rowGap);

            const totalWidthWithGap = (boxWidth + gap);

            const newWidth = (width + (5 * games.length) )
        
            const after = (((width / (boxWidth )  % 1) * 100 ) - 100);

            const step = (((width / boxWidth)  % 1) > 50 ? ((width / boxWidth)  % 1) * 100 : Math.abs(after) )

            setTest(step); 
            
        }
    }, [container.current, widthSlider]);


    useEffect(() => {
        if (container.current) {
            const width = container.current.offsetWidth;
            setWidthSlider(width);
            setMaxClicks(Math.ceil(games.length - (width / boxWidth ) )); 
        }
    }, []);

   
    
    const nextSlide = () => {
        if (clickCount < maxClicks) { 
            if (!firstClick) {
                if (test !== 0) {
                    setStep(prev => prev + test);
                    setFirstClick(true);
                }
            } else {
                setStep(prev => prev + 100);
            }
            setClickCount(prev => prev + 1); 
        }else {
            setStep(0)
            setClickCount(0)
        }
        
    };
    
    const prevSlide = () => {
       
        if(clickCount === 0) return 0
        if (firstClick) {
                setStep(prev => prev - test); 
                setFirstClick(false);
                setClickCount(prev => prev - 1)
               

        } else {
            setClickCount(prev => prev - 1)
            setStep(prev => prev - 100);
        }
    };
    
    const handleTouchStart = (event: React.TouchEvent) => {
        const start = event.targetTouches[0].clientX
        console.log("handleTouchStart:", start)
        setTouchStart(start);
    };

    const handleTouchMove = (event: React.TouchEvent) => {
        const move = event.targetTouches[0].clientX
        
        setTouchEnd(move);
    };

    const handleTouchEnd = () => {



        const swipeThreshold = 5; 
        if (touchStart - touchEnd > swipeThreshold && clickCount < maxClicks) {
            setStep(prev => prev + 1);
        }
    
        if (touchStart - touchEnd < -swipeThreshold && clickCount > 0) {
            setStep(prev => prev - 1);
        }
    };
    
    return (
        <>
            <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
             ref={wrap} className={styles['wrap-slider']}>
            <div className={styles['top-content']}>
                <div className={styles['logo']}>
                    <a>
                        <PlayingCardds color={'#9092B2'} activeColor={''} active={false} />
                        <h1>Roulette and cards</h1>
                    </a>
                    <div className={styles['top-btn']}>
                        <button className={styles['top-btn-L']} onClick={prevSlide}>
                            <Arrow activeColor={''} color={'#9092B2'} />
                        </button>
                        <button className={styles['top-btn-R']} onClick={nextSlide}>
                            <Arrow activeColor={''} color={'#9092B2'} />
                        </button>
                    </div>
                </div>
            </div>
                <div ref={container} className={styles['slider-container']}>
                    {games.map((elem, index) => (
                        <button key={index} ref={hiden} style={{ transform: `translateX(calc(-${step}%))` }} className={styles['content']} ref={content}>
                            <img  src={gamePick} />
                            <p>Crash X {index +1}</p>
                            <span>Turbogames</span>
                        </button>       
                    ))}
                </div>
                {/* <div className={styles['btn']}>
                    <button onClick={prev}>Prev</button>
                    <button onClick={next}>Next</button>
                </div> */}
            </div>
        </>
    )
}
