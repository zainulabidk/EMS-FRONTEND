import React from 'react'
import Home from './component/Home'
import TopNavbar from './component/TopNavbar'
import Service from './component/Service'
import Contact from './component/Contact'
import Footer from './component/Footer'
import './component/style.css'

function App() {
  return (
    <div>
    <TopNavbar/>
    <Home/>
    <Service/>
       <Contact/>
      <Footer/>
    </div>
  )
}

export default App