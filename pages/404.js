import React from "react";
import { MainContainer, BlueButton } from "../components/infrastructureComponents";

const FourOhFour = () => {
    return (
        <MainContainer
            isHome={false}
            titleText='404'
            introText="This page doesn't exist... yet"
        >
            <p>Do you want it to?</p>
            <BlueButton
                link='/'
                onClick={() => alert('duly noted')}
            >Yes</BlueButton>
        </MainContainer>
    )
}

export default FourOhFour

