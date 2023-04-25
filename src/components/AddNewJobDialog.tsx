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
import { PlusSquare } from "lucide-react"
import { FormEvent, useState } from "react"
import { CalendarDatePicker } from "./CalendarDatePicker"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select"

type NewJob = {
	companyName: string
	position: string
	status: string
	submitedDate: Date
}

export default function AddNewJobDialog() {
	const [date, setDate] = useState<Date>(new Date())
	const [newJob, setNewJob] = useState<NewJob>({
		companyName: "",
		position: "",
		status: "",
		submitedDate: new Date(),
	})

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		setNewJob({ ...newJob, submitedDate: date })
	}

	function handleChange(e: FormEvent<HTMLInputElement>) {
		const value = (e.target as HTMLInputElement).value
		const id = (e.target as HTMLInputElement).id

		setNewJob({ ...newJob, [id]: value })
	}

	function handleSelect(e: any) {
		setNewJob({ ...newJob, status: e })
	}
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>
					<PlusSquare className="aspect-square w-5" />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Edit profile</DialogTitle>
					<DialogDescription>Another one</DialogDescription>
				</DialogHeader>
				<form
					autoComplete="off"
					className=""
					onSubmit={handleSubmit}>
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
								placeholder="Apple .."
								onChange={handleChange}
								id="companyName"
								className="row-span-2"
							/>
						</div>
						<div className="grid-row-2 grid items-center gap-1">
							<label
								htmlFor="position"
								className="row-span-1">
								Position
							</label>
							<Input
								placeholder="Software Developer .."
								id="position"
								className="row-span-2"
								onChange={handleChange}
							/>
						</div>
						<div className="row-span-2 grid items-center gap-1">
							<label
								htmlFor="status"
								className="row-span-1">
								Status
							</label>
							<Select onValueChange={handleSelect}>
								<SelectTrigger className="row-span-2">
									<SelectValue placeholder="Status" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="pending">Pending</SelectItem>
									<SelectItem value="sucess">Success</SelectItem>
									<SelectItem value="system">System</SelectItem>
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
								date={date}
								setDate={setDate}
							/>
						</div>
					</div>
					<DialogFooter>
						<Button type="submit">Save changes</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
