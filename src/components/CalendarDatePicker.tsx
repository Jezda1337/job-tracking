"use client"

import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
// import { Dispatch, SetStateAction } from "react"

type Props = {
	// date?: string | null
	date?: any
	// setDate?: Dispatch<SetStateAction<string | null>>
	setDate: any
}

export function CalendarDatePicker({ date, setDate }: Props): JSX.Element {
	function handleDate(e: any) {
		setDate(e)
	}

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={"outline"}
					className={cn(
						"w-full justify-start text-left font-normal",
						!date && "text-muted-foreground"
					)}>
					<CalendarIcon className="mr-2 h-4 w-4" />
					{date ? format(date, "PPP") : <span>Pick a date</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Calendar
					mode="single"
					selected={date}
					// onSelect={setDate}
					onSelect={handleDate}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	)
}
