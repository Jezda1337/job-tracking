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
import { EditIcon } from "lucide-react"
import { useState } from "react"
import { CalendarDatePicker } from "./CalendarDatePicker"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select"

type Props = {
	id?: number
	companyName: string | null
	position: string | null
	status: string | null
	submitedDate: Date | null
	link: string | null
}

export default function EditDialog(props: Props) {
	const { supabase } = useSupabase()
	const { toast } = useToast()

	const [companyName, setCompanyName] = useState(props.companyName)
	const [position, setPosition] = useState(props.position)
	const [status, setStatus] = useState(props.status)
	const [submitedDate, setSubmitedDate] = useState(props.submitedDate)
	const [link, setLink] = useState(props.link)

	async function handleSubmit() {
		const { error } = await supabase
			.from("job")
			.update({
				companyName: companyName,
				position: position,
				status: status,
				link: link,
				submitedDate: format(submitedDate as Date, "MM/dd/yyyy"),
			})
			.eq("id", props.id)

		if (error) {
			console.error(error)
			return
		}
	}

	async function handleDelete() {
		const { error } = await supabase.from("job").delete().eq("id", props.id)
		if (error) {
			console.log(error)
			return
		}
		toast({
			variant: "destructive",
			title: "You have successfully deleted the job",
		})
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
					<DialogTitle>Edit Job</DialogTitle>
					<DialogDescription></DialogDescription>
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
							value={companyName ?? ""}
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
							value={position ?? ""}
						/>
					</div>
					<div className="grid-row-2 grid items-center gap-1">
						<label
							htmlFor="link"
							className="row-span-1">
							Link
						</label>
						<Input
							id="link"
							className="row-span-2"
							onChange={(e) => setLink(e.target.value)}
							value={link ?? ""}
						/>
					</div>
					<div className="row-span-2 grid items-center gap-1">
						<label
							htmlFor="status"
							className="row-span-1">
							Status
						</label>
						<Select
							value={status ?? ""}
							onValueChange={(e) => setStatus(e)}>
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
							variant="destructive"
							onClick={handleDelete}
							type="submit">
							Delete
						</Button>
					</DialogTrigger>
					<DialogTrigger asChild>
						<Button
							variant="default"
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
