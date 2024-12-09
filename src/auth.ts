import type { User } from "@/@types/user";
import { env } from "@/env";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
	providers: [
		Credentials({
			credentials: {
				email: {
					label: "Email",
					type: "email",
				},
				password: {
					label: "Password",
					type: "password",
				},
			},
			authorize: async (credentials) => {
				const response = await fetch(
					`${env.NEXT_PUBLIC_API_URL}/v1/auth/login`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ ...credentials }),
					},
				);

				console.log(response);

				if (!response.ok) {
					return null;
				}

				const user = (await response.json()) as User;

				return {
					id: user.id,
					email: user.email,
					username: user.username,
					access_token: user.access_token,
				};
			},
		}),
	],
	callbacks: {
		jwt: async ({ token, user }) => {
			return { ...token, ...user };
		},

		async session({ session, token }) {
			const signedIn = !!token;

			if (signedIn) {
				// @ts-ignore - This is a hack to get around the fact that the session object is not typed
				session.user = token as User;
			}

			return session;
		},
	},
	session: {
		strategy: "jwt",
		maxAge: 60 * 60 * 24 * 7,
	},
	pages: {
		signIn: "/dashboard/signin",
		error: "/dashboard/signin",
		signOut: "/dashboard/signin",
	},
});

declare module "next-auth" {
	interface Session {
		user: User;
	}

	interface JWT {
		access_token: string;
	}
}
