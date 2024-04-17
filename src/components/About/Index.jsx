import { useGSAP } from "@gsap/react"
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import UnderLine from '../Underline/Index'


gsap.registerPlugin(ScrollTrigger);

function About() {


    useGSAP(() => {
    gsap.from('.aboutHeading h1', {
        y: 120,
    })
    gsap.to('.underline', {
        width: '100%',
        duration: 1.2,
    })
    gsap.from('.aboutText h2', {
        y: 50,
        stagger: 0.1,

    })
    gsap.from('.rightText h5', {
        opacity: 0,
        stagger: 0.1
    })
    gsap.to('.underline2', {
        width: '100%',
        duration: 1.2,
    })

    })

  return (
    <div className="page4 relative sm:flex gap-[5vw]  w-full  px-[4vw] py-[6vw]
        sm:px-[4vw]
    ">
        <div className="left">
            <div className=" sm:pl-[14vw] ">
                <div className="font-[silkSerif] text-[4.6vw] 
                    sm:text-[2.6vw] sm:leading-[4vw]"
                >
                    <h2>03</h2>
                </div>             
            </div>
        </div>
        <div className="right">
            <div className="">
                <div className="aboutHeading overflow-hidden pb-[3vw] sm:pb-0">
                    <h1 className="text-[8vw] leading-[10vw] tracking-tighter
                        sm:text-[6vw] font-[PlinaReg] sm:leading-[6vw] sm:tracking-normal
                        uppercase"
                    >
                        About Obys
                    </h1>
                </div>
                {/* <div 
                    className="underline mt-[6vw] mb-[11vw] w-0 h-[.25vw] 
                    sm:h-[.01vw] sm:mt-[3.8vw] sm:mb-[5vw] bg-white"
                ></div> */}

                {/*Line animation */}
                {/* <div 
                className={`line ${styles.line} relative mt-[6vw] mb-[11vw] w-full h-[.25vw] 
                sm:h-[.01vw] sm:mt-[4vw] sm:mb-[5vw] `}
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
                </div> */}
                <UnderLine marginBottom='4vw' marginTop='4vw' />
                <div 
                    className="sm:w-2/4 text-[5.5vw] tracking-normal leading-[6vw] font-[PlinaReg] pt-[8vw] sm:pt-0
                    sm:text-[1.8vw] sm:leading-[2.2vw]"
                >
                    <div className="aboutText overflow-hidden"><h2>Our agency is about people who</h2></div>
                    <div className="aboutText overflow-hidden"><h2>love creating designing and</h2></div>
                    <div className="aboutText overflow-hidden"><h2>developing wow projects. In the</h2></div>
                    <div className="aboutText overflow-hidden"><h2>same time we are boutique</h2></div>
                    <div className="aboutText overflow-hidden"><h2>agency that is more than the</h2></div>
                    <div className="aboutText overflow-hidden"><h2>collective. We learn and grow, win</h2></div>
                    <div className="aboutText overflow-hidden"><h2>and celebrate together.</h2></div>
                    
                </div>
                <div className="relative flex flex-col mt-8 sm:flex-row sm:mt-16 gap-8 ">
                    <div className=" order-2 sm:order-1  sm:w-1/2">
                        <img className="" src="https://obys.agency/wp-content/uploads/2020/07/content-image01.jpg" alt="image"/>
                    </div>
                    <div 
                        className="rightText order-1 sm:order-2 w-2/3  text-[3.2vw] font-[PlinaReg] leading-[5vw] 
                        text-[#cbcaca]
                        sm:w-1/5  sm:text-[.9vw] sm:leading-[1.4vw]   "
                    >
                        <h5 className="mb-8">We are happy to present our new website and updated version of Obys agency. As before we are open for new projects worldwide!</h5>
                        <h5>
                            Would you like to have award winning site or unique branding style, please say hi to our manager —info@obys.agency.
                            And we will help you with the pleasure.
                        </h5>
                    </div>
                    {/* blue Image */}
                    <div className="order-3 w-full
                        px-[4vw] pt-[2vw] pb-[12vw]
                        sm:absolute top-[50%] left-[35%] 
                        sm:w-[34vw] sm:px-[3vw] sm:py-[2vw] font-[PlinaReg]
                        bg-[#3f7df4]"
                    >
                        <div className="row flex items-start sm:items-center justify-between 
                            border-b-[.9px]
                             border-white py-[5vw]
                            sm:py-[2vw]"
                        >
                            <h3 className=" sm:text-[1.4vw] whitespace-nowrap text-[3.6vw]">Awwwards x16</h3>
                            <p className="w-1/2  tracking-normal 
                                text-[3.4vw] leading-[4vw] 
                                sm:w-2/4 sm:text-[.8vw] sm:leading-[.9vw]
                                "
                            >
                                SOTM, SOTD and Honrable Mentions
                            </p>
                        </div>
                        <div className="row flex items-start sm:items-center justify-between py-[5vw]
                        border-b-[.9px] border-white sm:py-[2vw]">
                            <h3 className="text-[3.6vw] sm:text-[1.4vw] ">Red Dot Award x1</h3>
                            <p className="w-1/2 sm:w-2/4 sm:text-[.8vw] sm:leading-[.9vw] tracking-normal text-[3.4vw] 
                            leading-[4vw] ">Best of the Best</p>
                        </div>
                        <div className="row flex items-start sm:items-center justify-between py-[5vw] 
                        border-b-[.9px] border-white sm:py-[2vw]">
                            <h3 className="sm:text-[1.4vw] text-[3.6vw]">FWA x11</h3>
                            <p className="w-1/2 sm:w-2/4 sm:text-[.8vw] sm:leading-[.9vw] tracking-normal text-[3.4vw] leading-[4vw]">FWA of the Day</p>
                        </div>
                        <div className="row flex items-start sm:items-center justify-between py-[5vw]
                         border-b-[.9px] border-white sm:py-[2vw]">
                            <h3 className="sm:text-[1.4vw] text-[3.6vw]">CSSDA x23</h3>
                            <p className="w-1/2 sm:w-2/4 sm:text-[.8vw] sm:leading-[.9vw] tracking-normal text-[3.4vw] leading-[4vw]">WOTM WOTD and UI, UX Inovation</p>
                        </div>
                        <div className="row flex items-start sm:items-center justify-between  border-b-[.9px] py-[5vw]
                         border-white sm:py-[2vw]">
                            <h3 className="sm:text-[1.4vw] text-[3.6vw]">Behance x25</h3>
                            <p className="w-1/2 sm:w-2/4 sm:text-[.8vw] sm:leading-[.9vw] tracking-normal text-[3.4vw] leading-[4vw]">Interaction, Graphic Design</p>
                        </div>
                    </div>        
                </div>
                {/* Line animation */}
                <UnderLine  marginBottom='1vw' marginTop='18vw'  />
                {/* <div 
                    className="underline mt-[16vw] mb-[5vw] w-full h-[.25vw] 
                    sm:h-[.01vw] sm:mt-[18vw] sm:mb-[1vw] bg-white"
                ></div> */}
                <p className="font-[PlinaReg] text-[3.5vw] pt-[3vw] sm:pt-0 sm:text-[.8vw]">We work with</p>
            </div>    
        </div>
    </div>
  )
}

export default About
