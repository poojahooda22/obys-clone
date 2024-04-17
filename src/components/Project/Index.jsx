import { useEffect, useRef } from 'react';
import styles from './Style.module.css'

function Project() {

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
    <div className="page3 relative w-full min-h-[100vh]  px-[4vw] py-[6vw]
    sm:px-[4vw]">
        <div  
          className=' sm:flex gap-[5vw] '
        >
          <div className="left">
            <div className=" sm:pl-[14vw] ">
                <div className="font-[silkSerif] text-[4.6vw] 
                    sm:text-[2.6vw] sm:leading-[4vw]"
                >
                    <h2>02</h2>
                </div>             
            </div>
          </div>
          <div className="w-full right">
            <div className="aboutHeading overflow-hidden">
              <h1 className="text-[8vw] leading-[10vw] tracking-tighter
                sm:text-[6vw] font-[PlinaReg] sm:leading-[6vw] sm:tracking-normal
                uppercase"
              >
                our Projects
              </h1>
            </div>

            {/*Line animation */}
            <div 
              className={`line ${styles.line} relative mt-[6vw] mb-[11vw] w-full h-[.25vw] 
              sm:h-[.01vw] sm:mt-[3.8vw] sm:mb-[5vw] `}
            >
              <div 
                className={`box ${styles.box}`} 
                onMouseMove={manageMouseMove}
                onMouseLeave={manageMouseLeave}
              >
              </div>
              <svg className='w-full h-[100px] absolute -top-[50px]'>
                <path ref={path} className={`path1 ${styles.path1}`} ></path>
              </svg>
            </div>



          </div>  
        </div>

        <div className="mt-[2vw] w-full sm:flex items-start gap-10 ">
          <div className="first">
            <div>
              <h2>Olga prudka</h2>
            </div>
            <div id="imageContainer"
              className={`imageContainer ${styles.imageContainer} w-[22vw] relative overflow-hidden `}
            >  
            </div>
            <div>
              <h5>Logo design, Website design, Development</h5>
              <h5>2023</h5>
            </div>
          </div>
          <div className="second">Aim</div>
          <div className="third">Button</div>
        </div>
      
    </div>
  )
}

export default Project
