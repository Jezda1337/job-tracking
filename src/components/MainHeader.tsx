import { Github } from "lucide-react"
import { Button } from "./ui/button"

export default function MainHeader() {
	return (
		<header className="flex items-center justify-between pt-8">
			<h1 className="text-2xl font-bold">JOBS_TRACKING</h1>
			<nav>
				<ul>
					<li>
						<Button className="h-12 w-32">
							<Github className="aspect-square w-5" />
						</Button>
					</li>
				</ul>
			</nav>
		</header>
	)
}
