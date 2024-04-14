

function About() {
  return (
    <div className="page4 relative sm:flex gap-[5vw]  w-full min-h-[100vh] px-[4vw] py-[6vw]">
        <div className="left">
            <div className=" sm:pl-[14vw] ">
                <div className="font-[silkSerif] text-[4.6vw] sm:text-[2.6vw] 
                    sm:leading-[4vw]"
                >
                    <h2>03</h2>
                </div>
                
            </div>
        </div>

        <div className="right">
            <div className="text-[8vw] leading-[10vw] tracking-tighter bg
                sm:text-[6vw]  font-[PlinaReg] sm:leading-[6vw] sm:tracking-normal"
            >
                <h1 className="uppercase">About Obys</h1>
                <div className="underline mt-[6vw] mb-[11vw] w-full h-[.25vw] 
                    sm:h-[.01vw] sm:mt-[3.8vw] sm:mb-[5vw] bg-white"></div>
                <h3 className="sm:w-1/3 text-[5.5vw] tracking-normal leading-[5.8vw]
                    sm:text-[1.5vw] sm:leading-[1.8vw]"
                >
                    Our agency is about people who love creating designing and developing wow projects.
                    In the same time we are boutique agency that is more than the collective. 
                    We learn and grow, win and celebrate together.
                </h3>
                <div>
                    <img/>
                </div>

            </div>
        </div>
    </div>
  )
}

export default About
