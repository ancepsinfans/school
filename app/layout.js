import { AuthBlock } from '../components/meta'
import UserSessionProvider from '../components/providers/UserSessionProvider/UserSessionProvider'
import StyledComponentsRegistry from '../middleware/styleRegistry'



export const metadata = {
    title: 'School',
    description: 'Next level learning',
    // stylesheet: [{ url: 'https://fonts.googleapis.com/css2?family=Vollkorn:ital,wght@0,400;0,500;0,700;1,400;1,500&display=swap' }],
    icons: { icon: [{ url: '/favicon.ico' }] }
}

export default function RootLayout({
    // Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
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