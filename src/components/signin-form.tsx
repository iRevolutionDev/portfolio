"use client";

import { signInAction } from "@/app/[locale]/dashboard/signin/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, CircularProgress, TextField, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { enqueueSnackbar } from "notistack";
import { useTransition } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
	email: z.string().email("email.invalid").min(1),
	password: z.string().min(1, "password.required"),
});

type FormData = z.infer<typeof schema>;

export const SignInForm = () => {
	const t = useTranslations("pages.dashboard.signIn");
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
				label={t("email.label")}
				placeholder={t("email.placeholder")}
				variant="outlined"
				{...register("email", { required: true })}
				error={!!errors.email}
				helperText={errors.email?.message && t(errors.email.message as never)}
			/>
			<TextField
				type="password"
				label={t("password.label")}
				placeholder={t("password.placeholder")}
				variant="outlined"
				{...register("password", { required: true })}
				error={!!errors.password}
				helperText={
					errors.password?.message && t(errors.password.message as never)
				}
			/>

			<Button
				type="submit"
				variant="contained"
				color="primary"
				className="mt-8"
				disabled={!isValid || pending}
			>
				<Typography>{t("submit")}</Typography>
				{pending && <CircularProgress size={24} className="absolute" />}
			</Button>
		</form>
	);
};
