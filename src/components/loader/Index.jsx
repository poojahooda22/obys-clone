

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

function Loader() {
    useGSAP(() => {
        const tl = gsap.timeline();
        tl.from('.line', {
            y: 100,
            stagger: 0.5,
        })

    }) 
    
  return ( 
    <div>
        <div 
            className="loader w-full h-full bg-[#0b0b0b] fixed z-[9] font-[PlinaReg]
            py-[20vh] px-[8vw] uppercase leading-[7vw] tracking-tight 
            text-[7vw]"
        >
            <div className="line h-fit">
                <h1>Your</h1>
            </div>
            <div className="line h-fit">
                <h1>Web Experience</h1>
            </div>
            <div className="line h-fit">
                <h1>is loading right</h1>
            </div>
        </div>
    </div>
   )
}

export default Loader
