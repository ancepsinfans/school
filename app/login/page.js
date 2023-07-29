import { Title, Intro, Grid, GridCard } from "@/components/layout";
import { signIn } from "next-auth/react";
import constants from "@/styles/constants";

export default function Login() {

    return (
        <>
            <Title>
                Welcome to <span style={{ color: constants.accentRedMain }}>school!</span>
            </Title>
            <Intro>
                <>
                    <p>Knowledge should be accessible.</p>
                    <p>Here you'll find a collection of interesting things.</p>
                    <p>The topics will vary, but the through-line is that these things are meant to spark curiosity.</p>
                </>
            </Intro>
            <Grid>
                <GridCard
                    link=''
                    onClick={() => signIn()}
                    title='Login to get started'
                    description='By logging in it allows us to improve your experience'
                />
            </Grid>
        </>
    )
}