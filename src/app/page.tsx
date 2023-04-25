"use client"

import ViewCard from "@/components/ViewCard"

export default function Home() {
	return (
		<main className="relative flex flex-wrap gap-4">
			<table className="mt-16 w-full">
				<thead className="w-full text-left">
					<tr>
						<th className="mb-4 rounded-bl rounded-tl bg-secondary py-2 pl-4">
							Company Name
						</th>
						<th
							className="bg-secondary
							">
							Position
						</th>
						<th className="bg-secondary">Status</th>
						<th className="bg-secondary">Date</th>
						<th className="rounded-br rounded-tr bg-secondary"></th>
					</tr>
				</thead>
				<tbody>
					{Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).map((n) => (
						<ViewCard
							key={n}
							companyName="Apple"
							position="JS Dev"
							date={new Date(Date.now())}
						/>
					))}
				</tbody>
			</table>
		</main>
	)
}
