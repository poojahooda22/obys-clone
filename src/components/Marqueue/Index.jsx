import styles from './Style.module.css'


function Marqueue() {


  return (
    <div>
        <div className="page5 w-full h-[100vh] px-[4vw] sm:px-[3vw] relative">
            {/* <div className="sm:flex">
                <div className="w-[32%]"></div>
                <div className="w-full border-t-[.1vw] py-[5vw] sm:py-[1.3vw]">
                    <p className="font-[PlinaReg] text-[3.5vw] sm:text-[.8vw]">We work with</p>
                </div>
            </div> */}

            <div>
              <div className="elem whitespace-nowrap text-[7vw]">
                <h1 className={`${styles.elemh1}`}>Sport - Fashion - technology</h1>
                <h1>Sport - Fashion - technology</h1>
              </div>
              <div className="elem whitespace-nowrap text-[7vw]">
                <h1>science - travel - partners</h1>
                <h1>science - travel - partners</h1>
              </div>
            </div>

        </div>
      
    </div>
  )
}

export default Marqueue
