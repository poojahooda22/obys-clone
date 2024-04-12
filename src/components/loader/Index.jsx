import styles from './Style.module.css'

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

function Loader() {

    setInterval(function() {
        

    }, 100);

    useGSAP(() => {
        const tl = gsap.timeline();
        tl.from('.line h1', {
            y: 150,
            stagger: 0.3,
            duration: 1,
        })

    }) 
    
  return ( 
    <div>
        <div 
            className="loader w-full h-full bg-[#0b0b0b] fixed z-[9] font-[PlinaReg]
            px-[5vw] py-[46vw] leading-[7.8vw] text-[7.4vw] tracking-tighter
            sm:py-[20vh] sm:px-[6vw] uppercase sm:leading-[7vw] sm:tracking-tight sm:text-[7vw]
            xl:text-[5.8vw] xl:leading-[6vw] xl:py-[30vh]"
        >
            <div 
                className={`line ${styles.line} flex flex-col items-start
                sm:flex-row sm:items-center sm:justify-start gap-[2vw]
                
                `}
            >
                <div 
                    className={`part1 ${styles.part1} flex items-center justify-center gap-[1.4vw]
                    font-[silkSerif] text-[4.2vw] leading-[4.5vw] tracking-wide
                    sm:text-[3vw]`}
                >
                    <h5>00</h5>
                    <h6>- 100</h6>
                </div>
                <h1>Your</h1>
            </div>
            <div className={`line ${styles.line}`}>
                <h1>Web Experience</h1>
            </div>
            <div 
                className={` line ${styles.line} flex 
                 sm:items-center sm:justify-start gap-[1.5vw] `}
            >
                <h1>is loading right</h1>
                <h2>Now</h2>
            </div>
        </div>
    </div>
   )
}

export default Loader
