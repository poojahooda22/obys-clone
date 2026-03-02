import styles from './Style.module.css'
import UnderLine from '../Underline/Index'
import { useGSAP } from "@gsap/react"
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from 'react'
import GooeyHoverEffect from './GooeyHoverEffect'

gsap.registerPlugin(ScrollTrigger)

function Project() {
  let wrappers = useRef();
  let wrapper3 = useRef();
  let wrapper2 = useRef();
  let wrapper4 = useRef();
  let wrapper5 = useRef();
  let wrapper6 = useRef();

  // Refs for image card containers (for hover heading reveal)
  const cardRefs = useRef([]);

  const containerRef = useRef()

  useGSAP(() => {
    if (!containerRef.current) return

    // Skip WebGL hover effect on touch devices (mobile)
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches
    if (isTouchDevice) return

    const items = [
      { element: wrappers.current, image1: '/images/image1.jpg', image2: '/images/olga.jpg' },
      { element: wrapper3.current, image1: '/images/image3.png', image2: '/images/image2.jpg' },
      { element: wrapper2.current, image1: '/images/Ochi.png', image2: '/images/eyes.png' },
      { element: wrapper4.current, image1: '/images/lax.png', image2: '/images/Laxer2.png' },
      { element: wrapper5.current, image1: '/images/flow.png', image2: '/images/last.png' },
      { element: wrapper6.current, image1: '/images/last.png', image2: '/images/last2.png' }
    ].filter(item => item.element)

    if (items.length > 0) {
      const effect = new GooeyHoverEffect(containerRef.current, items)
      return () => effect.destroy()
    }
  }, { dependencies: [], scope: containerRef })

  // Hover heading text-swap animation for image cards
  // Pattern: text visible initially, on hover current slides UP, hover-copy slides in from -Y
  // On leave: reverse
  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean)

    cards.forEach((card) => {
      const defaultText = card.querySelector('.card-heading-default')
      const hoverText = card.querySelector('.card-heading-hover')
      if (!defaultText || !hoverText) return

      const onEnter = () => {
        // Default text slides up (out)
        gsap.to(defaultText, {
          y: '-100%',
          duration: 0.5,
          ease: 'power3.out',
        })
        // Hover text slides in from below (was at +100%)
        gsap.to(hoverText, {
          y: 0,
          duration: 0.5,
          ease: 'power3.out',
        })
      }

      const onLeave = () => {
        // Default text slides back to original position
        gsap.to(defaultText, {
          y: 0,
          duration: 0.4,
          ease: 'power3.out',
        })
        // Hover text goes back down 
        gsap.to(hoverText, {
          y: '100%',
          duration: 0.4,
          ease: 'power3.out',
        })
      }

      card.addEventListener('mouseenter', onEnter)
      card.addEventListener('mouseleave', onLeave)

      // Store for cleanup
      card._hoverEnter = onEnter
      card._hoverLeave = onLeave
    })

    return () => {
      cards.forEach((card) => {
        if (card._hoverEnter) card.removeEventListener('mouseenter', card._hoverEnter)
        if (card._hoverLeave) card.removeEventListener('mouseleave', card._hoverLeave)
      })
    }
  }, [])

  // ScrollTrigger for heading reveal and divider line border fills
  useGSAP(() => {
    // "our Projects" heading reveal from Y
    gsap.from('.projectHeading .heading', {
      y: 120,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.page3',
        start: 'top 95%',
        end: 'top 70%',
        scrub: 1,
      }
    })

    // Divider line fills
    gsap.utils.toArray('.divider-line-bar').forEach((bar) => {
      gsap.fromTo(bar,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bar,
            start: 'top 90%',
            scrub: 1,
          }
        }
      )
    })
  }, { scope: '.page3' })


  // Mouse animations for buttons/circles
  useGSAP(() => {
    const circles = [
      { trigger: ".page3Circle", inner: ".circleIn", para: ".circleInpara" },
      { trigger: ".button2", inner: ".circleIn2", para: ".circleInpara2" },
      { trigger: ".button3", inner: ".circleIn3", para: ".circleInpara3" },
    ];

    circles.forEach(({ trigger, inner, para }) => {
      const el = document.querySelector(trigger);
      if (!el) return;

      el.addEventListener('mouseenter', () => {
        gsap.to(inner, { scale: 1, transformOrigin: "center center" });
        gsap.to(para, { scale: 1, transformOrigin: "center center", delay: 0.3 });
      });
      el.addEventListener('mouseleave', () => {
        gsap.to(inner, { scale: 0, transformOrigin: "center center" });
        gsap.to(para, { scale: 0, transformOrigin: "center center" });
      });
    });

    // Refresh ScrollTrigger after a short delay to ensure layout is stable
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, { scope: '.page3' })


  return (
    <div
      ref={containerRef}
      className="page3 relative w-full
      px-[4vw] py-[10vw]
      sm:px-[4vw]"
    >
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
          <div
            className="projectHeading overflow-hidden pb-[4vw] sm:pb-0 "
          >
            <h1
              className=" heading text-[9vw] leading-[10vw] tracking-tighter
                sm:text-[6vw] font-[PlinaReg] sm:leading-[6vw] 
                sm:tracking-normal
                uppercase"
            >
              our Projects
            </h1>
          </div>
          {/*Line animation */}
          <UnderLine marginBottom='4vw' marginTop='4vw' />
        </div>
      </div>
      {/* Project container 1st row*/}
      <div
        className="mt-[2vw] w-full sm:flex 
          items-start sm:gap-8 pt-[6vw] sm:pt-0"
      >
        {/* Image Card 1 — Olga Prudka */}
        <div className="firstCol sm:w-[22%]"
          ref={el => cardRefs.current[0] = el}
        >
          <div className='sm:mb-[1.6vw] overflow-hidden relative' style={{ height: 'fit-content' }}>
            <h2 className='card-heading-default text-[5vw] mb-[7vw] sm:mb-0 sm:text-[2vw] font-[PlinaReg] uppercase 
                sm:tracking-tight sm:leading-[2vw]'
            >
              Olga prudka
            </h2>
            <h2 className='card-heading-hover absolute top-0 left-0 text-[5vw] mb-[7vw] sm:mb-0 sm:text-[2vw] font-[PlinaReg] uppercase 
                sm:tracking-tight sm:leading-[2vw]'
              style={{ transform: 'translateY(100%)' }}
            >
              Olga prudka
            </h2>
          </div>
          <div id="imageContainer"
            ref={wrappers}
            className={`imageContainer ${styles.imageContainer} sm:ml-0 
                w-[55vw] h-[80vw]
                sm:w-[20vw] sm:h-[25vw] relative overflow-hidden `}
          >
            <img src='https://obys.agency/wp-content/uploads/2023/08/Olga_Prudka_1.png' alt="image1"
              className="inline-block sm:hidden w-full h-full object-cover"
            />
          </div>
          <div className='flex mt-[7vw] sm:mt-[1.6vw] font-[PlinaReg] text-[3vw]  
              sm:text-[.8vw] items-start justify-between 
              gap-8 pb-[6vw] sm:pb-[1.6vw]'
          >
            <h5 className='whitespace-'>Logo design, Website design, Development</h5>
            <h5>2023</h5>
          </div>
          <div className='divider-line-bar w-full h-[1px] bg-white' style={{ transformOrigin: 'right center' }}></div>
        </div>
        {/* Image Card 2 — AIM */}
        <div className="secondCol sm:w-2/5"
          ref={el => cardRefs.current[1] = el}
        >
          <div className='mb-[1.6vw] overflow-hidden relative' style={{ height: 'fit-content' }}>
            <h2 className='card-heading-default text-[5vw] mt-[7vw] sm:mt-0 mb-[7vw] sm:mb-0 sm:text-[2vw] font-[PlinaReg] 
              uppercase sm:tracking-tight sm:leading-[2vw]'
            >aim</h2>
            <h2 className='card-heading-hover absolute top-0 left-0 text-[5vw] mt-[7vw] sm:mt-0 mb-[7vw] sm:mb-0 sm:text-[2vw] font-[PlinaReg] 
              uppercase sm:tracking-tight sm:leading-[2vw]'
              style={{ transform: 'translateY(100%)' }}
            >aim</h2>
          </div>
          <div
            id="imageContainer"
            ref={wrapper3}
            className={`imageContainer ${styles.imageContainer} sm:ml-0 w-[55vw]  h-[80vw]
              sm:w-[36vw] sm:h-[40vw] relative overflow-hidden `}
          >
            <img src='https://obys.agency/wp-content/uploads/2024/02/AIM-1.png' alt="image1"
              className="inline-block sm:hidden w-full h-full object-cover"
            />
          </div>
          <div className='flex mt-[7vw] sm:mt-[1.6vw] font-[PlinaReg] text-[3vw] sm:text-[.8vw] items-start justify-between 
              pb-[6vw] sm:pb-[1.6vw]'
          >
            <h5>Logo design, Website design, Development</h5>
            <h5>2024</h5>
          </div>
          <div className='divider-line-bar w-full h-[1px] bg-white' style={{ transformOrigin: 'right center' }}></div>
        </div>
        {/* button*/}
        <div className="thirdCol hidden sm:inline-block relative ">
          <div className={`page3Circle ${styles.page3Circle}  relative w-[22vw] h-[22vw] border 
              rounded-full mt-[26vw] ml-[8vw] flex items-center justify-center`}
          >
            <svg className="button__arrow" width="20%" viewBox="0 0 91 118" fill="none">
              <path d="M15.2307 57.4152L15.9378 56.708L15.2307 56.0009L14.5236 56.708L15.2307 57.4152ZM34.9813 77.1658L34.2742 77.8729L35.9813 79.58L35.9813 77.1658L34.9813 77.1658ZM0.151478 72.4944L-0.555622 71.7873L-1.26273 72.4944L-0.555622 73.2015L0.151478 72.4944ZM45.29 117.633L44.5828 118.34L45.29 119.047L45.9971 118.34L45.29 117.633ZM60.3692 102.554L61.0763 103.261L61.7839 102.553L61.0758 101.846L60.3692 102.554ZM60.3685 102.553L59.6614 101.846L58.9538 102.553L59.6619 103.261L60.3685 102.553ZM90.427 72.4944L91.1341 73.2015L91.8412 72.4944L91.1341 71.7873L90.427 72.4944ZM75.3478 57.4152L76.0549 56.7081L75.3478 56.001L74.6407 56.7081L75.3478 57.4152ZM56.3065 76.4565L55.3065 76.4565L55.3065 78.8707L57.0136 77.1636L56.3065 76.4565ZM56.3065 0.120074L57.3065 0.120074L57.3065 -0.879926L56.3065 -0.879926L56.3065 0.120074ZM34.9813 0.120076L34.9813 -0.879924L33.9813 -0.879924L33.9813 0.120076L34.9813 0.120076ZM14.5236 58.1223L34.2742 77.8729L35.6884 76.4587L15.9378 56.708L14.5236 58.1223ZM0.858585 73.2015L15.9378 58.1223L14.5236 56.708L-0.555622 71.7873L0.858585 73.2015ZM45.9971 116.926L0.858585 71.7873L-0.555622 73.2015L44.5828 118.34L45.9971 116.926ZM59.662 101.846L44.5828 116.926L45.9971 118.34L61.0763 103.261L59.662 101.846ZM59.6619 103.261L59.6625 103.261L61.0758 101.846L61.0751 101.845L59.6619 103.261ZM61.0756 103.26L91.1341 73.2015L89.7199 71.7873L59.6614 101.846L61.0756 103.26ZM91.1341 71.7873L76.0549 56.7081L74.6407 58.1223L89.7199 73.2015L91.1341 71.7873ZM74.6407 56.7081L55.5994 75.7494L57.0136 77.1636L76.0549 58.1223L74.6407 56.7081ZM57.3065 76.4565L57.3065 0.120074L55.3065 0.120074L55.3065 76.4565L57.3065 76.4565ZM56.3065 -0.879926L34.9813 -0.879924L34.9813 1.12008L56.3065 1.12007L56.3065 -0.879926ZM33.9813 0.120076L33.9813 77.1658L35.9813 77.1658L35.9813 0.120076L33.9813 0.120076Z" fill="currentColor"></path>
            </svg>
            <div
              className={`circleIn ${styles.circleIn} absolute w-[100%] h-[100%] scale-0 rounded-full flex items-center justify-center top-0 
                left-0 bg-[#fff] text-[#000]`}
            >
              <p className={`circleInpara ${styles.circleInpara} font-[PlinaReg] text-center text-[.9vw] scale-0 w-[70%]`}>
                We are thrilled to have you on board. We hope you enjoy the projects 🧡
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Project container 2nd row */}
      <div className="secondRow mt-[2vw] w-full sm:flex items-start gap-8">
        {/* button*/}
        <div className="firstCol hidden sm:inline-block relative">
          <div className=' mt-[0vw] ml-[0vw] relative'>
            <div className={`button2 ${styles.button2} relative w-[20vw] h-[20vw] border rounded-full `} data-hover-text="">
              <span className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 -rotate-45'>
                <svg className="button__arrow" width="6vw" height="6vw" viewBox="0 0 91 118" fill="none">
                  <path d="M15.2307 57.4152L15.9378 56.708L15.2307 56.0009L14.5236 56.708L15.2307 57.4152ZM34.9813 77.1658L34.2742 77.8729L35.9813 79.58L35.9813 77.1658L34.9813 77.1658ZM0.151478 72.4944L-0.555622 71.7873L-1.26273 72.4944L-0.555622 73.2015L0.151478 72.4944ZM45.29 117.633L44.5828 118.34L45.29 119.047L45.9971 118.34L45.29 117.633ZM60.3692 102.554L61.0763 103.261L61.7839 102.553L61.0758 101.846L60.3692 102.554ZM60.3685 102.553L59.6614 101.846L58.9538 102.553L59.6619 103.261L60.3685 102.553ZM90.427 72.4944L91.1341 73.2015L91.8412 72.4944L91.1341 71.7873L90.427 72.4944ZM75.3478 57.4152L76.0549 56.7081L75.3478 56.001L74.6407 56.7081L75.3478 57.4152ZM56.3065 76.4565L55.3065 76.4565L55.3065 78.8707L57.0136 77.1636L56.3065 76.4565ZM56.3065 0.120074L57.3065 0.120074L57.3065 -0.879926L56.3065 -0.879926L56.3065 0.120074ZM34.9813 0.120076L34.9813 -0.879924L33.9813 -0.879924L33.9813 0.120076L34.9813 0.120076ZM14.5236 58.1223L34.2742 77.8729L35.6884 76.4587L15.9378 56.708L14.5236 58.1223ZM0.858585 73.2015L15.9378 58.1223L14.5236 56.708L-0.555622 71.7873L0.858585 73.2015ZM45.9971 116.926L0.858585 71.7873L-0.555622 73.2015L44.5828 118.34L45.9971 116.926ZM59.662 101.846L44.5828 116.926L45.9971 118.34L61.0763 103.261L59.662 101.846ZM59.6619 103.261L59.6625 103.261L61.0758 101.846L61.0751 101.845L59.6619 103.261ZM61.0756 103.26L91.1341 73.2015L89.7199 71.7873L59.6614 101.846L61.0756 103.26ZM91.1341 71.7873L76.0549 56.7081L74.6407 58.1223L89.7199 73.2015L91.1341 71.7873ZM74.6407 56.7081L55.5994 75.7494L57.0136 77.1636L76.0549 58.1223L74.6407 56.7081ZM57.3065 76.4565L57.3065 0.120074L55.3065 0.120074L55.3065 76.4565L57.3065 76.4565ZM56.3065 -0.879926L34.9813 -0.879924L34.9813 1.12008L56.3065 1.12007L56.3065 -0.879926ZM33.9813 0.120076L33.9813 77.1658L35.9813 77.1658L35.9813 0.120076L33.9813 0.120076Z" fill="currentColor"></path>
                </svg>
              </span>
              <div
                className={`circleIn2 ${styles.circleIn2} absolute w-[100%] h-[100%] scale-0 rounded-full flex items-center justify-center top-0 
                  left-0 bg-[#fff] text-[#000]`}
              >
                <p className={`circleInpara2 ${styles.circleInpara2} text-center font-[PlinaReg] text-[.9vw] scale-0 w-[70%]`}>
                  It will make you WOW! 😉
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Image Card 3 — Ochi */}
        <div className="secondCol sm:w-2/5 mt-[4vw]"
          ref={el => cardRefs.current[2] = el}
        >
          <div className='mb-[1.6vw] overflow-hidden relative' style={{ height: 'fit-content' }}>
            <h2 className='card-heading-default text-[5vw] mt-[7vw] sm:mt-0 mb-[7vw] sm:mb-0 sm:text-[2vw] font-[PlinaReg] uppercase sm:tracking-tight sm:leading-[2vw]'
            >Ochi</h2>
            <h2 className='card-heading-hover absolute top-0 left-0 text-[5vw] mt-[7vw] sm:mt-0 mb-[7vw] sm:mb-0 sm:text-[2vw] font-[PlinaReg] uppercase sm:tracking-tight sm:leading-[2vw]'
              style={{ transform: 'translateY(100%)' }}
            >Ochi</h2>
          </div>
          <div id="imageContainer"
            ref={wrapper2}
            className={`imageContainer ${styles.imageContainer} sm:ml-0 
              w-[55vw] h-[80vw]
              sm:w-[36vw] sm:h-[40vw] relative overflow-hidden `}
          >
            <img src="https://obys.agency/wp-content/uploads/2022/06/OCHI.png" alt="image1"
              className="inline-block sm:hidden w-full h-full object-cover"
            />
          </div>
          <div className='flex mt-[7vw] sm:mt-[1.6vw] font-[PlinaReg] text-[3vw] 
              sm:text-[.8vw] items-start justify-between 
              gap-8 pb-[6vw] sm:pb-[1.6vw]'
          >
            <h5 className=''>Website design, Development</h5>
            <h5>2022</h5>
          </div>
          <div className='divider-line-bar w-full h-[1px] bg-white' style={{ transformOrigin: 'right center' }}></div>
        </div>
        {/* Image Card 4 — David Laxer */}
        <div className="thirdCol"
          ref={el => cardRefs.current[3] = el}
        >
          <div className='mb-[1.6vw] overflow-hidden relative' style={{ height: 'fit-content' }}>
            <h2 className='card-heading-default text-[5vw] mt-[7vw] sm:mt-0 mb-[7vw] sm:mb-0 sm:text-[2vw] 
                  font-[PlinaReg] capitalize sm:tracking-tight sm:leading-[2vw]'
            >
              David Laxer
            </h2>
            <h2 className='card-heading-hover absolute top-0 left-0 text-[5vw] mt-[7vw] sm:mt-0 mb-[7vw] sm:mb-0 sm:text-[2vw] 
                  font-[PlinaReg] capitalize sm:tracking-tight sm:leading-[2vw]'
              style={{ transform: 'translateY(100%)' }}
            >
              David Laxer
            </h2>
          </div>
          <div
            id="imageContainer"
            ref={wrapper4}
            className={`imageContainer ${styles.imageContainer} sm:ml-0 w-[55vw] h-[80vw]
                sm:w-[30vw] sm:h-[38vw] relative overflow-hidden `}
          >
            <img src="https://obys.agency/wp-content/uploads/2023/08/Laxer_1-2.png" alt="image1"
              className="inline-block sm:hidden w-full h-full object-cover"
            />
          </div>
          <div className='flex mt-[7vw] sm:mt-[1.6vw] font-[PlinaReg] text-[3vw] 
                sm:text-[.8vw] items-start justify-between 
                pb-[6vw] sm:pb-[1.6vw]'
          >
            <h5>Website design, Development</h5>
            <h5>2023</h5>
          </div>
          <div className='divider-line-bar w-full h-[1px] bg-white' style={{ transformOrigin: 'right center' }}></div>
        </div>
      </div>

      {/* Project container 3rd row */}
      <div className="secondRow mt-[2vw] w-full sm:flex items-start gap-8 ">
        {/* Image Card 5 — Eminente */}
        <div className="thirdFirstCol sm:w-[22%] sm:-mt-[10vw]"
          ref={el => cardRefs.current[4] = el}
        >
          <div className='mb-[1.6vw] overflow-hidden relative' style={{ height: 'fit-content' }}>
            <h2 className='card-heading-default text-[5vw] mt-[7vw] sm:mt-0 mb-[7vw] sm:mb-0 sm:text-[2vw] 
                font-[PlinaReg] uppercase sm:tracking-tight sm:leading-[2vw]'
            >Eminente</h2>
            <h2 className='card-heading-hover absolute top-0 left-0 text-[5vw] mt-[7vw] sm:mt-0 mb-[7vw] sm:mb-0 sm:text-[2vw] 
                font-[PlinaReg] uppercase sm:tracking-tight sm:leading-[2vw]'
              style={{ transform: 'translateY(100%)' }}
            >Eminente</h2>
          </div>
          <div
            id="imageContainer"
            ref={wrapper5}
            className={`imageContainer ${styles.imageContainer} sm:ml-0 w-[55vw] h-[80vw]
              sm:w-[20vw] sm:h-[25vw] relative overflow-hidden `}
          >
            <img src="https://obys.agency/wp-content/uploads/2023/11/%C3%89minente_First.png" alt="image1"
              className="inline-block sm:hidden w-full h-full object-cover"
            />
          </div>
          <div className='flex mt-[7vw] sm:mt-[1.6vw] font-[PlinaReg] text-[3vw] 
              sm:text-[.8vw] items-start justify-between 
              gap-8 pb-[6vw] sm:pb-[1.6vw]'
          >
            <h5 className=''>Logo design, Website design, Development</h5>
            <h5>2023</h5>
          </div>
          <div className='divider-line-bar w-full h-[1px] bg-white' style={{ transformOrigin: 'right center' }}></div>
        </div>
        {/* button*/}
        <div className="thirdSecondCol w-2/5">
          <div className=' mt-[30vw] ml-[14vw] hidden sm:inline-block relative'>
            <div className={`button3  relative w-[22vw] h-[22vw] border rounded-full `} data-hover-text="">
              <span className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 -rotate-90'>
                <svg className="button__arrow" width="6vw" height="6vw" viewBox="0 0 91 118" fill="none">
                  <path d="M15.2307 57.4152L15.9378 56.708L15.2307 56.0009L14.5236 56.708L15.2307 57.4152ZM34.9813 77.1658L34.2742 77.8729L35.9813 79.58L35.9813 77.1658L34.9813 77.1658ZM0.151478 72.4944L-0.555622 71.7873L-1.26273 72.4944L-0.555622 73.2015L0.151478 72.4944ZM45.29 117.633L44.5828 118.34L45.29 119.047L45.9971 118.34L45.29 117.633ZM60.3692 102.554L61.0763 103.261L61.7839 102.553L61.0758 101.846L60.3692 102.554ZM60.3685 102.553L59.6614 101.846L58.9538 102.553L59.6619 103.261L60.3685 102.553ZM90.427 72.4944L91.1341 73.2015L91.8412 72.4944L91.1341 71.7873L90.427 72.4944ZM75.3478 57.4152L76.0549 56.7081L75.3478 56.001L74.6407 56.7081L75.3478 57.4152ZM56.3065 76.4565L55.3065 76.4565L55.3065 78.8707L57.0136 77.1636L56.3065 76.4565ZM56.3065 0.120074L57.3065 0.120074L57.3065 -0.879926L56.3065 -0.879926L56.3065 0.120074ZM34.9813 0.120076L34.9813 -0.879924L33.9813 -0.879924L33.9813 0.120076L34.9813 0.120076ZM14.5236 58.1223L34.2742 77.8729L35.6884 76.4587L15.9378 56.708L14.5236 58.1223ZM0.858585 73.2015L15.9378 58.1223L14.5236 56.708L-0.555622 71.7873L0.858585 73.2015ZM45.9971 116.926L0.858585 71.7873L-0.555622 73.2015L44.5828 118.34L45.9971 116.926ZM59.662 101.846L44.5828 116.926L45.9971 118.34L61.0763 103.261L59.662 101.846ZM59.6619 103.261L59.6625 103.261L61.0758 101.846L61.0751 101.845L59.6619 103.261ZM61.0756 103.26L91.1341 73.2015L89.7199 71.7873L59.6614 101.846L61.0756 103.26ZM91.1341 71.7873L76.0549 56.7081L74.6407 58.1223L89.7199 73.2015L91.1341 71.7873ZM74.6407 56.7081L55.5994 75.7494L57.0136 77.1636L76.0549 58.1223L74.6407 56.7081ZM57.3065 76.4565L57.3065 0.120074L55.3065 0.120074L55.3065 76.4565L57.3065 76.4565ZM56.3065 -0.879926L34.9813 -0.879924L34.9813 1.12008L56.3065 1.12007L56.3065 -0.879926ZM33.9813 0.120076L33.9813 77.1658L35.9813 77.1658L35.9813 0.120076L33.9813 0.120076Z" fill="currentColor"></path>
                </svg>
              </span>
              <div
                className={`circleIn3 ${styles.circleIn3} absolute w-[100%] h-[100%] scale-0 rounded-full flex items-center justify-center top-0 
                  left-0 bg-[#fff] text-[#000]`}
              >
                <p className={`circleInpara3 ${styles.circleInpara3} text-center font-[PlinaReg] text-[.9vw] scale-0 w-[70%]`}>
                  We like its color palette 🎨
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Image Card 6 — Makhno */}
        <div className="thirdThirdCol sm:mt-[8vw]"
          ref={el => cardRefs.current[5] = el}
        >
          <div className='sm:mb-[1.6vw] overflow-hidden relative' style={{ height: 'fit-content' }}>
            <h2 className='card-heading-default text-[5vw] mt-[7vw] sm:mt-0 mb-[7vw] sm:mb-0 sm:text-[2vw] font-[PlinaReg] uppercase sm:tracking-tight sm:leading-[2vw]'
            >Makhno</h2>
            <h2 className='card-heading-hover absolute top-0 left-0 text-[5vw] mt-[7vw] sm:mt-0 mb-[7vw] sm:mb-0 sm:text-[2vw] font-[PlinaReg] uppercase sm:tracking-tight sm:leading-[2vw]'
              style={{ transform: 'translateY(100%)' }}
            >Makhno</h2>
          </div>
          <div id="imageContainer"
            ref={wrapper6}
            className={`imageContainer ${styles.imageContainer} sm:ml-0 realtive w-[55vw] h-[80vw]
                sm:w-[30vw] sm:h-[38vw] relative overflow-hidden `}
          >
            <img src="https://obys.agency/wp-content/uploads/2023/12/Makhno_First.png" alt="image1"
              className="inline-block sm:hidden w-full h-full object-cover"
            />
          </div>
          <div className='flex mt-[7vw] sm:mt-[1.6vw] font-[PlinaReg] text-[3vw] sm:text-[.8vw] items-start justify-between 
                pb-[6vw] sm:pb-[1.6vw]'
          >
            <h5>Website design, Development</h5>
            <h5>2023</h5>
          </div>
          <div className='divider-line-bar w-full h-[1px] bg-white' style={{ transformOrigin: 'right center' }}></div>
        </div>
      </div>
    </div>
  )
}

export default Project
