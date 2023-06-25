import React from "react";
import { MainContainer } from "../components/meta";
import { BlueButton } from "../components/atomic";

const FourOhFour = () => {
    return (
        <MainContainer
            isHome={false}
            titleText='404'
            introText="This page doesn't exist... yet"
        >
            <p>Do you want it to?</p>
            <BlueButton
                id='404'
                onClick={() => alert('duly noted')}
            >Yes</BlueButton>
        </MainContainer>
    )
}

export default FourOhFour

