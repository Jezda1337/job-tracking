"use client"

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

export default function StatsCard({
	title,
	content,
	icon,
}: {
	title: string
	content: number
	icon: React.ReactNode
}) {
	return (
		<>
			<Card className="flex-1">
				<CardHeader className="flex flex-row items-center justify-between space-y-0">
					<CardTitle>{title}</CardTitle>
					<div>{icon}</div>
					{/* <CardDescription>Card Description</CardDescription> */}
				</CardHeader>
				<CardContent className="text-2xl font-bold">{content}</CardContent>
				{/* <CardFooter> */}
				{/* 	<p>Card Footer</p> */}
				{/* </CardFooter> */}
			</Card>
		</>
	)
}
