import Navbar from "../Navbar/Index"



function Landing() {
  return (
    <div 
      data-scroll 
      className="page1 w-full"
    >
      {/* Navbar */}
      <Navbar/>

      {/* Landing */}      
      <div 
        className="w-full h-screen"
      >
        <div 
          className="px-[4vw] py-[16vw]
          sm:py-[3vw] sm:px-[18vw] space-y-2
          sm:flex sm:flex-row sm:items-start sm:gap-16"
        >
          <div 
            className="font-[silkSerif] text-[5vw] sm:text-[2.6vw]"
          >
            <h4>
              01
            </h4>
          </div>
          <div className="text-[10vw] leading-[10vw] tracking-tighter
            sm:text-[5.8vw] uppercase font-[PlinaReg] sm:leading-[5.9vw] "
          >
            <div className="hero">
              <h1>
                We Design
                </h1>
            </div>
            <div className="hero">
              <h1>Unique</h1>
            </div>
            <div className="hero">
              <h1>Web/graphic</h1>
            </div>
            <div className="hero">
              <h1>Experience</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing

