import React from "react";
import { MainContainer } from '../components/meta'
import Image from "next/image";



const About = () => {
    return (
        <MainContainer
            titleText='About me'
        >
            <h2>Hi! This is me, Zach.</h2>
            <div style={{ width: '10%', margin: '0 auto' }}>
                <Image
                    width={100}
                    height={100}
                    alt=""
                    src='https://zach.bullard.dev/images/author/profile_hu66165088d23e25f7e32b9f17dd432d89_9199917_148x148_fit_q75_box.jpg' />
            </div>
        </MainContainer>
    )
}

export default About