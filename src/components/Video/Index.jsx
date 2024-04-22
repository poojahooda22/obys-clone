import { RiPlayFill, RiPauseMiniLine } from "@remixicon/react";
import gsap from "gsap";
import { useEffect } from "react";


function Video() {

  useEffect(() => {
    var videoContainer = document.querySelector("#video-container")
    var video = document.querySelector("#video-container video")
    videoContainer.addEventListener("mouseenter", function() {
     videoContainer.addEventListener("mousemove", function(dets) {

        videoContainer.style.cursor = "none"
        gsap.to(".cursor", {
          opacity: 0,
        })
        gsap.to("#video-cursor", {
          left: dets.x - 600, 
          y: dets.y -100
        })
        console.log(dets.x - 500)
     })
    })
    videoContainer.addEventListener("mouseleave", function() {
      gsap.to(".cursor", {
        opacity: 1,
      })
      gsap.to("#video-cursor", {
        left: "64%",
        y: "10%" 
      })
      
    })

    var flag = 0;
    videoContainer.addEventListener("click", function() {
      if(flag == 0) {
        video.play()
        video.style.opacity = 1
        
        gsap.to("#video-cursor", {
          scale: 0.5
        })
        gsap.to(".playIcon", {
          opacity: 0
        })
        gsap.to(".pauseIcon", {
          opacity: 1
        })
        flag = 1
      } else {
        video.pause()
        video.style.opacity = 0
        
        gsap.to("#video-cursor", {
          scale: 1
        })
        gsap.to(".playIcon", {
          opacity: 1
        })
        gsap.to(".pauseIcon", {
          opacity: 0
        })
        flag = 0
      }
    })
  })


  return (
    <div  className='page2 w-full py-[4vw] relative '>
      <div id="video-container" 
        className={` w-full h-[58vh] bg-custom-image bg-cover bg-center
        sm:h-[74vh] sm:w-[73vw] sm:left-[26%] relative`}
      >
        <div>
          <div 
            id="video-cursor"
            className="bg-[#ffa63d] absolute top-[10%] left-[20%] sm:top-[-10%] sm:left-[64%] w-[22vw] h-[22vw]
            sm:h-[6.4vw] sm:w-[6.4vw] rounded-full z-[9]"
          >  
            {/* Play Icon */}
            <RiPlayFill
              size={32}
              color="white"
              className={`playIcon absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2`} 
            /> 
            {/* Pause Icon */}
            <RiPauseMiniLine
              size={32}
              color="white"
              className={`pauseIcon absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 opacity-0`} 
            /> 
          </div>
        </div>
        
        <video 
          loop
          muted
          src="https://obys.agency/wp-content/uploads/2022/11/Obys-Showreel-2022.mp4"
          className="w-full h-full object-cover opacity-0"
        >
        </video>
        
      </div>
    </div>
  )
}

export default Video
