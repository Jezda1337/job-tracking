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
	link: string
	submitedDate: Date | undefined
}

export default function AddNewJobDialog() {
	const { supabase } = useSupabase()
	const { toast } = useToast()
	const [date, setDate] = useState<Date | undefined>(new Date())
	const [newJob, setNewJob] = useState<NewJob>({
		companyName: "",
		position: "",
		status: "",
		link: "",
		submitedDate: new Date(),
	})

	async function getUserId() {
		const {
			data: { user },
		} = await supabase.auth.getUser()
		return user?.id ?? ""
	}

	async function handleSubmit() {
		setNewJob({ ...newJob, submitedDate: date })
		const { data, error } = await supabase.from("job").insert([
			{
				...newJob,
				submitedDate: format(new Date(newJob.submitedDate!), "MM/dd/yyyy"),
				user_id: await getUserId(),
			},
		])

		if (error) {
			console.error(error)
			return
		}
		console.log(data)

		toast({
			title: "Successfuly added new job.",
			description: `${newJob.companyName} as ${newJob.position}`,
			variant: "default",
		})
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
					<DialogTitle>Add new job</DialogTitle>
					<DialogDescription>Another one?</DialogDescription>
				</DialogHeader>
				<form autoComplete="off">
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
							<Select onValueChange={handleSelect}>
								<SelectTrigger className="row-span-2">
									<SelectValue />
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
						<DialogTrigger asChild>
							<Button
								onClick={handleSubmit}
								type="button">
								Save
							</Button>
						</DialogTrigger>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
