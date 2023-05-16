import Login from "@/components/Login"
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { cookies, headers } from "next/headers"
import { redirect } from "next/navigation"

export default async function Page() {
	const supabase = createServerComponentSupabaseClient({
		headers,
		cookies,
	})
	const {
		data: { session },
	} = await supabase.auth.getSession()

	if (session) return redirect("/jobs")

	return (
		<section className="flex min-h-[calc(100vh-104px)] flex-col items-center text-center">
			<h1 className="mb-12 mt-48 max-w-3xl text-5xl">
				Yet another app to help you track your job applications.
			</h1>
			<p>If you are like me, you gonna love this app, trust me!</p>
			<div className="mt-4">
				<Login />
			</div>
		</section>
	)
}
