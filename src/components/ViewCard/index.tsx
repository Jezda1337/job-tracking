import { format } from "date-fns"
import EditDialog from "../EditDialog"
import "./viewCard.css"

type Props = {
	id?: number
	companyName: string | null
	position: string | null
	status: string | null
	link: string | null
	submitedDate: Date | null
}

export default function ViewCard({
	companyName,
	position,
	status = "pending",
	submitedDate,
	link,
	id,
}: Props) {
	return (
		<>
			<tr className="test my-3 table-row w-32 rounded p-2">
				<td className="py-2 pl-4">{companyName}</td>
				<td>{position}</td>
				<td>
					<a
						target="_blank"
						className="hover:text-blue-500 hover:underline"
						href={link ?? ""}>
						Link
					</a>
				</td>
				<td>
					<div className="relative flex items-center gap-2">
						<p className="first-letter:uppercase">{status}</p>
						<div
							className={`${
								status === "pending"
									? "bg-amber-400"
									: status === "accepted"
									? "bg-green-400"
									: "bg-red-500"
							} w-3 h-3 rounded-full absolute right-7`}></div>
					</div>
				</td>
				<td>{format(new Date(submitedDate!), "PPP")}</td>
				<td className="text-center">
					<EditDialog
						companyName={companyName}
						position={position}
						status={status}
						submitedDate={submitedDate}
						link={link}
						id={id}
					/>
				</td>
			</tr>
		</>
	)
}
