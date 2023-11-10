import React from 'react'
import Home01 from "../components/landingPage/home/home01"
import Home02 from '../components/landingPage/home/home02'
import Home03 from '../components/landingPage/home/home03'
import Home04 from '../components/landingPage/home/home04'
import Home05 from '../components/landingPage/home/home05'
import Contact from '../components/landingPage/home/contact'
import Footer from '../components/header&footer/footer/footer'
import Scrollbar from '../components/header&footer/header/scrollbar'

export default function LandingPage() {
  return (
    <>
    <Scrollbar/>
     <Home01/>
     <Home02/>
     <Home03/>
     <Home04/>
     <Home05/>
     <Contact/>
    <Footer/>
    </>
  )
}
