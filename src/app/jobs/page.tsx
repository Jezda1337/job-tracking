"use client"

import ViewCard from "@/components/ViewCard"
import { useSupabase } from "@/lib/supabase-provider"
import { Job } from "@/types/job"
import { SortAscIcon, SortDescIcon } from "lucide-react"
import { useEffect, useState } from "react"

export default function Page() {
	const [jobs, setJobs] = useState<Job[] | null>([])
	const { supabase } = useSupabase()

	async function getJobs() {
		let { data: job } = await supabase.from("job").select("*")
		console.log(job)
		setJobs(job)
	}

	useEffect(() => {
		getJobs()
	}, [])

	return (
		<div className="mx-auto max-w-5xl">
			{jobs?.length !== 0 ? (
				<table className="mt-16 w-full">
					<thead className="w-full text-left">
						<tr className="text-left">
							<th className="mb-4 w-48 rounded-bl rounded-tl bg-secondary py-2 pl-4">
								Company Name
							</th>
							<th className="bg-secondary">Position</th>
							<th className="w-20 bg-secondary">Link</th>
							<th className="w-32 bg-secondary">
								<div className="flex gap-2">
									<p>Status</p>
									<button>
										{true ? (
											<SortAscIcon className="aspect-square w-4" />
										) : (
											<SortDescIcon className="aspect-square w-4" />
										)}
									</button>
								</div>
							</th>
							<th className="w-32 bg-secondary">
								<div className="flex gap-2">
									<p>Date</p>
									<button>
										{true ? (
											<SortAscIcon className="aspect-square w-4" />
										) : (
											<SortDescIcon className="aspect-square w-4" />
										)}
									</button>
								</div>
							</th>
							<th className="rounded-br rounded-tr bg-secondary text-center">
								Edit
							</th>
						</tr>
					</thead>
					<tbody>
						{jobs?.map((job: Job) => (
							<ViewCard
								key={job.id}
								companyName={job.companyName}
								position={job.position}
								submitedDate={new Date(job.submitedDate!)}
								status={job.status}
								link={job.link}
								id={job.id}
							/>
						))}
					</tbody>
				</table>
			) : (
				<div className="mt-44 text-center text-3xl">No jobs.</div>
			)}
		</div>
	)
}
