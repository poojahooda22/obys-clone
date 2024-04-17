
import UnderLine from '../Underline/Index'
import styles from './Style.module.css'

function Project() {

  return (
    <div className="page3 relative w-full min-h-[100vh] px-[4vw] py-[6vw]
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
            <UnderLine marginBottom='4vw' marginTop='4vw' />
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
