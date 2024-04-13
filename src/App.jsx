
import './App.css'
import { useRef, useEffect } from 'react'
import Landing from './components/landing/Index';
import Loader from './components/loader/Index';
import { LocomotiveScrollProvider } from 'react-locomotive-scroll'
import Cursor from './components/Cursor/Index';


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
    
    containerRef={containerRef}
    >
      <div data-scroll-container ref={containerRef} className='main text-white bg-[#151515]'>
        <Cursor/>
        <Loader />
        <Landing />
      </div>
    </LocomotiveScrollProvider>
    
  )
}

export default App
