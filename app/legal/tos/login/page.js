import { Title, Intro, Grid, LoginCard } from "@/components/layout";

export default function Login() {

    return (
        <>
            <Title>
                Welcome to <span className="school">school</span>!
            </Title>
            <Intro>
                <>
                    <p>Knowledge should be accessible.</p>
                    <p>Here you'll find a collection of interesting things.</p>
                    <p>The topics will vary, but the through-line is that these things are meant to spark curiosity.</p>
                </>
            </Intro>
            <Grid>
                <LoginCard />
            </Grid>
        </>
    )
}