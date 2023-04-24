"use client"

import ViewCard from "@/components/ViewCard"

export default function Home() {
	const today = new Intl.DateTimeFormat(["ban", "id"]).format(
		new Date(Date.now())
	)
	return (
		<main className="relative flex flex-wrap gap-4">
			{/* <DialogDemo /> */}
			<table className="mt-16 w-full">
				<thead className="w-full text-left">
					<tr>
						<th className="rounded-bl rounded-tl bg-slate-300 py-2 pl-4">
							Company Name
						</th>
						<th className="bg-slate-300">Position</th>
						<th className="bg-slate-300">Status</th>
						<th className="bg-slate-300">Date</th>
						<th className="rounded-br rounded-tr bg-slate-300"></th>
					</tr>
				</thead>
				<tbody>
					{Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).map((n) => (
						<ViewCard
							key={n}
							companyName="Apple"
							position="JS Dev"
							date={today}
						/>
					))}
				</tbody>
			</table>
		</main>
	)
}
