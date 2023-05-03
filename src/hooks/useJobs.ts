import { useSupabase } from "@/lib/supabase-provider"
import { Job } from "@/types/job"
import { useEffect, useState } from "react"

export function useJobs() {
	const [jobs, setJobs] = useState<Job[] | null>([])
	const [error, setError] = useState<any>()
	const { supabase } = useSupabase()

	useEffect(() => {
		async function getJobs() {
			try {
				const { data: job } = await supabase.from("job").select("*")
				setJobs(job)
			} catch (error) {
				setError(error)
			}
		}
		getJobs()
	}, [supabase])

	return [jobs, error]
}
