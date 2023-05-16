"use server"
import Jobs from "@/components/Jobs"
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { cookies, headers } from "next/headers"
import { redirect } from "next/navigation"

export default async function Page() {
	const supabase = createServerComponentSupabaseClient({
		headers,
		cookies,
	})
	const { data: jobs } = await supabase.from("jobs").select()

	const {
		data: { session },
	} = await supabase.auth.getSession()

	if (!session) redirect("/auth")

	return (
		<>
			<Jobs jobs={jobs} />
		</>
	)
}
