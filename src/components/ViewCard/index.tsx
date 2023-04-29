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
				<td>
					<p
						className={`relative after:absolute after:left-1/2 after:top-1/2 after:aspect-square after:w-3 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full ${
							status === "pending"
								? "after:bg-amber-400"
								: status === "accepted"
								? "after:bg-green-400"
								: "after:bg-red-500"
						}`}>
						{status}
					</p>
				</td>
				<td>{format(date, "PPP")}</td>
				<td className="text-center">
					<EditDialog date={now} />
				</td>
			</tr>
		</>
	)
}
