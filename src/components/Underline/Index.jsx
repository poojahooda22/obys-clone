import { useEffect, useRef } from 'react';
import styles from './Style.module.css'


function UnderLine() {

    const path = useRef(null);
    let progress = 0;

    useEffect(() => {
        setPath(progress);
    }, []);

    const setPath = (progress) => {
        const {innerWidth} = window;
        const width = innerWidth * .7;
        path.current.setAttributeNS("", "d", `M0 50 Q${width / 2} ${50 + progress}, ${width} 50`)
    }

    const manageMouseMove = (e) => {
        const {movementY} = e;
        progress += movementY;
        setPath(progress);
    }

    const manageMouseLeave = () => {
        animateOut();
    }

    const lerp = (x,y,a) => x * (1-a) + y * a;
    let time = Math.PI / 2;

    const animateOut = () => {
        const newProgress = progress * Math.sin(time);
        time += 0.2;
        setPath(newProgress);
        progress = lerp(progress, 0, 0.025);

        if(Math.abs(progress) > 0.75) {
        window.requestAnimationFrame(animateOut);
        }
        else {
        resetAnimation();
        }
    }

    const resetAnimation = () => {
        time = Math.PI / 2;
        progress = 0;
    }

  return (
    <div>
        <div 
            className={`line1 ${styles.line1} relative mt-[6vw] mb-[11vw] w-full h-[.25vw] 
            sm:h-[.01vw] sm:mt-[3.8vw] sm:mb-[5vw] `}
        >
            <div 
                className={`box ${styles.box1}`} 
                onMouseMove={manageMouseMove}
                onMouseLeave={manageMouseLeave}
            >
            </div>
            <svg className='w-full h-[100px] absolute -top-[50px]'>
                <path ref={path} className={`path2 ${styles.path2}`} ></path>
            </svg>
        </div>
    </div>
  )
}

export default UnderLine