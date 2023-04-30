"use client"

import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useSupabase } from "@/lib/supabase-provider"
import { Job } from "@/types/job"
import { EditIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { CalendarDatePicker } from "./CalendarDatePicker"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select"

export default function EditDialog(props: Job) {
	const { supabase } = useSupabase()

	const [companyName, setCompanyName] = useState(props.companyName)
	const [position, setPosition] = useState(props.position)
	const [status, setStatus] = useState(props.status)
	const [submitedDate, setSubmitedDate] = useState(props.submitedDate)

	useEffect(() => {
		console.log(companyName, position, status, submitedDate)
	}, [submitedDate])

	async function handleSubmit() {
		const { data, error } = await supabase
			.from("job")
			.update({
				companyName: companyName,
				position: position,
				status: status,
				submitedDate: submitedDate,
			})
			.eq("companyName", "Test")

		if (error) {
			console.log(error)
		}
		console.log(data)
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<button>
					<EditIcon className="h-5 w-5 hover:text-blue-500" />
				</button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Edit profile</DialogTitle>
					<DialogDescription>
						Make changes to your profile here. Click save when youre done.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div
						className="grid  grid-rows-2 items-center gap-1
						">
						<label
							htmlFor="companyName"
							className="row-span-1">
							Company Name
						</label>
						<Input
							id="companyName"
							className="row-span-2"
							onChange={(e) => setCompanyName(e.target.value)}
						/>
					</div>
					<div className="grid-row-2 grid items-center gap-1">
						<label
							htmlFor="position"
							className="row-span-1">
							Position
						</label>
						<Input
							id="position"
							className="row-span-2"
							onChange={(e) => setPosition(e.target.value)}
						/>
					</div>
					<div className="row-span-2 grid items-center gap-1">
						<label
							htmlFor="status"
							className="row-span-1">
							Status
						</label>
						<Select onValueChange={(e) => setStatus(e)}>
							<SelectTrigger className="row-span-2">
								<SelectValue placeholder="Status" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="pending">Pending</SelectItem>
								<SelectItem value="sucess">Success</SelectItem>
								<SelectItem value="rejected">Rejected</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="grid-row-2 grid items-center gap-1">
						<label
							htmlFor="date"
							className="row-span-1">
							Date
						</label>
						<CalendarDatePicker
							setDate={setSubmitedDate}
							date={submitedDate}
						/>
					</div>
				</div>
				<DialogFooter>
					<DialogTrigger asChild>
						<Button
							onClick={handleSubmit}
							type="submit">
							Save changes
						</Button>
					</DialogTrigger>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
