import React from "react";
import { MainContainer } from '../components/meta'
import Image from "next/image";
import { useClipboard } from "../middleware/hooks";


const About = () => {
    const { writeToClipboard } = useClipboard();

    const handleCopy = () => {
        const text = 'lnbc164u1pjfn4wapp5s5qqlum9trff04w8z6usqtn2pmwcz5mnk506qens2schyyzyzpmqdqu2askcmr9wssx7e3q2dshgmmndp5scqzzsxqyz5vqsp5nvjnkrkj4dsqe5rxr60zfe4nggku5cvfzljtcx5t7ae4s0ntn20q9qyyssqexqu20czp7rq2x9vd3yxw2s7zl0kq6pq9z6nh8ce8zacqd0y5jxk5mc2mulj7jfe24alc9qcg4h6t0slm8ff2rlc3hpetczezup9k9gp4ry5kw';
        writeToClipboard(text);
        alert('copied lnurl!')
    };


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
            <aside>Lightning QR: $5 / 16,400 sats</aside>
            <Image
                onClick={handleCopy}
                width={300}
                height={300}
                alt=""
                src='/images/lnqr.png' />
        </MainContainer>
    )
}

export default About