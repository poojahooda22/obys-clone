import { RiPlayFill } from "@remixicon/react";

function Video() {
  return (
    <div  className='page2 w-full py-[6vw] relative '>
      <div id="video-container" 
        className="h-[58vh]
        sm:h-[74vh] sm:w-[80vw] sm:left-[26%] relative"
      >
        <div 
          id="video-cursor"
          className="bg-[#ffa63d] absolute top-[10%] left-[20%] sm:top-[-10%] sm:left-[64%] w-[22vw] h-[22vw]
          sm:h-[6.4vw] sm:w-[6.4vw] rounded-full z-[999]"
        >  
          <RiPlayFill
            size={32}
            color="white"
            className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2" 
          /> 
        </div>
        <img 
          src="https://obys.agency/wp-content/uploads/2022/11/Showreel-2022-preview-1.jpg"
          className="w-full h-full object-cover absolute top-0 left-0"
        ></img>
        <video 
          autoPlay
          loop
          muted
          src="https://obys.agency/wp-content/uploads/2022/11/Obys-Showreel-2022.mp4"
          className="w-full h-full object-cover"
        >
        </video>
        
      </div>
    </div>
  )
}

export default Video
