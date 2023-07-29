import { AuthBlock, UserSessionProvider } from '@/components/providers'
import StyledComponentsRegistry from '@/middleware/styleRegistry'
import { Vollkorn } from 'next/font/google'
import { Footer, NavBar, MainContainer } from '@/components/layout'

const vollkorn = Vollkorn({
    subsets: ['latin'],
    display: 'swap',
})

export const metadata = {
    title: 'School',
    description: 'Next level learning',
    icons: { icon: { url: '/favicon.ico' } }
}

export default function RootLayout({
    children,
    params
}) {
    return (
        <html lang="en" className={vollkorn.className}>
            <body>
                <UserSessionProvider>
                    <AuthBlock>
                        <StyledComponentsRegistry>
                            <NavBar />
                            <MainContainer>
                                {children}
                            </MainContainer>
                            <Footer />
                        </StyledComponentsRegistry>
                    </AuthBlock>
                </UserSessionProvider>
            </body>
        </html>
    )
}