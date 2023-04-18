import React from "react";
import { MainContainer } from '../components/infrastructureComponents'
import Image from "next/image";
import Me from '../public/images/me.jpeg'



const About = () => {
    return (
        <MainContainer
            titleText='About me'
        >
            <h2>Hi! This is me, Zach.</h2>
            <div style={{ width: '10%', margin: '0 auto' }}>
                <Image src={Me} />
            </div>
        </MainContainer>
    )
}

export default About