import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

type Props = {
	companyName: string
	positon: string
	status?: string
	date: string
}
export default function EditCard({
	companyName,
	positon,
	status = "Pending",
}: Props) {
	function handleChange() {
		console.log("change")
	}
	return (
		<form className="max-w-xs space-y-4 rounded border p-2">
			<div className="space-y-1">
				<Label>Company Name</Label>
				<Input
					onChange={handleChange}
					value={companyName}
					placeholder="Company Name"
				/>
			</div>
			<div className="space-y-1">
				<Label>Posiiton</Label>
				<Input
					placeholder="Position"
					onChange={handleChange}
					className="my-4"
					value={positon}
				/>
			</div>
			<div className="space-y-1">
				<Label>Status</Label>
				<Input
					placeholder="Current status"
					onChange={handleChange}
					className="mb-4"
					value={status}
				/>
			</div>
			<div className="space-y-1">
				<Label>Date</Label>
				<Input
					placeholder="Date"
					onChange={handleChange}
					type="date"
				/>
			</div>
			<div className="my-4">
				<Button onClick={() => {}}>Edit</Button>
			</div>
		</form>
	)
}
