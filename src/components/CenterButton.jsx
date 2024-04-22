import { motion } from 'framer-motion'



function CenterButton() {
  return (
    <motion.div
        className="mb-[18vw] sm:mt-[0vw] sm:mb-[5vw] flex items-center justify-center sm:py-[1vw]"
    >
        <div className="relative">
            <motion.div 
                whileHover={{ scale: .85, }}
                whileTap={{ scale: 1.3 }}
                transition={{ease: [0.76, 0, 0.24, 1]}}
                className="bg-[#ffa63d] w-[36vw] h-[36vw] sm:w-[22vw] sm:h-[22vw] rounded-full  relative"
            >
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <h2 className='font-[PlinaReg] text-[3.2vw] whitespace-nowrap leading-[3vw] sm:text-[.9vw]'>All Projects<span className="ml-[.3vw] font-[silkSerif]">(12)</span></h2>
               </div>
            </motion.div>
        </div>
    </motion.div>
  )
}

export default CenterButton
