
import './App.css'
import LocomotiveScroll from 'locomotive-scroll';
import Navbar from './components/Navbar/Index';
import Landing from './components/landing/Index';
import Loader from './components/loader/Index';

const scroll = new LocomotiveScroll();

function App() {
  
  
  return (
    <div className='main text-white'>
      <Loader />
      <Navbar/>
      <Landing />
    </div>
  )
}

export default App
