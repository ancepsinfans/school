'use client'
import { MainContainer } from '../components/meta'
import { BlueButton } from '../components/atomic'

export default function NotFound() {
    return (
        <MainContainer
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