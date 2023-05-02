import MainHeader from "@/components/MainHeader"
import { Toaster } from "@/components/Toaster"
import SupabaseProvider from "@/lib/supabase-provider"
import { Poppins } from "next/font/google"
import "./globals.css"

export const metadata = {
	title: "JobTracking",
	description: "Track your current and next jobs.",
}

const poppins = Poppins({
	subsets: ["latin"],
	weight: ["400", "500"],
})
export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className={`min-h-screen bg-white  ${poppins.className}`}>
				<SupabaseProvider>
					<MainHeader />
					{children}
					<Toaster />
				</SupabaseProvider>
			</body>
		</html>
	)
}
