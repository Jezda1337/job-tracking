import { Job } from "@/types/job"
import { Ban, Send, Timer } from "lucide-react"
import StatsCard from "./StatsCard"

export default function Stats({ jobs }: { jobs: Job[] }) {
	const allApplications = jobs.length
	const allPending = jobs.filter((job) => job.status === "pending").length
	const allRejected = jobs.filter((job) => job.status === "rejected").length

	return (
		<section className="mx-auto flex max-w-5xl flex-wrap justify-between gap-4">
			<StatsCard
				icon={<Send />}
				title={"Aplications"}
				content={allApplications}
			/>
			<StatsCard
				icon={<Timer />}
				title={"Pending"}
				content={allPending}
			/>
			<StatsCard
				// icon={<PartyPopper />}
				icon={<Ban />}
				title={"Rejected"}
				content={allRejected}
			/>
		</section>
	)
}
