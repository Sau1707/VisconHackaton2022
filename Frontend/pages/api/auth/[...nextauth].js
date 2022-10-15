import NextAuth, { Account, CallbacksOptions, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import KeycloakProvider, { KeycloakProfile } from "next-auth/providers/keycloak";

export default NextAuth({
    providers: [
        KeycloakProvider({
            clientId: process.env.CLIENT_ID ?? "",
            clientSecret: process.env.CLIENT_SECRET ?? "",
            issuer: process.env.CLIENT_ISSUER ?? "",
            authorization: { params: { scope: "openid" } },
            name: "VSETH",
        }),
    ],
    theme: {
        colorScheme: "dark",
    },
    jwt: {
        secret: process.env.SECRET,
    },
    callbacks: {
        async session({ session, token }) {
            if (token) {
                session.user.preferred_username = token.user.preferred_username;
                session.user.name = token.user.name;
                session.user.given_name = token.user.given_name;
                session.user.family_name = token.user.family_name;
            }

            return session
        },
        async jwt({ token, profile }) {
            if (profile) {
                token.user = {
                    preferred_username: profile.preferred_username,
                    name: profile.name,
                    given_name: profile.given_name,
                    family_name: profile.family_name,
                };
            }
            return token;
        },
    }
})
