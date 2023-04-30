import { Job } from "@/types/job"
import { format } from "date-fns"
import EditDialog from "../EditDialog"
import "./viewCard.css"

export default function ViewCard({
	companyName,
	position,
	status = "Pending",
	submitedDate,
}: Job) {
	return (
		<>
			<tr className="test my-3 table-row w-32 rounded p-2">
				<td className="py-2 pl-4">{companyName}</td>
				<td>{position}</td>
				<td>
					<div className="flex items-center gap-2">
						<p>{status}</p>
						<div
							className={`${
								status === "Pending"
									? "bg-amber-400"
									: status === "accepted"
									? "bg-green-400"
									: "bg-red-500"
							} w-3 h-3 rounded-full`}></div>
					</div>
				</td>
				<td>{format(new Date(submitedDate!), "PPP")}</td>
				<td className="text-center">
					<EditDialog
						companyName={companyName}
						position={position}
						status={status}
						submitedDate={submitedDate}
					/>
				</td>
			</tr>
		</>
	)
}
