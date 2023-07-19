import { AuthBlock } from '../components/meta'
import UserSessionProvider from '../components/providers/UserSessionProvider/UserSessionProvider'
import StyledComponentsRegistry from '../middleware/styleRegistry'



export const metadata = {
    title: 'School',
    description: 'Next level learning',
    icons: { icon: { url: '/favicon.ico' } }
}

export default function RootLayout({
    children,
}) {
    return (
        <html lang="en">
            <body>
                <UserSessionProvider>
                    <AuthBlock>
                        <StyledComponentsRegistry>
                            {children}
                        </StyledComponentsRegistry>
                    </AuthBlock>
                </UserSessionProvider>
            </body>
        </html>
    )
}