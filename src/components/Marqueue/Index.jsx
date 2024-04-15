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
              <div className={`elem whitespace-nowrap text-[7vw] flex items-center uppercase font-[PlinaReg] ${styles.elem}`}>
                <h1 className={`${styles.elemh1} flex items-center gap-[3vw]`}>Sport <div className={`${styles.dash}`}></div></h1>
                <h1 className={`${styles.elemh1} flex items-center gap-[3vw] font-[silkSerif] `}>Fashion <div className={`${styles.dash}`}></div></h1>
                <h1 className={`${styles.elemh1} flex items-center gap-[3vw]`}>technology <div className={`${styles.dash}`}></div></h1>
                <h1 className={`${styles.elemh1} flex items-center gap-[3vw] font-[silkSerif] `}>Fashion <div className={`${styles.dash}`}></div></h1>
                <h1 className={`${styles.elemh1} flex items-center gap-[3vw]`}>technology <div className={`${styles.dash}`}></div></h1>
                <h1 className={`${styles.elemh1} flex items-center gap-[3vw] font-[silkSerif] `}>sport <div className={`${styles.dash}`}></div></h1>
              </div>
              <div className={`elem2 whitespace-nowrap text-[7vw] flex items-center uppercase font-[PlinaReg] ${styles.elem2}`}>
                <h1 className={`${styles.elemh1} flex items-center gap-[3vw]`}>beauty<div className={`${styles.dash}`}></div></h1>
                <h1 className={`${styles.elemh1} flex items-center gap-[3vw] font-[silkSerif] `}>real estate<div className={`${styles.dash}`}></div></h1>
                <h1 className={`${styles.elemh1} flex items-center gap-[3vw]`}>architecture <div className={`${styles.dash}`}></div></h1>
                <h1 className={`${styles.elemh1} flex items-center gap-[3vw] font-[silkSerif] `}>beauty <div className={`${styles.dash}`}></div></h1>
                <h1 className={`${styles.elemh1} flex items-center gap-[3vw]`}>real estate <div className={`${styles.dash}`}></div></h1>
                <h1 className={`${styles.elemh1} flex items-center gap-[3vw] font-[silkSerif] `}>architecture <div className={`${styles.dash}`}></div></h1>
              </div>
              <div className={`elem whitespace-nowrap text-[7vw] flex items-center uppercase font-[PlinaReg] ${styles.elem}`}>
                <h1 className={`${styles.elemh1} flex items-center gap-[3vw]`}>partners<div className={`${styles.dash}`}></div></h1>
                <h1 className={`${styles.elemh1} flex items-center gap-[3vw] font-[silkSerif] `}>travel<div className={`${styles.dash}`}></div></h1>
                <h1 className={`${styles.elemh1} flex items-center gap-[3vw]`}>science <div className={`${styles.dash}`}></div></h1>
                <h1 className={`${styles.elemh1} flex items-center gap-[3vw] font-[silkSerif] `}>partners <div className={`${styles.dash}`}></div></h1>
                <h1 className={`${styles.elemh1} flex items-center gap-[3vw]`}>travel <div className={`${styles.dash}`}></div></h1>
                <h1 className={`${styles.elemh1} flex items-center gap-[3vw] font-[silkSerif] `}>science <div className={`${styles.dash}`}></div></h1>
              </div>
              <div className={`elem2 whitespace-nowrap text-[7vw] flex items-center uppercase font-[PlinaReg] ${styles.elem2}`}>
                <h1 className={`${styles.elemh1} flex items-center gap-[3vw]`}>hotels<div className={`${styles.dash}`}></div></h1>
                <h1 className={`${styles.elemh1} flex items-center gap-[3vw] font-[silkSerif] `}>music<div className={`${styles.dash}`}></div></h1>
                <h1 className={`${styles.elemh1} flex items-center gap-[3vw]`}>automotive<div className={`${styles.dash}`}></div></h1>
                <h1 className={`${styles.elemh1} flex items-center gap-[3vw] font-[silkSerif] `}>hotels <div className={`${styles.dash}`}></div></h1>
                <h1 className={`${styles.elemh1} flex items-center gap-[3vw]`}>music <div className={`${styles.dash}`}></div></h1>
                <h1 className={`${styles.elemh1} flex items-center gap-[3vw] font-[silkSerif] `}>automotive<div className={`${styles.dash}`}></div></h1>
              </div>
            </div>

        </div>
    </div>
  )
}

export default Marqueue
