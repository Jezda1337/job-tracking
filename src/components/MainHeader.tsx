import { Github } from "lucide-react"
import { Button } from "./ui/button"

export default function MainHeader() {
	return (
		<header className="flex items-center justify-between px-36">
			<h1 className="">JOBS_TRACKING</h1>
			<nav>
				<ul>
					<li>
						<Button>
							<Github className="mr-3 aspect-square w-4" /> Get in Boy
						</Button>
					</li>
				</ul>
			</nav>
		</header>
	)
}
