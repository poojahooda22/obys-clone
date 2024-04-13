
import './App.css'
import { useRef, useEffect } from 'react'
import Landing from './components/landing/Index';
import Loader from './components/loader/Index';
import { LocomotiveScrollProvider } from 'react-locomotive-scroll'


function App() {
  const containerRef = useRef(null)
  useEffect(() => {
    // Update the locomotive scroll whenever the location changes
    if (containerRef.current) {
      const event = new Event('resize');
      window.dispatchEvent(event);
    }
  }, [location]);
  
  return (
    <LocomotiveScrollProvider
    options={
      {
        smooth: true,
        // ... all available Locomotive Scroll instance options 
      }
    }
    watch={
      [
        //...all the dependencies you want to watch to update the scroll
      ]
    }
    containerRef={containerRef}
    >
      <div data-scroll-container ref={containerRef} className='main text-white bg-[#151515]'>
        <Loader />
        <Landing />
      </div>
    </LocomotiveScrollProvider>
    
  )
}

export default App
