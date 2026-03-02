
import './App.css'
import Landing from './components/landing/Index';
import Loader from './components/loader/Index';
import Cursor from './components/Cursor/Index';
import Video from './components/Video/Index';
import About from './components/About/Index';
import Marqueue from './components/Marqueue/Index';
import Footer from './components/Footer/Index';
import Navbar from './components/Navbar/Index';
import Project from './components/Project/Index';
import CenterButton from './components/CenterButton';
import useLenis from './hooks/useLenis';


function App() {
  // Initialize Lenis smooth scroll + ScrollTrigger integration
  const lenisRef = useLenis()

  return (
    <div className='main text-white overflow-hidden'>
      <Cursor />
      <Loader lenisRef={lenisRef} />
      <div className=' bg-[#151515]'>
        <Navbar />
        <Landing />
        {/* video */}
        <Video />
        <Project />
        <CenterButton />
        <About />
        <Marqueue />
        <Footer />
      </div>
    </div>
  )
}

export default App
