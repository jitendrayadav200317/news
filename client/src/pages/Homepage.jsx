import React from 'react'
import Category from '../components/Category'
import HeroSection from '../components/HeroSection'
import NewsletterSubscription from '../components/NewsLettterSubscription'
import EditorialsSection from '../components/EditorialsSection'


function Homepage() {
  return (
    <div>
      <HeroSection/>
     <Category/>
     <EditorialsSection/>
     <NewsletterSubscription/>
   
    </div>
  )
}

export default Homepage
