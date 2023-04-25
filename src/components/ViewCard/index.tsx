import { format } from "date-fns"
import EditDialog from "../EditDialog"
import "./viewCard.css"

type Props = {
	companyName: string
	position: string
	status?: string
	date: Date
}

export default function ViewCard({
	companyName,
	position,
	status = "Pending",
	date,
}: Props) {
	// function handleEditModal() {
	// 	console.log("test")
	// }
	const now = new Date()
	return (
		<>
			<tr className="test my-3 table-row w-full rounded p-2">
				<td className="py-2 pl-4">{companyName}</td>
				<td>{position}</td>
				<td>{status}</td>
				<td>{format(date, "PPP")}</td>
				<td className="text-center">
					<EditDialog date={now} />
				</td>
			</tr>
		</>
	)
}
