import React from 'react'
import Hero from '../components/header/Hero'
import Footer from '../components/footer'
import Shop from '../Products'

export const Home = () => {
    return (
        <>
            <Hero />
            <Shop/>
            <Footer />
        </>
    )
}
