import Jobs from "@/components/Jobs"
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { cookies, headers } from "next/headers"

export default async function Page() {
	const supabase = createServerComponentSupabaseClient({
		headers,
		cookies,
	})
	const { data: job } = await supabase.from("job").select()
	return (
		<>
			<Jobs jobs={job} />
		</>
	)
}
