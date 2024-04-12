

function Loader() {
  return (
    <div>
        <div 
            className="loader w-full h-full bg-[#0b0b0b] fixed z-[9] font-[PlinaReg]
            py-[20vh] px-[10vw] uppercase leading-[8vw] 
            text-[7vw]"
        >
            <div className="line">
                <h1>Your</h1>
            </div>
            <div className="line">
                <h1>Web Experience</h1>
            </div>
            <div className="line">
                <h1>is loading right</h1>
            </div>
        </div>
    </div>
  )
}

export default Loader
