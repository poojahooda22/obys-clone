import { motion } from 'framer-motion'



function CenterButton() {
  return (
    <motion.div
     
        className="mt-[4vw] mb-[5vw] flex items-center justify-center bg-red-300"
    >
        <div className="relative">
            <motion.div className="bg-[#ffa63d] w-[20vw] h-[20vw] rounded-full  relative">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <h2 className='font-[PlinaReg] text-[.9vw]'>All Projects<span className="ml-[.3vw] font-[silkSerif]">(12)</span></h2>
               </div>
            </motion.div>
        </div>
    </motion.div>
  )
}

export default CenterButton
