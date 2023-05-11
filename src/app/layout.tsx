import MainHeader from "@/components/MainHeader"
import { Toaster } from "@/components/Toaster"
import SupabaseProvider from "@/lib/supabase-provider"
import { Poppins } from "next/font/google"
import "./globals.css"

import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { cookies, headers } from "next/headers"

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
	const supabase = createServerComponentSupabaseClient({
		headers,
		cookies,
	})
	const {
		data: { session },
	} = await supabase.auth.getSession()
	return (
		<html lang="en">
			<body className={`min-h-screen bg-white  ${poppins.className}`}>
				<SupabaseProvider session={session}>
					{session ? <MainHeader /> : null}
					{children}
					<Toaster />
				</SupabaseProvider>
			</body>
		</html>
	)
}
