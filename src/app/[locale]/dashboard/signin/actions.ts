"use server";

import { signIn } from "@/auth";
import { DASHBOARD_HOME_PATH } from "@/constants/routes";
import { AuthError } from "next-auth";

export const signInAction = async (
	email: string,
	password: string,
): Promise<{ message: string } | undefined> => {
	try {
		await signIn("credentials", {
			email,
			password,
			redirectTo: DASHBOARD_HOME_PATH,
		});
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return { message: "Invalid email or password" };
				default:
					return { message: "An error occurred" };
			}
		}

		throw error;
	}
};
