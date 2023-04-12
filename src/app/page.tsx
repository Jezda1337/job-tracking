"use client"

import Card from "@/components/Card"

export default function Home() {
	const today = new Intl.DateTimeFormat(["ban", "id"]).format(
		new Date(Date.now())
	)
	return (
		<main className="relative">
			hello world
			{/* <DialogDemo /> */}
			<Card
				companyName="Apple"
				positon="JS Dev"
				status={""}
				date={today}
			/>
		</main>
	)
}
