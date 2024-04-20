
import styles from './Style.module.css'
import AnimatedLink from '../AnimatedLink'
import MagneticGSAP from '../GsapMagnetic'
import { motion, useMotionValue } from 'framer-motion'
import { useEffect } from 'react'

function Navbar() {
  const data = [
    {title: 'Works'},
    {title: 'About'},
    {title: 'Contact'},
  ]

    const mapRange = (
      inputLower,
      inputUpper,
      outputLower,
      outputUpper,
    ) => {
      const INPUT_RANGE = inputUpper - inputLower;
      const OUTPUT_RANGE = outputUpper - outputLower;
  
      return (value) => 
        outputLower + (((value - inputLower) / INPUT_RANGE) * OUTPUT_RANGE || 0)
    }
  
    const setTransform = (item, event, x, y) => {
      const bounds = item.getBoundingClientRect();
      const relativeX = event.clientX - bounds.left;
      const relativeY = event.clientY - bounds.top;
      const xRange = mapRange(1, bounds.width, -2, 2)(relativeX)
      const yRange = mapRange(1, bounds.height, -2, 2)(relativeY)
      x.set(xRange * 10)
      y.set(yRange * 10)
      console.log(xRange)
    }


  return (
    <div className="w-full ">
      <div className="header 
        flex sm:items-start justify-between 
        px-[4vw] py-[6vw]
        sm:px-[3vw] sm:py-[2vw]"
      >
        <div className="first w-[26vw] flex items-start justify-between ">
          <div className="w-[3vw] flex items-center gap-[2.2vw]  ">
            <div>
                <svg className="menu-opener__square" width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <rect y="10" width="2" height="2" fill="currentColor"></rect>
                  <rect y="5" width="2" height="2" fill="currentColor"></rect>
                  <rect width="2" height="2" fill="currentColor"></rect>
                  <rect x="5" y="10" width="2" height="2" fill="currentColor"></rect>
                  <rect x="5" y="5" width="2" height="2" fill="currentColor"></rect>
                  <rect x="5" width="2" height="2" fill="currentColor"></rect>
                  <rect x="10" y="10" width="2" height="2" fill="currentColor"></rect>
                  <rect x="10" y="5" width="2" height="2" fill="currentColor"></rect>
                  <rect x="10" width="2" height="2" fill="currentColor"></rect>
                </svg>                         
            </div>
              <div className="logo hidden sm:inline-block">
                <svg className="brand__svg" width="64" height="22" viewBox="0 0 71 27">
                  <path d="M40.7622 24.5917C40.7622 23.6724 41.4511 22.9829 42.3697 22.9829C43.2883 22.9829 43.9773 23.6724 43.9773 24.5917C43.9773 25.511 43.2883 26.2005 42.3697 26.2005C41.566 26.2005 40.7622 25.3961 40.7622 24.5917Z" fill="currentColor"></path>
                  <path d="M65.7937 8.96329C65.7937 8.04398 66.4826 7.35449 67.4012 7.35449C68.3198 7.35449 69.0087 8.04398 69.0087 8.96329C69.0087 9.88261 68.3198 10.5721 67.4012 10.5721C66.4826 10.5721 65.7937 9.88261 65.7937 8.96329Z" fill="currentColor"></path>
                  <path d="M59.019 18.3861C59.019 17.4668 59.708 16.7773 60.6266 16.7773C61.5451 16.7773 62.2341 17.4668 62.2341 18.3861C62.2341 19.3055 61.5451 19.9949 60.6266 19.9949C59.8228 19.9949 59.019 19.3055 59.019 18.3861Z" fill="currentColor"></path>
                  <path d="M41.3365 9.88276C40.5327 8.27396 39.6142 7.8143 39.04 7.58447H46.3887C45.9294 7.8143 45.0108 8.04413 45.0108 8.96344C45.0108 9.19327 45.1257 9.65293 45.3553 10.1126L48.3407 16.6627L46.5035 20.225L41.3365 9.88276Z" fill="currentColor"></path>
                  <path d="M51.8998 9.30819C51.8998 8.04413 50.9812 7.69939 50.2922 7.58447H54.6555C53.8517 7.8143 52.8183 8.27396 51.7849 10.1126C51.8998 9.88276 51.8998 9.65293 51.8998 9.30819Z" fill="currentColor"></path>
                  <path d="M66.7122 17.9266C66.7122 16.2029 65.2195 15.6283 63.0378 14.5941C60.8562 13.5599 59.019 12.7555 59.019 10.8019C59.019 8.73348 60.971 7.12468 64.1861 7.00977C63.1527 7.23959 62.3489 8.15891 62.3489 9.42296C62.3489 10.9168 63.612 11.4914 65.9084 12.5256C68.2049 13.5599 70.2717 14.4792 70.2717 16.6626C70.2717 19.1907 67.4011 20.3398 64.6454 20.4547C65.9084 20.2249 66.7122 19.1907 66.7122 17.9266Z" fill="currentColor"></path>
                  <path d="M21.0129 2.64303C21.0129 1.6088 20.3239 0.919313 19.2905 0.689485L24.4576 0V20.3398C24.4576 20.3398 22.6204 20.4547 20.8981 21.8337V2.64303H21.0129Z" fill="currentColor"></path>
                  <path d="M34.6764 14.0195C34.6764 10.4572 31.691 7.58432 27.9019 7.35449C30.1983 7.69923 30.8873 11.4914 30.8873 14.0195C30.8873 16.5476 30.1983 20.2249 27.9019 20.6845C31.8058 20.4547 34.6764 17.5819 34.6764 14.0195Z" fill="currentColor"></path>
                  <path d="M14.9269 14.0195C14.9269 10.4572 11.9415 7.58432 8.15234 7.35449C10.4488 7.69923 11.1377 11.4914 11.1377 14.0195C11.1377 16.5476 10.4488 20.2249 8.15234 20.6845C11.9415 20.4547 14.9269 17.5819 14.9269 14.0195Z" fill="currentColor"></path>
                  <path d="M0 14.0195C0 10.4572 2.9854 7.58432 6.77456 7.35449C4.4781 7.69923 3.78916 11.4914 3.78916 14.0195C3.78916 16.5476 4.4781 20.2249 6.77456 20.6845C2.9854 20.4547 0 17.5819 0 14.0195Z" fill="currentColor"></path>
                </svg>
              </div>
          </div>

          <div className="first2 hidden sm:inline-block text-[.9vw] leading-none">
            <h5>Obys-</h5>
            <h5>Creative</h5>
            <h5>Design</h5>
            <h5>Agency</h5>
          </div>
        </div>

        
        {/* <div className="last hidden sm:flex w-[14vw] justify-around relative
          text-[.9vw]  "
        >
          <h6 className={`text ${styles.text}`}>Works</h6>
          <h6 className={`text ${styles.text}`}>About</h6>
          <h6 className={`text ${styles.text}`}>Contact</h6>
           
        </div> */}
        <div className='last hidden sm:flex items-start w-[14vw] justify-around relative 
          text-[.9vw]'
        >
          {/* {data.map((item, index) => {
            return (
              <div key={index} className='relative flex flex-col text-[.9vw] 
                leading-[1.2vw]'
              >
                  <AnimatedLink title={item.title} />
              </div>
            )
          })} */}
          {data.map((item, index) => {
              const x = useMotionValue(0);
              const y = useMotionValue(0);
              return (
                <motion.div 
                  onPointerMove={(event) => {
                    const item = event.currentTarget;
                    setTransform(item, event, x, y)
                  }}
                  onPointerLeave={() => {
                    x.set(0)
                    y.set(0)
                  }}
                  style={{ x, y }}
                  key={index} 
                  className={`navText ${styles.navText} px-[1.3vw] py-[1.1vw]  `}
                >
                  <span className={`text ${styles.text}`}>{item.title}</span>
                </motion.div>
              )
          })}
        </div>
        

        <div className="logo 
          inline-block
          sm:hidden
        ">
          <svg className="brand__svg" width="64" height="24" viewBox="0 0 71 27">
            <path d="M40.7622 24.5917C40.7622 23.6724 41.4511 22.9829 42.3697 22.9829C43.2883 22.9829 43.9773 23.6724 43.9773 24.5917C43.9773 25.511 43.2883 26.2005 42.3697 26.2005C41.566 26.2005 40.7622 25.3961 40.7622 24.5917Z" fill="currentColor"></path>
            <path d="M65.7937 8.96329C65.7937 8.04398 66.4826 7.35449 67.4012 7.35449C68.3198 7.35449 69.0087 8.04398 69.0087 8.96329C69.0087 9.88261 68.3198 10.5721 67.4012 10.5721C66.4826 10.5721 65.7937 9.88261 65.7937 8.96329Z" fill="currentColor"></path>
            <path d="M59.019 18.3861C59.019 17.4668 59.708 16.7773 60.6266 16.7773C61.5451 16.7773 62.2341 17.4668 62.2341 18.3861C62.2341 19.3055 61.5451 19.9949 60.6266 19.9949C59.8228 19.9949 59.019 19.3055 59.019 18.3861Z" fill="currentColor"></path>
            <path d="M41.3365 9.88276C40.5327 8.27396 39.6142 7.8143 39.04 7.58447H46.3887C45.9294 7.8143 45.0108 8.04413 45.0108 8.96344C45.0108 9.19327 45.1257 9.65293 45.3553 10.1126L48.3407 16.6627L46.5035 20.225L41.3365 9.88276Z" fill="currentColor"></path>
            <path d="M51.8998 9.30819C51.8998 8.04413 50.9812 7.69939 50.2922 7.58447H54.6555C53.8517 7.8143 52.8183 8.27396 51.7849 10.1126C51.8998 9.88276 51.8998 9.65293 51.8998 9.30819Z" fill="currentColor"></path>
            <path d="M66.7122 17.9266C66.7122 16.2029 65.2195 15.6283 63.0378 14.5941C60.8562 13.5599 59.019 12.7555 59.019 10.8019C59.019 8.73348 60.971 7.12468 64.1861 7.00977C63.1527 7.23959 62.3489 8.15891 62.3489 9.42296C62.3489 10.9168 63.612 11.4914 65.9084 12.5256C68.2049 13.5599 70.2717 14.4792 70.2717 16.6626C70.2717 19.1907 67.4011 20.3398 64.6454 20.4547C65.9084 20.2249 66.7122 19.1907 66.7122 17.9266Z" fill="currentColor"></path>
            <path d="M21.0129 2.64303C21.0129 1.6088 20.3239 0.919313 19.2905 0.689485L24.4576 0V20.3398C24.4576 20.3398 22.6204 20.4547 20.8981 21.8337V2.64303H21.0129Z" fill="currentColor"></path>
            <path d="M34.6764 14.0195C34.6764 10.4572 31.691 7.58432 27.9019 7.35449C30.1983 7.69923 30.8873 11.4914 30.8873 14.0195C30.8873 16.5476 30.1983 20.2249 27.9019 20.6845C31.8058 20.4547 34.6764 17.5819 34.6764 14.0195Z" fill="currentColor"></path>
            <path d="M14.9269 14.0195C14.9269 10.4572 11.9415 7.58432 8.15234 7.35449C10.4488 7.69923 11.1377 11.4914 11.1377 14.0195C11.1377 16.5476 10.4488 20.2249 8.15234 20.6845C11.9415 20.4547 14.9269 17.5819 14.9269 14.0195Z" fill="currentColor"></path>
            <path d="M0 14.0195C0 10.4572 2.9854 7.58432 6.77456 7.35449C4.4781 7.69923 3.78916 11.4914 3.78916 14.0195C3.78916 16.5476 4.4781 20.2249 6.77456 20.6845C2.9854 20.4547 0 17.5819 0 14.0195Z" fill="currentColor"></path>
          </svg>
        </div>

      </div> 
    </div>
  )
}

export default Navbar
