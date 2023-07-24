import { AuthBlock } from '../components/meta'
import UserSessionProvider from '../components/providers/UserSessionProvider/UserSessionProvider'

import StyledComponentsRegistry from '../middleware/styleRegistry'
import { Vollkorn } from 'next/font/google'
import { Footer, NavBar } from '../components/layout'

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
}) {
    return (
        <html lang="en" className={vollkorn.className}>
            <body>
                <UserSessionProvider>
                    <AuthBlock>
                        <StyledComponentsRegistry>
                            <NavBar />
                            {children}
                            <Footer />
                        </StyledComponentsRegistry>
                    </AuthBlock>
                </UserSessionProvider>
            </body>
        </html>
    )
}