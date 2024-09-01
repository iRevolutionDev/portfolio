import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardNavbar } from "@/components/dashboard-navbar";
import { withAuth } from "@/hooks/with-auth";
import type { FC, PropsWithChildren } from "react";

const DashboardLayout: FC<PropsWithChildren> = async ({ children }) => {
	return (
		<main className="flex flex-row h-screen">
			<DashboardNavbar />
			<section className="flex flex-col flex-1 overflow-y-auto h-screen">
				<DashboardHeader />
				<section className="p-5 h-full">{children}</section>
			</section>
		</main>
	);
};

export default await withAuth(DashboardLayout);
