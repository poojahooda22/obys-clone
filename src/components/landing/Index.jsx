import Navbar from "../Navbar/Index"



function Landing() {
  return (
    <div data-scroll className="page1 w-full">
      <Navbar/>
      <div className="w-full h-screen">
        <div className="px-[4vw] py-[16vw]
          sm:py-[4vw] sm:px-[16vw] 
          sm:flex sm:flex-row sm:items-start sm:gap-16"
        >
          <div className="font-[silkSerif] text-[4vw] sm:text-[4vw]">
            <h4>01</h4>
          </div>
          <div className="sm:text-[7vw] uppercase font-[PlinaReg] leading-[7.2vw] ">
            <div className="hero">
              <h1>We Design</h1>
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

