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
import { useToast } from "@/hooks/use-toast"
import { useSupabase } from "@/lib/supabase-provider"
import { format } from "date-fns"
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
	salary: string
	status: string
	link: string
	submitedDate: Date | undefined
	description: string
}

export default function AddNewJobDialog() {
	const { supabase } = useSupabase()
	const { toast } = useToast()

	const [open, setOpen] = useState(false)
	const [date, setDate] = useState<Date | undefined>(new Date())
	const [newJob, setNewJob] = useState<NewJob>({
		companyName: "",
		position: "",
		salary: "",
		status: "pending",
		link: "",
		submitedDate: new Date(),
		description: "",
	})

	async function getUserId() {
		const {
			data: { user },
		} = await supabase.auth.getUser()
		return user?.id ?? ""
	}

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
		if (open) {
			setNewJob({ ...newJob, submitedDate: date })
			const { error } = await supabase.from("jobs").insert([
				{
					...newJob,
					submitedDate: format(new Date(newJob.submitedDate!), "MM/dd/yyyy"),
					userId: await getUserId(),
				},
			])

			if (error) {
				console.error(error)
				return
			}

			setOpen(false)

			toast({
				title: "Successfuly added new job.",
				description: `${newJob.position} @ ${newJob.companyName}`,
				variant: "default",
			})
		}
	}

	function handleChange(e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) {
		const value = (e.target as HTMLInputElement | HTMLTextAreaElement).value
		const id = (e.target as HTMLInputElement).id

		setNewJob({ ...newJob, [id]: value })
	}

	function handleSelect(e: any) {
		setNewJob({ ...newJob, status: e })
	}

	return (
		<Dialog
			open={open}
			onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>
					<p>Add new Job</p>
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Add new job application</DialogTitle>
					<DialogDescription>Another one?</DialogDescription>
				</DialogHeader>
				<form
					autoComplete="off"
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
								required
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
								required
							/>
						</div>
						<div className="grid-row-2 grid items-center gap-1">
							<label
								htmlFor="salary"
								className="row-span-1">
								Position
							</label>
							<Input
								placeholder="3000 .."
								id="salary"
								className="row-span-2"
								onChange={handleChange}
								required
							/>
						</div>
						<div className="grid-row-2 grid items-center gap-1">
							<label
								htmlFor="link"
								className="row-span-1">
								Link
							</label>
							<Input
								placeholder="https://linkedin.com/job1 .."
								id="link"
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
							<Select
								onValueChange={handleSelect}
								value={newJob.status}>
								<SelectTrigger className="row-span-2">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="pending">Pending</SelectItem>
									<SelectItem value="accepted">Accepted</SelectItem>
									<SelectItem value="rejected">Rejected</SelectItem>
									<SelectItem value="interviewed">Interviewed</SelectItem>
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
						<div className="grid-row-2 grid items-center gap-1">
							<label
								htmlFor="date"
								className="row-span-1">
								Description
							</label>
							<textarea
								id="description"
								className="rounded-md border px-2 py-3"
								placeholder="A reminder related to this job"
								onChange={handleChange}></textarea>
						</div>
					</div>
					<DialogFooter>
						<Button
							aria-label="Close"
							type="submit">
							Save
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
