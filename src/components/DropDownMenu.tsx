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
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="aspect-square w-10 rounded-full p-0">
					<Avatar className="">
						{email === "demo@demo.com" ? (
							<AvatarImage
								width={100}
								height={100}
								className="rounded-full object-cover"
								src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fi522.photobucket.com%2Falbums%2Fw348%2FRichtoon18%2F1278324379_angry-daffy-duck.gif&f=1&nofb=1&ipt=9ca1a34d496efbe4d7677a8c8f061c7ddb93da26f82f3728b1cdc1f7b80b0769&ipo=images"
							/>
						) : (
							<AvatarImage
								className="rounded-full"
								src={profilePicture}
								width={100}
								height={100}
							/>
						)}
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
