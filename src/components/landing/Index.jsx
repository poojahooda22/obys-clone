// import { useGSAP } from "@gsap/react"
// import { useEffect } from "react"
// import Navbar from "../Navbar/Index"
import styles from './Style.module.css'
// import { gsap } from "gsap";

function Landing() {

  // useEffect(() => {
  //   document.addEventListener("mousemove", function(dets) {
  //     gsap.to("#flag", {
  //       x: dets.x -50,
  //       y: dets.y - 120,
  //     })
  //   })
  //   document.querySelector("#hero3").addEventListener("mouseenter", function() {
  //     gsap.to("#flag", {
  //       opacity: 1
  //     })
  //   })
  //   document.querySelector("#hero3").addEventListener("mouseleave", function() {
  //     gsap.to("#flag", {
  //       opacity: 0
  //     })
  //   })
  // })

  return (
    <div 
      data-scroll 
      className=" page1  w-full"
    >
      {/* Navbar */}
      
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
            <div className={`hero ${styles.hero} relative z-[999] `} id="hero3">
              <h2 className="">Web</h2>
              <h3>/</h3>
              <h2>Graphic</h2>
            </div>
            <div className={`hero ${styles.hero}`} id="hero4">
              <h1>Experience</h1>
            </div>
          </div>
          <img 
            id="flag"
            src="https://obys.agency/wp-content/uploads/2022/03/Flag.jpg" 
            alt=""
            className=" h-[25vw] absolute top-0 left-0 -translate-x-1/2 opacity-0 -translate-y-1/2 "
          />
        </div>
      </div>
    </div>
  )
}

export default Landing

