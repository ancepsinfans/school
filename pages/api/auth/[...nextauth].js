import NextAuth from "next-auth"
import GoogleProvider from 'next-auth/providers/google'

export const authOptions = {
    // Configure one or more authentication providers
    providers: [

        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),

        // ...add more providers here
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            console.log(user)

            return true
        },
    }
}

export default NextAuth(authOptions)