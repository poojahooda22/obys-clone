
import './App.css'


import Landing from './components/landing/Index';
import Loader from './components/loader/Index';


function App() {
  
  
  return (
    <div className='main text-white bg-[#151515]'>
      <Loader />
      <Landing />
    </div>
  )
}

export default App
