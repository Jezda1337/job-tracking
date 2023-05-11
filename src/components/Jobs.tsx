"use client"

import { useSupabase } from "@/lib/supabase-provider"
import { Job } from "@/types/job"
import { SortAsc, SortDesc } from "lucide-react"
import { useEffect, useState } from "react"
import AddNewJobDialog from "./AddNewJobDialog"
import ViewCard from "./ViewCard"
import ViewCardMobile from "./ViewCardMobile"

export default function Jobs(props: any) {
	const { supabase } = useSupabase()
	const [jobs, setJobs] = useState<any>(props.jobs)

	useEffect(() => {
		const channel = supabase
			.channel("job")
			.on(
				"postgres_changes",
				{
					event: "INSERT",
					schema: "public",
					table: "job",
				},
				(payload) => {
					setJobs([...jobs, payload.new])
				}
			)
			.on(
				"postgres_changes",
				{
					event: "UPDATE",
					schema: "public",
					table: "job",
				},
				(payload) => {
					setJobs(
						jobs.map((job: Job) => {
							if (job.id === payload.old.id) {
								return payload.new
							} else {
								return job
							}
						})
					)
				}
			)
			.on(
				"postgres_changes",
				{
					event: "DELETE",
					schema: "public",
					table: "job",
				},
				(payload) => {
					setJobs(jobs.filter((job: Job) => job.id !== payload.old.id))
				}
			)
			.subscribe()
		// .subscribe((status) => {
		// 	console.log("subscribe status = ", status)
		// })

		return () => {
			supabase.removeChannel(channel)
		}
	}, [props.jobs, jobs, setJobs, supabase])

	return (
		<>
			<div className="mx-auto hidden max-w-5xl md:block">
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
												<SortAsc className="aspect-square w-4" />
											) : (
												<SortDesc className="aspect-square w-4" />
											)}
										</button>
									</div>
								</th>
								<th className="w-32 bg-secondary">
									<div className="flex gap-2">
										<p>Date</p>
										<button>
											{true ? (
												<SortAsc className="aspect-square w-4" />
											) : (
												<SortDesc className="aspect-square w-4" />
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
									job={job}
									key={job.id}
								/>
							))}
						</tbody>
					</table>
				) : (
					<div className="mt-44 text-center text-3xl">
						<p> No applications yet. Add your first application.</p>
						<AddNewJobDialog />
					</div>
				)}
			</div>
			<div className="mt-5 space-y-2 px-3 md:hidden">
				{jobs.length !== 0 ? (
					jobs?.map((job: Job) => (
						<ViewCardMobile
							key={job.id}
							job={job}
						/>
					))
				) : (
					<div className="mt-44 text-center text-3xl">
						<p> No applications yet. Add your first application.</p>
						<AddNewJobDialog />
					</div>
				)}
			</div>
		</>
	)
}
