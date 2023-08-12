import { AuthBlock, IdProvider, UserSessionProvider } from '@/components/providers'
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

export default async function RootLayout({
    children,
}) {

    return (
        <html lang="en" className={vollkorn.className}>
            <body>
                <UserSessionProvider>
                    <AuthBlock>
                        <IdProvider>
                            <StyledComponentsRegistry>
                                <NavBar />
                                <MainContainer>
                                    {children}
                                </MainContainer>
                                <Footer />
                            </StyledComponentsRegistry>
                        </IdProvider>
                    </AuthBlock>
                </UserSessionProvider>
            </body>
        </html>
    )
}