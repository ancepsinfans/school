import react from "react";
import NextLessonButton from "../../components/NextLessonButton";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import MainContainer from "../../components/MainContainer";

const CloseReading = () => {
    const { user } = useUser()
    const router = useRouter()

    return (
        <MainContainer
            smallTitle={true}
            titleText='Close Reading'
            introText='Placeholder'
        >
            <NextLessonButton
                link='/literature'
                text='Literature hub'
                user={user ? user.email : 'none'}
                sphere={router.pathname.split('/')[1]}
                path={router.pathname}
            />
        </MainContainer>
    )
}

export default CloseReading

