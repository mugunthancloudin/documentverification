import React from 'react'
import HomePage from '../components/landingDestination/homePage/homePage'
import StakeHolders from '../components/landingDestination/stakeHolders/stakeHolders'
import Banner from '../components/landingDestination/banner/banner'
import Contact from '../components/landingDestination/contact/contact'
import Footer from '../components/header&footer/footer/footer'
import Scrollbar from '../components/header&footer/header/scrollbar'

export default function DestinationPage() {
  return (
    <>
    <Scrollbar/>
      <HomePage/>
      <StakeHolders/>
      <Banner/>
      <Contact/>
      <Footer/>
    </>
  )
}
