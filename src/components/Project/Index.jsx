import styles from './Style.module.css'


function Project() {
  // useEffect(() => {

  //   new hoverEffect({
  //     parent: document.querySelector('.imageWrapper'),
  //     intensity: 0.5,
  //     image1: 'https://obys.agency/wp-content/uploads/2023/08/Olga_Prudka_1.png',
  //     image2: 'https://obys.agency/wp-content/uploads/2023/08/Olga_Prudka_3.png',
  //     displacementImage: 'https://obys.agency/wp-content/uploads/2023/08/Olga_Prudka_3.png'
  //   });
  // })


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
            <div 
                className="underline mt-[6vw] mb-[11vw] w-full h-[.25vw] 
                sm:h-[.01vw] sm:mt-[3.8vw] sm:mb-[5vw] bg-white"
            ></div>
          </div>  
        </div>

        <div className="mt-[2vw] w-full sm:flex items-start gap-10 ">
          <div className="first">
            <div>
              <h2>Olga prudka</h2>
            </div>
            <div id="imageContainer"
              className={`${styles.imageContainer} imageContainer w-[22vw] relative overflow-hidden `}
            >
              <img id="myImage" src="https://obys.agency/wp-content/uploads/2023/08/Olga_Prudka_1.png" />
              <img/>
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
