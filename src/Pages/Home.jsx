import React from 'react'
import Hero from '../Components/HomePage/Hero'
import PopularCategories from '../Components/HomePage/PopularCategories'
import Trending from '../Components/HomePage/Trending'
import FeaturedProducts from '../Components/HomePage/FeaturedProducts'

function Home() {
  return (
    <>
      <Hero />
      <PopularCategories />
      <Trending />
      <FeaturedProducts />
    </>
  )
}

export default Home