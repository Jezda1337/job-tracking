import DropDownMenu from "@/components/DropDownMenu"
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { cookies, headers } from "next/headers"
import Image from "next/image"
import AddNewJobDialog from "./AddNewJobDialog"
import Login from "./Login"
import Logo from "/public/logo.svg"

async function MainHeader(): Promise<JSX.Element> {
	const supabase = createServerComponentSupabaseClient({
		headers,
		cookies,
	})
	const {
		data: { user },
	} = await supabase.auth.getUser()
	return (
		<header className="pb-8 pt-8 shadow">
			<div className="mx-auto flex max-w-5xl items-center justify-between px-6 lg:px-0">
				<div>
					<Image
						className="aspect-square w-12"
						src={Logo}
						alt="Logo"
					/>
				</div>
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
			</div>
		</header>
	)
}

export default MainHeader as unknown as () => JSX.Element // currently only solution https://github.com/vercel/next.js/issues/42292#issuecomment-1494848699
