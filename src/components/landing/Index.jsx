// import { useGSAP } from "@gsap/react"
import Navbar from "../Navbar/Index"
import styles from './Style.module.css'
// import { gsap } from "gsap";

function Landing() {


  // useGSAP(() => {
  //   const tl = gsap.timeline()
  //   tl.from('.hero h1', {
  //     y: 150,
  //     stagger: 0.3,
  //     delay: 0.8,
  //     duration: 1,
  //   })

  // })

  return (
    <div 
      data-scroll 
      className="w-full"
    >
      {/* Navbar */}
      <Navbar/>
      {/* Landing Page */}      
      <div 
        className="w-full"
      >
        <div 
          className="relative px-[4vw] py-[16vw]
          sm:py-[3vw] sm:px-[18vw] space-y-2
          sm:flex sm:flex-row sm:items-start sm:gap-16"
        >
          <div 
            className={`firstword ${styles.firstword} font-[silkSerif] text-[5vw] sm:text-[3.6vw] 
            sm:leading-[6vw]`}
          >
            <h4>
              01
            </h4>
          </div>
          <div className="text-[10vw] leading-[10vw] tracking-tighter
            sm:text-[6vw] uppercase font-[PlinaReg] sm:leading-[6vw] sm:tracking-normal"
          >
            <div className={`hero ${styles.hero}`} id="hero1">
              <h1>
                We Design
              </h1>
            </div>
            <div className={`hero ${styles.hero}`} id="hero2">
              <h1>
                Unique</h1>
            </div>
            <div className={`hero ${styles.hero}`} id="hero3">
              <h2 className="">Web</h2>
              <h3>/</h3>
              <h2>Graphic</h2>
            </div>
            <div className={`hero ${styles.hero}`} id="hero4">
              <h1>Experience</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing

