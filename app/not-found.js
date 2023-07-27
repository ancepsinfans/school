'use client'
import { BlueButton } from '../components/atomic'
import { Title, Intro } from '../components/layout'

export default function NotFound() {
    return (
        <>
            <Title>404</Title>
            <Intro>This page doesn't exist... yet</Intro>
            <p>Do you want it to?</p>
            <BlueButton
                id='404'
                onClick={() => alert('duly noted')}
            >Yes</BlueButton>
        </>
    )
}