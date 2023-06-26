import React from "react";
import { MainContainer } from '../components/meta'
import Image from "next/image";



const About = () => {
    return (
        <MainContainer
            titleText='About me'
        >
            <h2>Hi! This is me, Zach.</h2>
            <Image
                width={200}
                height={300}
                alt=""
                src='/images/me.jpeg' />
            <h3>Buy me a coffee?</h3>
            <aside>Lightning QR: $5</aside>
            <Image
                width={300}
                height={300}
                alt=""
                src='/images/lnqr.png' />
        </MainContainer>
    )
}

export default About