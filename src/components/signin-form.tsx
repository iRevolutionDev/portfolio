"use client";

import { signInAction } from "@/app/[locale]/dashboard/signin/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, CircularProgress, TextField, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useTransition } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
	email: z.string().email("Invalid email").min(1),
	password: z.string().min(1, "Password is required"),
});

type FormData = z.infer<typeof schema>;

export const SignInForm = () => {
	const [pending, startTransition] = useTransition();

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
		mode: "onBlur",
	});

	const onSubmit: SubmitHandler<FormData> = async ({ email, password }) => {
		startTransition(async () => {
			const error = await signInAction(email, password);

			error && enqueueSnackbar(error.message, { variant: "error" });
		});
	};

	return (
		<form
			className="flex flex-col gap-4 w-full"
			onSubmit={handleSubmit(onSubmit)}
		>
			<TextField
				type="email"
				label="Email"
				placeholder="Enter your email"
				variant="outlined"
				{...register("email", { required: true })}
				error={!!errors.email}
				helperText={errors.email?.message}
			/>
			<TextField
				type="password"
				label="Password"
				placeholder="Enter your password"
				variant="outlined"
				{...register("password", { required: true })}
				error={!!errors.password}
				helperText={errors.password?.message}
			/>

			<Button
				type="submit"
				variant="contained"
				color="primary"
				className="mt-8"
				disabled={!isValid || pending}
			>
				<Typography>Sign In</Typography>
				{pending && <CircularProgress size={24} className="absolute" />}
			</Button>
		</form>
	);
};
