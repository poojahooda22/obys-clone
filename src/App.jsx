
import './App.css'
import LocomotiveScroll from 'locomotive-scroll';
import Navbar from './components/Navbar/Index';
import Landing from './components/landing/Index';
import Loader from './components/loader/Index';

const scroll = new LocomotiveScroll();

function App() {
  
  
  return (
    <div className='main text-white bg-[#0b0b0b]'>
      <Loader />
      <Landing />
    </div>
  )
}

export default App
