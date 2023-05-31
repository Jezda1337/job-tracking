"use server"
import Jobs from "@/components/Jobs"
import { Job } from "@/types/job"
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { cookies, headers } from "next/headers"
import { redirect } from "next/navigation"

export default async function Page() {
	const supabase = createServerComponentSupabaseClient({
		headers,
		cookies,
	})
	const { data: jobs } = await supabase.from("jobs").select()

	const rejectedJobs: Job[] = []
	const otherJobs: Job[] = [](jobs as Job[]).forEach((job: Job) => {
		if (job.status === "rejected") {
			rejectedJobs.push(job)
		} else {
			otherJobs.push(job)
		}
	})

	rejectedJobs.sort((a: Job, b: Job) => {
		if (
			new Date(b.created_at).getTime() - new Date(a.created_at).getTime() !==
			0
		) {
			return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
		} else {
			return a.status.localeCompare(b.status)
		}
	})

	otherJobs.sort((a: Job, b: Job) => {
		if (
			new Date(b.created_at).getTime() - new Date(a.created_at).getTime() !==
			0
		) {
			return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
		} else {
			return a.status.localeCompare(b.status)
		}
	})

	const sortedJobs = [...otherJobs, ...rejectedJobs]

	const {
		data: { session },
	} = await supabase.auth.getSession()

	if (!session) redirect("/auth")

	return (
		<section className="mt-12">
			<Jobs jobs={(sortedJobs as Job[]) ?? []} />
		</section>
	)
}
