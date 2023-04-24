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
import { EditIcon } from "lucide-react"
import { CalendarDatePicker } from "./CalendarDatePicker"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select"

export default function EditDialog({ date }: any) {
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
							value="Pedro Duarte"
							className="row-span-2"
							onChange={() => "tets"}
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
							value="@peduarte"
							className="row-span-2"
							onChange={() => "tets"}
						/>
					</div>
					<div className="row-span-2 grid items-center gap-1">
						<label
							htmlFor="status"
							className="row-span-1">
							Status
						</label>
						<Select>
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
						<CalendarDatePicker date={date} />
					</div>
				</div>
				<DialogFooter>
					<Button type="submit">Save changes</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
