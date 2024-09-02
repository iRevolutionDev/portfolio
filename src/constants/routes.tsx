import { PostAdd } from "@mui/icons-material";

export const Routes = [
	{
		name: "routes.home",
		path: "/",
	},
	{
		name: "routes.projects",
		path: "/projects",
	},
	{
		name: "routes.terminal",
		path: "/terminal",
	},
];

export const DashboardRoutes = [
	{
		name: "routes.posts",
		path: "/posts",
		icon: <PostAdd />,
	},
];

export const DASHBOARD_HOME_PATH = `/dashboard${DashboardRoutes[0].path}`;
export const AUTH_REDIRECT = "/dashboard/signin";
