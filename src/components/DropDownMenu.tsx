"use client"
import { LogOut } from "lucide-react"

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSupabase } from "@/lib/supabase-provider"
import { Avatar } from "@radix-ui/react-avatar"
import { AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"

type Props = {
	name: string
	email: string
	profilePicture: string
}

export default function DropDownMenu({ name, email, profilePicture }: Props) {
	const { supabase } = useSupabase()

	async function handleLogout() {
		await supabase.auth.signOut()
		window.location.href = "/"
	}
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="aspect-square w-10 rounded-full p-0">
					<Avatar className="">
						<AvatarImage
							className="rounded-full"
							src={profilePicture}
							width={100}
							height={100}
						/>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuLabel>
					<p className="text-sm font-medium leading-none">{name}</p>
					<p className="text-xs leading-none text-muted-foreground">{email}</p>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={handleLogout}>
					<LogOut className="mr-2 h-4 w-4" />
					<span>Log out</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
