import { useEffect, useRef } from 'react';
import styles from './Style.module.css'
import PropTypes from 'prop-types';
import { useGSAP } from "@gsap/react"
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

UnderLine.propTypes = {
    marginTop: PropTypes.string.isRequired,
    marginBottom: PropTypes.string.isRequired
};


function UnderLine({ marginTop, marginBottom }) {

    const path = useRef(null);
    const wrapperRef = useRef(null);
    let progress = 0;

    let reqId = null;
    let x = 0.5;

    useEffect(() => {
        setPath(progress);
    }, []);

    // Reveal: scaleX 0 -> 1 (right->left), time-driven and fired once on entry.
    // Not scrubbed: a scrubbed tween maps progress onto scroll distance, and a line
    // near the bottom of the document runs out of scroll before its end point is
    // reached, leaving it permanently half-drawn.
    useGSAP(() => {
        if (!wrapperRef.current) return;

        gsap.fromTo(wrapperRef.current,
            { scaleX: 0 },
            {
                scaleX: 1,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: wrapperRef.current,
                    start: 'top 95%',
                    once: true,
                }
            }
        );
    }, { scope: wrapperRef })

    const setPath = (progress) => {
        const { innerWidth } = window;
        const width = innerWidth * 0.7;
        path.current.setAttributeNS("", "d", `M0 50 Q${width * x} ${50 + progress}, ${width} 50`)
    }

    const manageMouseEnter = () => {
        if (reqId) {
            window.cancelAnimationFrame(reqId);
        }
    }

    const manageMouseMove = (e) => {
        const { movementY, clientX } = e;
        const { left, width } = path.current.getBoundingClientRect();
        x = (clientX - left) / width;
        progress += movementY;
        setPath(progress);
    }

    const manageMouseLeave = () => {
        animateOut();
    }

    const lerp = (x, y, a) => x * (1 - a) + y * a;
    let time = (Math.PI / 2);

    const animateOut = () => {
        const newProgress = progress * Math.sin(time);
        time += 0.2;
        setPath(newProgress);
        progress = lerp(progress, 0, 0.025);

        if (Math.abs(progress) > 0.75) {
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
    const dynamicStyles = {
        marginTop: marginTop,
        marginBottom: marginBottom,
        transformOrigin: 'right center',
    };

    return (
        <div className='w-full'>
            <div
                ref={wrapperRef}
                style={dynamicStyles}
                className={`line ${styles.line} relative w-[100%] h-[.25vw] mt-[16vw] mb-[6vw]
            sm:h-[.01vw]`}
            >
                <div
                    className={`box ${styles.box}`}
                    onMouseEnter={manageMouseEnter}
                    onMouseMove={manageMouseMove}
                    onMouseLeave={manageMouseLeave}
                >
                </div>
                <svg className='w-full h-[100px] absolute -top-[50px]'>
                    <path ref={path} className={`path1 ${styles.path1}`} ></path>
                </svg>
            </div>
        </div>
    )
}

export default UnderLine