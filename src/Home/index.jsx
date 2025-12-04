import React from 'react'
import Navbar from '../components/header/navbar'
import Hero from '../components/header/Hero'
import Footer from '../components/footer'
import Shop from '../Products'

export const Home = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <Shop/>
            <Footer />
        </>
    )
}
