import DropDownMenu from "@/components/DropDownMenu"
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { cookies, headers } from "next/headers"
import AddNewJobDialog from "./AddNewJobDialog"
import Login from "./Login"

export default async function MainHeader() {
	const supabase = createServerComponentSupabaseClient({
		headers,
		cookies,
	})
	const {
		data: { user },
	} = await supabase.auth.getUser()
	return (
		<header className="flex items-center justify-between pt-8">
			<h1 className="text-2xl font-bold">JOBS_TRACKING</h1>
			<nav>
				{user?.id ? (
					<ul className="flex items-center gap-2">
						<li>
							<AddNewJobDialog />
						</li>
						<li>{user?.user_metadata.name}</li>
						<li className="flex items-center">
							<DropDownMenu
								name={user?.user_metadata.name}
								email={user?.email!}
								profilePicture={user?.user_metadata?.avatar_url}
							/>
						</li>
					</ul>
				) : (
					<Login />
				)}
			</nav>
		</header>
	)
}
