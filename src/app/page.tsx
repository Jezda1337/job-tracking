"use client"

import Card from "@/components/Card"

export default function Home() {
	const today = new Intl.DateTimeFormat(["ban", "id"]).format(
		new Date(Date.now())
	)
	return (
		<main className="relative flex flex-wrap gap-4">
			{/* <DialogDemo /> */}
			{Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).map((n) => (
				<div
					key={n}
					className="mt-12 min-w-[300px] flex-1">
					<Card
						companyName="Apple"
						positon="JS Dev"
						date={today}
					/>
				</div>
			))}
		</main>
	)
}
