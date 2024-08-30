import { auth } from "@/auth";
import { AUTH_REDIRECT } from "@/constants/routes";
import { redirect } from "next/navigation";
import type { FC } from "react";
import IntrinsicAttributes = React.JSX.IntrinsicAttributes;

/**
 * HOC to check if the user is authenticated (Server-Side)
 * @param Component
 */
export const withAuth = async (Component: FC) => {
	return async function AuthenticatedComponent(props: IntrinsicAttributes) {
		const session = await auth();

		if (!session) {
			redirect(AUTH_REDIRECT);
		}

		return <Component {...props} />;
	};
};
